import React from 'react';

export default (props) => {
    const icon_url = `http://openweathermap.org/img/w/${props.icon}.png`;

    return (
        <div>
            <img src={icon_url}/>
            <h3>{Math.round(props.temp)}ºC</h3>
        </div>
    );
}; 