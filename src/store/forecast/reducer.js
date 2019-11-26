import * as actions from './actions';

import { handleActions } from 'redux-actions';

const initialState = {
  selectedLocation: {
    lat: 0,
    lon: 0,
  },
  currentWeather: {
    loading: false,
    data: {},
  },
  forecastedWeather: {
    loading: false,
    dayDetailsSectionIsOpened: false,
    selectedDayId: '',
    hourDetailsSectionIsOpened: false,
    selectedHourId: '',
    data: {},
    averagedData: {},
    dayDataSequence: [],
    hourDataSequences: {},
  },
  dataIsLoaded: false,
};

export const forecastReducer = handleActions(
  {
    [actions.setSelectedLocation]: (state, action) => {
      const { lat, lon } = action.payload;

      return {
        ...state,
        selectedLocation: {
          lat,
          lon,
        },
      };
    },

    [actions.getCurrentWeather.start]: (state, action) => ({
      ...state,
      currentWeather: {
        ...state.currentWeather,
        loading: true,
      },
    }),
    [actions.getCurrentWeather.success]: (state, action) => ({
      ...state,
      dataIsLoaded: true,
      currentWeather: {
        ...state.currentWeather,
        loading: false,
        data: action.payload.data,
      },
    }),
    [actions.getCurrentWeather.failure]: (state, action) => ({
      ...state,
      currentWeather: {
        ...state.currentWeather,
        loading: false,
      },
    }),

    [actions.getForecastedWeather.start]: (state, action) => ({
      ...state,
      forecastedWeather: {
        ...state.forecastedWeather,
        loading: true,
      },
    }),
    [actions.getForecastedWeather.success]: (state, action) => ({
      ...state,
      dataIsLoaded: true,
      forecastedWeather: {
        ...state.forecastedWeather,
        loading: false,
        data: action.payload.data,
        averagedData: action.payload.averagedData,
        dayDataSequence: action.payload.dayDataSequence,
        hourDataSequences: action.payload.hourDataSequences,
      },
    }),
    [actions.getForecastedWeather.failure]: (state, action) => ({
      ...state,
      forecastedWeather: {
        ...state.forecastedWeather,
        loading: false,
      },
    }),

    [actions.showDayForecastDetails]: (state, action) => ({
      ...state,
      forecastedWeather: {
        ...state.forecastedWeather,
        dayDetailsSectionIsOpened: true,
        selectedDayId: action.payload.dayId,
      },
    }),

    [actions.hideDayForecastDetails]: (state, action) => ({
      ...state,
      forecastedWeather: {
        ...state.forecastedWeather,
        dayDetailsSectionIsOpened: false,
        hourDetailsSectionIsOpened: false,
      },
    }),

    [actions.showHourForecastDetails]: (state, action) => ({
      ...state,
      forecastedWeather: {
        ...state.forecastedWeather,
        hourDetailsSectionIsOpened: true,
        selectedHourId: action.payload.hourId,
      },
    }),

    [actions.hideHourForecastDetails]: (state, action) => ({
      ...state,
      forecastedWeather: {
        ...state.forecastedWeather,
        hourDetailsSectionIsOpened: false,
      },
    }),
  },
  initialState
);
