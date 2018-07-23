import decode from 'jwt-decode';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getUserPicsQuery } from '../../../graphql/topics';

class ImagesDisplay extends Component {
  userId = () => {
    const token = localStorage.getItem('token');
    const { user } = decode(token);
    return user.id;
  };

  render() {
    const userId = this.userId();
    return (
      <Query
        query={getUserPicsQuery}
        variables={{
          userId,
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <Carousel style={styles}>
              {data.getUserPics.length ? data.getUserPics.map(pic => (
                <div key={pic.url} style={{height: 300}}>
                  <img style={{ width: '100%', height: '100%', position: 'relative', objectFit: 'cover' }} src={pic.url} alt="" />
                </div>
              )) : <img style={{ width: '100%', height: '100%', position: 'relative' }} src="https://dev-tinder.s3.amazonaws.com/images/20180717-rvtwn-593819-jpg" alt="" />  }
            </Carousel>
          );
        }}
      </Query>
    );
  }
}

export default ImagesDisplay;
