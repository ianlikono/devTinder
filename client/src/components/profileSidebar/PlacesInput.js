import decode from 'jwt-decode';
import React from 'react';
import PlacesSearch from './PlacesSearch';

const userId = () => {
  const token = localStorage.getItem('token');
  const { user } = decode(token);
  return user.id;
};


const PlacesInput = () => <PlacesSearch id={userId()} />;

export default PlacesInput;
