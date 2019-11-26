import { forecastReducer } from './forecast/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  forecast: forecastReducer,
});
