import { FETCH_WEATHER } from "../actions";
import Alert from 'react-s-alert';

export default function (state = [], action){
    console.log(action);
    if(action.error)
        Alert.error('Oh no! ' + action.payload.response.data.message);

    switch(action.type) {
        case FETCH_WEATHER: 
            return [action.payload.data, ...state];
    }
    return state;
}