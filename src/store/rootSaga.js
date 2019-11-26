import { forecastSagas } from './forecast/sagas';
import { fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield fork(forecastSagas);
}
