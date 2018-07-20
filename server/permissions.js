const createResolver = (resolver) => {
  const baseResolver = resolver;
  baseResolver.createResolver = (childResolver) => {
    const newResolver = async (parent, args, context, info) => {
      await resolver(parent, args, context, info);
      return childResolver(parent, args, context, info);
    };
    return createResolver(newResolver);
  };
  return baseResolver;
};

// requiresAuth
export default createResolver((parent, args, { user }) => {
  if (!user || !user.id) {
    throw new Error('Not authenticated');
  }
});

export const MessageSubscription = createResolver(async (parent, { teamId, userId }, { user, models }) => {
  if (!user || !user.id) {
    throw new Error('Not authenticated');
  }

  const members = await models.Member.findAll({
    where: {
      teamId,
      [models.sequelize.Op.or]: [{ userId }, { userId: user.id }],
    },
  });

  if (members.length !== 2) {
    throw new Error('Something went wrong');
  }
});

// const createResolver = (resolver) => {
//     const baseResolver = resolver;
//     baseResolver.createResolver = (childResolver) => {
//       const newResolver = async (parent, args, context, info) => {
//         await resolver(parent, args, context, info);
//         return childResolver(parent, args, context, info);
//       };
//       return createResolver(newResolver);
//     };
//     return baseResolver;
//   };

//   export const requiresAuth = createResolver((parent, args, context) => {
//     if (!context.user || !context.user.id) {
//       throw new Error('Not authenticated');
//     }
//   });

//   export const requiresAdmin = requiresAuth.createResolver((parent, args, context) => {
//     if (!context.user.isAdmin) {
//       throw new Error('Requires admin access');
//     }
//   });
