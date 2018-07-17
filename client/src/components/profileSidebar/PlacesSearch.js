/* eslint-disable */

import { Card, Icon, Input } from 'antd';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { getUserQuery } from '../../graphql/topics';
import { classnames } from './helpers';
import { Container, Wrapper } from './SearchStyles';



class PlacesSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      errorMessage: '',
      isGeocoding: false,
      id: this.props.id,
    };
  }



  handleChange = address => {
    this.setState({
      address,
      errorMessage: '',
    });
  };

  handleSelect = async(selected) => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          isGeocoding: false,
        });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleLocationUpdate= () => {
    const { address, id} = this.state;
      this.props.mutate({
      variables: { location: address },
      refetchQueries: [
        {
          query: getUserQuery,
          variables: { id: id },
        },
      ],
    })
    this.setState({
      address: '',
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const { address } = this.state;
    return (
      <Wrapper>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div>
                <Container>
                  <Input
                    {...getInputProps({
                      placeholder: 'Change Location',
                    })}
                  />
                  {this.state.address.length > 0 && (
                    <Icon
                      type="check-square"
                      onClick={this.handleLocationUpdate}
                      style={{ fontSize: 30, color: 'green', cursor: 'pointer' }}
                    />
                  )}
                </Container>
                {suggestions.length > 0 && (
                  <Card hoverable>
                    {suggestions.map(suggestion => {
                      const className = classnames('', {
                        '': suggestion.active,
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <span
                          hoverable
                          style={{ cursor: 'pointer' }}
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <h3>{suggestion.formattedSuggestion.mainText}</h3>{' '}
                          <small>{suggestion.formattedSuggestion.secondaryText}</small>
                          <hr />
                        </span>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                    <div />
                  </Card>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>

      </Wrapper>
    );
  }
}

const updateLocationMutation = gql`
  mutation($location: String!) {
    updateLocation(location: $location)
  }
`;

export default graphql(updateLocationMutation)(PlacesSearch);