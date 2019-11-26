import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import { get } from 'lodash';

import * as forecastActions from 'store/forecast/actions';

import cloudLogo from 'assets/icons/cloud-1.svg';

import styles from './ThreeHourCard.module.scss';

function ThreeHourCard({ cardId }) {
  const dispatch = useDispatch();

  const selectedDayId = useSelector(
    state => state.forecast.forecastedWeather.selectedDayId
  );

  const selectedHourId = useSelector(
    state => state.forecast.forecastedWeather.selectedHourId
  );

  const thisHourData = useSelector(state =>
    get(
      state,
      `forecast.forecastedWeather.data[${selectedDayId}][${cardId}]`,
      {}
    )
  );

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    selectedHourId === cardId ? setIsActive(true) : setIsActive(false);
  }, [selectedHourId]);

  const forecastTime = moment
    .unix(get(thisHourData, 'dt', ''))
    .format('MMM Do YYYY, hh:mm'); // TODO: set default date
  const mainTemp = get(thisHourData, 'main.temp', '');
  const minTemp = get(thisHourData, 'main.temp_min', '');
  const maxTemp = get(thisHourData, 'main.temp_max', '');
  const weatherConditionDescription = get(
    thisHourData,
    'weather[0].description',
    ''
  );
  const weatherConditionIconCode = get(thisHourData, 'weather[0].icon', '');

  const onShowMore = () => {
    dispatch(
      forecastActions.showHourForecastDetails({
        hourId: cardId,
      })
    );
  };

  return (
    <div
      className={classNames(styles.rootWrapper, {
        [styles.rootWrapperOpened]: isActive,
      })}
    >
      <div>{forecastTime}</div>

      <div className={styles.tempWeatherWrapper}>
        <div className={styles.temperatureSection}>
          <div className={styles.temperatureMinMax}>Min: {maxTemp}, C</div>
          <div className={styles.temperatureMain}>{mainTemp}, C</div>
          <div className={styles.temperatureMinMax}>Max: {minTemp}, C</div>
        </div>

        <div className={styles.weatherConditionSection}>
          <div className={styles.weatherConditionIconWrapper}>
            {weatherConditionIconCode ? (
              <img
                src={`http://openweathermap.org/img/wn/${weatherConditionIconCode}@2x.png`}
                alt='weather condition icon'
              />
            ) : (
              <img src={cloudLogo} alt='weather condition icon' />
            )}
          </div>
          <div className={styles.weatherConditionDescription}>
            {weatherConditionDescription}
          </div>
        </div>
      </div>

      <button onClick={onShowMore} className={styles.showMoreButton}>
        Show more
      </button>
    </div>
  );
}

export default ThreeHourCard;
