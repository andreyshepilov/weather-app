import { get } from 'lodash';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import moment from 'moment';
import _ from 'lodash';

import { wetherCurrentGet, wetherForecastedGet } from 'api';
import * as actions from './actions';
import { handleRequestError } from 'helpers/utils';

export function* getCurrentWeather(action) {
  yield put(actions.getCurrentWeather.start());

  const { lat, lon } = action.payload;

  let data;

  try {
    data = yield call(wetherCurrentGet, {
      lat,
      lon,
    });
  } catch (errors) {
    handleRequestError(errors);
    yield put(actions.getCurrentWeather.failure());
    return;
  }

  yield put(
    actions.getCurrentWeather.success({
      data: data,
    })
  );
}

export function* getForecastedWeather(action) {
  //TODO: rewrite whole saga
  yield put(actions.getForecastedWeather.start());

  const { lat, lon } = action.payload;

  let data;

  try {
    data = yield call(wetherForecastedGet, {
      lat,
      lon,
    });
  } catch (errors) {
    handleRequestError(errors);
    yield put(actions.getForecastedWeather.failure());
    return;
  }

  const forecastList = get(data, 'list', []);
  const allDaysList = [];

  forecastList.forEach(el => {
    allDaysList.push(moment.unix(el.dt).format('D'));
  });

  const uniqueDaysList = allDaysList.filter((elem, index, self) => {
    return index === self.indexOf(elem);
  });
  const dayDataSequence = uniqueDaysList;

  const daysSets = {};

  uniqueDaysList.forEach(el => {
    daysSets[el] = forecastList.filter(
      item => moment.unix(item.dt).format('D') === el
    );
  });

  const objectifiedData = {};
  const hourDataSequences = {};

  for (let key in daysSets) {
    if (daysSets.hasOwnProperty(key)) {
      const objectifiedDaySet = {};
      const hourDataSequence = [];
      daysSets[key].map(el => {
        objectifiedDaySet[el.dt] = el;
        hourDataSequence.push(el.dt);
      });
      objectifiedData[key] = objectifiedDaySet;
      hourDataSequences[key] = hourDataSequence;
    }
  }

  const findMin = (data, selector) => {
    // TODO: move to helpers
    let arrData = []; // TODO: IMPORTANT: REFACTOR!!!

    for (let key in data) {
      // TODO: IMPORTANT: REFACTOR!!!
      if (data.hasOwnProperty(key)) {
        arrData.push(data[key]);
      }
    }

    return Math.min.apply(
      Math,
      arrData.map(item => {
        return get(item, selector, '');
      })
    );
  };

  const findMax = (data, selector) => {
    // TODO: move to helpers

    let arrData = []; // TODO: IMPORTANT: REFACTOR!!!

    for (let key in data) {
      // TODO: IMPORTANT: REFACTOR!!!
      if (data.hasOwnProperty(key)) {
        arrData.push(data[key]);
      }
    }

    return Math.max.apply(
      Math,
      arrData.map(item => {
        return get(item, selector, '');
      })
    );
  };

  const findMostly = (data, selector) => {
    // TODO: move to helpers

    let arrData = []; // TODO: IMPORTANT: REFACTOR!!!

    for (let key in data) {
      // TODO: IMPORTANT: REFACTOR!!!
      if (data.hasOwnProperty(key)) {
        arrData.push(data[key]);
      }
    }

    const extractedItemsArr = arrData.map(item => {
      return get(item, selector, '');
    });

    const mostFrequent = _.head(
      _(extractedItemsArr)
        .countBy()
        .entries()
        .maxBy(_.last)
    );

    return mostFrequent;
  };

  const averagedData = {};

  for (var key in objectifiedData) {
    if (objectifiedData.hasOwnProperty(key)) {
      averagedData[key] = {
        minTemp: findMin(objectifiedData[key], 'main.temp'),
        maxTemp: findMax(objectifiedData[key], 'main.temp'),

        minPressure: findMin(objectifiedData[key], 'main.pressure'),
        maxPressure: findMax(objectifiedData[key], 'main.pressure'),

        minHumidity: findMin(objectifiedData[key], 'main.humidity'),
        maxHumidity: findMax(objectifiedData[key], 'main.humidity'),

        mostlyWeatherDescription: findMostly(
          objectifiedData[key],
          'weather[0].description'
        ),
        mostlyWeatherIcon: findMostly(objectifiedData[key], 'weather[0].icon'),

        minClouds: findMin(objectifiedData[key], 'main.clouds'),
        maxClouds: findMax(objectifiedData[key], 'main.clouds'),

        minSpeed: findMin(objectifiedData[key], 'wind.speed'),
        maxSpeed: findMax(objectifiedData[key], 'wind.speed'),
      };
    }
  }

  yield put(
    actions.getForecastedWeather.success({
      data: objectifiedData,
      averagedData: averagedData,
      dayDataSequence,
      hourDataSequences,
    })
  );
}

export function* forecastSagas() {
  yield all([
    yield takeEvery(actions.setSelectedLocation, getCurrentWeather), // TODO: refactor
    yield takeEvery(actions.setSelectedLocation, getForecastedWeather), // TODO: refactor
  ]);
}
