import React, { Component } from 'react';
import Alert from 'react-s-alert';

import SearchBar from '../containers/search_bar';
import WeatherList from '../containers/weather_list';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <WeatherList/>
        <span>Note: The temperature of each day is calculated by averaging the temperatures of each day.</span>
        <Alert position={'bottom-right'} timeout={3000} stack={{limit: 3}} />
      </div>
    );
  }
}
