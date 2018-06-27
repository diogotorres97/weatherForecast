import React, {Component} from 'react';
import {connect} from 'react-redux';
import ForecastData from '../components/forecast-data';
import moment from 'moment';

import GoogleMap from '../components/google-map';

class WeatherList extends Component {
    constructor(props) {
        super(props);

        this.renderWeather = this.renderWeather.bind(this);
    }

    parseWeather(cityData) {
        let counter = 0;

        let forecast = cityData.list.reduce((acc, currvalue) => {
            let curr_date = moment(currvalue.dt_txt).format('YYYY-MM-DD');
            let acum_temp = currvalue.main.temp;
            let curr_weather = currvalue.weather[0];
            let weather = new Map();

            if(acc[curr_date]) {
                acum_temp += acc[curr_date].acum_temp;
                counter++;

                weather = acc[curr_date].weather;
                if(weather.has(curr_weather.icon)){
                    weather.set(curr_weather.icon, weather.get(curr_weather.icon) + 1);
                } else {
                    weather.set(curr_weather.icon, 1);
                }
            } else {
                counter = 1;
                weather.set(curr_weather.icon, 1);
            }

            return {
                ...acc, 
                [curr_date]: {acum_temp, counter, weather},
            };
          }, {});

          let forecastParsed = Object.entries(forecast).map((value) => {
              let date = value[0];
              let acum_temp = value[1].acum_temp;
              let counter = value[1].counter;
              let weather = value[1].weather;
              weather = new Map([...weather.entries()].sort((a, b) => b[1] - a[1]));

              return [date, {temp: acum_temp/counter, icon: weather.keys().next().value}];
          });
          
          return forecastParsed;
    }

    renderForecast(forecast, days) {
        return forecast.slice(0, days).map((value) => {
            const date = value[0];
            const icon = value[1].icon;
            const temp = value[1].temp;
            return (<td key={date}><ForecastData date={date} temp={temp} icon={icon}/></td>)
            });
    }

    renderHeaderDays(days) {
        let header = Array.apply(null, Array(days));
        return header.map((value, index) => {
            let date = moment().add(index,'days');
            return (<th key={date}> {date.format("dddd, Do MMMM")} </th>) ;
        });
    }
    
    renderWeather(cityData) {
        if(!cityData)
            return;

        const name = cityData.city.name;
        const {lon, lat } = cityData.city.coord;
        const forecast = this.parseWeather(cityData);
        const days_forecast = this.renderForecast(forecast, 5);

        return (
        <tr key={name}>
            <td><GoogleMap lat={lat} lon={lon}/></td>
            {days_forecast}
        </tr>
        );
    }

    render() {
        return (
            <table className="table table-hover">
            <thead>
            <tr>
            <th> City </th>
            {this.renderHeaderDays(5)}
            </tr>
            </thead>
            <tbody>
                {this.props.weather.map(this.renderWeather)}
            </tbody>
            </table>
    );
    }
}

function mapDispatchToProps({ weather }) {
    return { weather };
}

export default connect(mapDispatchToProps)(WeatherList);