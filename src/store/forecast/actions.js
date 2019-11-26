import { createActions } from 'redux-actions';

export const {
  setSelectedLocation,
  getCurrentWeather,
  getForecastedWeather,
  showDayForecastDetails,
  hideDayForecastDetails,
  showHourForecastDetails,
  hideHourForecastDetails,
} = createActions(
  {
    SET_SELECTED_LOCATION: ({ lat, lon }) => ({ lat, lon }),
    GET_CURRENT_WEATHER: {
      START: undefined,
      SUCCESS: ({ data }) => ({ data }),
      FAILURE: undefined,
    },
    GET_FORECASTED_WEATHER: {
      START: undefined,
      SUCCESS: ({
        data,
        averagedData,
        dayDataSequence,
        hourDataSequences,
      }) => ({ data, averagedData, dayDataSequence, hourDataSequences }),
      FAILURE: undefined,
    },
    SHOW_DAY_FORECAST_DETAILS: ({ dayId }) => ({ dayId }),
    HIDE_DAY_FORECAST_DETAILS: undefined,
    SHOW_HOUR_FORECAST_DETAILS: ({ hourId }) => ({ hourId }),
    HIDE_HOUR_FORECAST_DETAILS: undefined,
  },
  { prefix: 'FORECAST' }
);
