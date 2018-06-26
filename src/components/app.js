import React, { Component } from 'react';

import SearchBar from '../containers/search_bar';
import WeatherList from '../containers/weather_list';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <WeatherList/>
        <span>Note: The temperature of each day is calculated by averaging the temperatures of each day.</span>
      </div>
    );
  }
}
