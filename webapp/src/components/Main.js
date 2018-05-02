import React from 'react';
import { Query } from 'react-apollo';
import TopNav from './nav';
import Loader from './common/Loader';
import { USER_QUERY } from '../graphql/user.query';
import Admin from './admin';

const Main = () => (
  <div>
    <TopNav />
    <Query query={USER_QUERY}>
      {({ loading, error, data: { user } }) => {
        if (loading) return <Loader />;
        if (error) return <div>{error.message}</div>;

        if (user.isAdmin) {
          return <Admin user={user} />;
        }

        return null;
      }}
    </Query>
  </div>
);

export default Main;
