import React from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';

import { ROUTES } from 'constants/routes';
import history from 'componentsCommon/history';

import styles from './LocationInfo.module.scss';

function LocationInfo() {
  const selectedLocation = useSelector(
    state => state.forecast.selectedLocation
  );

  const cityNameFromCurrent = useSelector(state =>
    get(state, 'forecast.currentWeather.data.name', '')
  );
  const cityNameFromForecasted = useSelector(state =>
    get(state, 'forecast.forecastedWeather.data.city.name', '')
  );

  const countryCodeFromCurrent = useSelector(state =>
    get(state, 'forecast.currentWeather.data.sys.country', '')
  );
  const countryCodeFromForecasted = useSelector(state =>
    get(state, 'forecast.forecastedWeather.data.city.country', '')
  );

  const onChangeLocation = () => {
    history.push(`/${ROUTES.SELECT_LOCATION}`);
  };

  return (
    <div className={styles.rootWrapper}>
      <div className={styles.topWrapper}>
        <h5>Your location:</h5>
        <div>Lat: {selectedLocation.lat}</div>
        <div>Lon: {selectedLocation.lat}</div>
        {cityNameFromCurrent || cityNameFromForecasted ? (
          <div>City: {cityNameFromCurrent || cityNameFromForecasted}</div>
        ) : null}
        {countryCodeFromCurrent || countryCodeFromForecasted ? (
          <div>
            Country: {countryCodeFromCurrent || countryCodeFromForecasted}
          </div>
        ) : null}
      </div>

      <button onClick={onChangeLocation} className={styles.backButton}>
        Change location
      </button>
    </div>
  );
}

export default LocationInfo;
