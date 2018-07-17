import decode from 'jwt-decode';
import React from 'react';
import PlacesSearch from './PlacesSearch';

const userId = () => {
  const token = localStorage.getItem('token');
  const { user } = decode(token);
  return user.id;
};

const id = userId();


const PlacesInput = () => <PlacesSearch id={id} />;

export default PlacesInput;
