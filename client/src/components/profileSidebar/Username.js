import decode from 'jwt-decode';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getUserQuery } from '../../graphql/topics';


class Username extends Component {
   userId = () => {
     const token = localStorage.getItem('token');
     const { user } = decode(token);
     return user.id;
   };

   render() {
     const id = this.userId();
     return (
       <Query
         query={getUserQuery}
         variables={{
           id,
         }}
       >
         {({ loading, error, data }) => {
           if (loading) return 'Loading...';
           if (error) return `Error! ${error.message}`;

           return (
             <span>
               {data.getUser.username}
             </span>
           );
         }}
       </Query>
     );
   }
}

export default Username;
