/* eslint-disable */

import { Card, Icon, Input } from 'antd';
import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { classnames } from './helpers';
import { Container, Wrapper } from './SearchStyles';

class PlacesSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false,
    };
  }

  handleChange = address => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: '',
    });
  };

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: '',
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const { address, errorMessage, latitude, longitude, isGeocoding } = this.state;

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
                      type="close-circle"
                      onClick={this.handleCloseClick}
                      style={{ fontSize: 25, color: '#e80000', cursor: 'pointer' }}
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
        {errorMessage.length > 0 && <div style={{ color: 'red' }}>{this.state.errorMessage}</div>}

        {((latitude && longitude) || isGeocoding) && (
          <div>
            <h3>Geocode result</h3>
            {isGeocoding ? (
              <div>
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw " />
              </div>
            ) : (
              <div>
                <div>
                  <label>Latitude:</label>
                  <span>{latitude}</span>
                </div>
                <div>
                  <label>Longitude:</label>
                  <span>{longitude}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </Wrapper>
    );
  }
}

export default PlacesSearch;
