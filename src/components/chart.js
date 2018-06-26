import _ from 'lodash';
import React from 'react';


export default (props) => {
    const icon_url = `http://openweathermap.org/img/w/${props.icon}.png`;

    return (
        <div>
            <h2>{props.date}</h2>
            <img src={icon_url}/>
            <h3>{props.temp}</h3>
        </div>
    );
} 