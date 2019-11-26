import { API } from './api';

const DOMAIN = process.env.REACT_APP_DOMAIN;

export const api = new API(DOMAIN);

export const wetherCurrentGet = params =>
  api.get(
    `data/2.5/weather?lat=${params.lat}&lon=${params.lon}&units=metric&appid=${'fcd998ee9c26cfac2118a94f69d9fbcd'}`
  ); // TODO: move ippid, add custom units feature

export const wetherForecastedGet = params =>
  api.get(
    `data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&units=metric&appid=${'fcd998ee9c26cfac2118a94f69d9fbcd'}`
  ); // TODO: move ippid, add custom units feature
