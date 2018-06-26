import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';

import GoogleMap from '../components/google-map';

class WeatherList extends Component {
    renderWeather(cityData) {
        const name = cityData.city.name;
        const temps = cityData.list.map(weather => weather.main.temp);
        const humidity = cityData.list.map(weather => weather.main.humidity);
        const pressure = cityData.list.map(weather => weather.main.pressure);
        const {lon, lat } = cityData.city.coord;

        return (
        <tr key={name}>
            <td>
            {name}
            <GoogleMap lat={lat} lon={lon}/>
            </td>
            <td>
                <Chart data={temps} color="orange" units="ºC"/>       
            </td>
            <td>
                <Chart data={pressure} color="green" units="hPA"/>       
            </td>
            <td>
                <Chart data={humidity} color="black" units="%"/>       
            </td>
        </tr>
        );
    }

    render() {
        return (
            <table className = "table table-hover">
            <thead>
            <tr>
            <th> City </th>
            <th> Temperature (ºC) </th>
            <th> Pressure (hPA) </th>
            <th> Humidity (%) </th>
            </tr>
            </thead>
            <tbody>
                {this.props.weather.map(this.renderWeather)}
            </tbody>
            </table>
    )
    }
}

function mapDispatchToProps({ weather }) {
    return { weather };
}

export default connect(mapDispatchToProps)(WeatherList);