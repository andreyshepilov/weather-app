import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import * as forecastActions from 'store/forecast/actions';

import cloudLogo from 'assets/icons/cloud-1.svg';

import styles from './DayCard.module.scss';

DayCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

function DayCard({ cardId }) {
  const dispatch = useDispatch();

  const averagedData = useSelector(
    state => state.forecast.forecastedWeather.averagedData[cardId]
  );

  const selectedDayId = useSelector(
    state => state.forecast.forecastedWeather.selectedDayId
  );

  useEffect(() => {
    selectedDayId === cardId ? setIsActive(true) : setIsActive(false);
  }, [selectedDayId, cardId]);

  const dayData = useSelector(state =>
    get(state, `forecast.forecastedWeather.data[${cardId}]`, '')
  );

  const [isActive, setIsActive] = useState(false);

  const formattedDayDate = moment
    .unix(dayData[Object.keys(dayData)[0]].dt)
    .format('MMM Do YYYY');

  const minTemp = get(averagedData, 'minTemp', '');
  const maxTemp = get(averagedData, 'maxTemp', '');

  const mostlyWeatherDescription = get(
    averagedData,
    'mostlyWeatherDescription',
    ''
  );
  const mostlyWeatherIcon = get(averagedData, 'mostlyWeatherIcon', '');

  const onShowCardDetails = () => {
    dispatch(
      forecastActions.showDayForecastDetails({
        dayId: cardId,
      })
    );
  };

  return (
    <div
      className={classNames(styles.rootWrapper, {
        [styles.rootWrapperActive]: isActive,
      })}
    >
      <h5 className={styles.currentDate}>{formattedDayDate}</h5>

      <div className={styles.weatherConditionSection}>
        <div className={styles.weatherConditionIconWrapper}>
          {mostlyWeatherIcon ? (
            <img
              src={`http://openweathermap.org/img/wn/${mostlyWeatherIcon}@2x.png`}
              alt='weather condition icon'
            />
          ) : (
            <img src={cloudLogo} alt='weather condition icon' /> // TODO: style default icon
          )}
        </div>
        <div className={styles.weatherConditionDescription}>
          Mostly {mostlyWeatherDescription}
        </div>
      </div>

      <div className={styles.temperatureSection}>
        <div className={styles.temperatureRow}>
          <div className={styles.temperatureHalfSection}>
            <div className={styles.temperaturePrefix}>from </div>
          </div>
          <div className={styles.temperatureHalfSection}>
            <div className={styles.temperatureValue}>{minTemp}</div>
            <div className={styles.temperaturePostfix}>, C</div>
          </div>
        </div>

        <div className={styles.temperatureRow}>
          <div className={styles.temperatureHalfSection}>
            <div className={styles.temperaturePrefix}>to </div>
          </div>
          <div className={styles.temperatureHalfSection}>
            <div className={styles.temperatureValue}>{maxTemp}</div>
            <div className={styles.temperaturePostfix}>, C</div>
          </div>
        </div>
      </div>

      <button onClick={onShowCardDetails} className={styles.showMoreButton}>
        Show more
      </button>
    </div>
  );
}

export default DayCard;
