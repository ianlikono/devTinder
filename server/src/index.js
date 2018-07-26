import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { execute, subscribe } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from 'http';
import jwt from 'jsonwebtoken';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { refreshTokens } from './auth';
import getModels from './models';

require('dotenv').config();


const { SECRET, SECRET2 } = process.env;

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use(cors('*'));

const graphqlEndpoint = '/graphql';

const server = createServer(app);

getModels().then((models) => {
  if (!models) {
    console.log('Could not connect to database');
    return;
  }

  const addUser = async (req, res, next) => {
    const token = req.headers['x-token'];
    if (token) {
      try {
        const { user } = jwt.verify(token, SECRET);
        req.user = user;
      } catch (err) {
        const refreshToken = req.headers['x-refresh-token'];
        const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
        if (newTokens.token && newTokens.refreshToken) {
          res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
          res.set('x-token', newTokens.token);
          res.set('x-refresh-token', newTokens.refreshToken);
        }
        req.user = newTokens.user;
        // console.log(req.user)
      }
    }
    next();
  };

  app.use(addUser);

  app.use(
    graphqlEndpoint,
    bodyParser.json(),
    graphqlExpress(req => ({
      schema,
      // console.log(req.user);
      context: {
        models,
        user: req.user,
        SECRET,
        SECRET2,
        serverUrl: `${req.protocol}://${req.get('host')}`,
      },
    })),
  );

  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: graphqlEndpoint,
      subscriptionsEndpoint: 'ws://localhost:8081/subscriptions',
    }),
  );

  models.sequelize.sync({}).then(() => {
    server.listen(8081, () => {
      // eslint-disable-next-line no-new
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema,
          onConnect: async ({ token, refreshToken }, webSocket) => {
            if (token && refreshToken) {
              try {
                const { user } = jwt.verify(token, SECRET);
                return { models, user };
              } catch (err) {
                const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
                return { models, user: newTokens.user };
              }
            }

            return { models };
          },
        },
        {
          server,
          path: '/subscriptions',
        },
      );
    });
  });
});
