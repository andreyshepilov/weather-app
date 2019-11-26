import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import moment from 'moment';

import * as forecastActions from 'store/forecast/actions';

import atmPressureLogo from 'assets/icons/pressure-1.svg';
import humidityLogo from 'assets/icons/humidity.svg';
import cloudinessLogo from 'assets/icons/cloud-2.svg';
import windSpeedLogo from 'assets/icons/wind.svg';
import temperatureLogo from 'assets/icons/thermometer.svg';

import { ThreeHourCard } from 'components/ThreeHourCard';

import styles from './DayForecastDetails.module.scss';

function DayForecastDetails() {
  const dispatch = useDispatch();

  const selectedDayId = useSelector(
    state => state.forecast.forecastedWeather.selectedDayId
  );

  const averagedData = useSelector(
    state => state.forecast.forecastedWeather.averagedData[selectedDayId]
  );

  const dayData = useSelector(state =>
    get(state, `forecast.forecastedWeather.data[${selectedDayId}]`, '')
  );

  const hourDataSequences = useSelector(
    state => state.forecast.forecastedWeather.hourDataSequences
  );

  const thisDayDataSequence = get(hourDataSequences, `[${selectedDayId}]`, []);

  const formattedDayDate = moment
    .unix(dayData[Object.keys(dayData)[0]].dt)
    .format('MMM Do YYYY');

  const minTemp = get(averagedData, 'minTemp', '');
  const maxTemp = get(averagedData, 'maxTemp', '');

  const minPressure = get(averagedData, 'minPressure', '');
  const maxPressure = get(averagedData, 'maxPressure', '');

  const minHumidity = get(averagedData, 'minHumidity', '');
  const maxHumidity = get(averagedData, 'maxHumidity', '');

  const minClouds = get(averagedData, 'minClouds', '');
  const maxClouds = get(averagedData, 'maxClouds', '');

  const minSpeed = get(averagedData, 'minSpeed', '');
  const maxSpeed = get(averagedData, 'maxSpeed', '');

  const onHideCardDetails = () => {
    dispatch(forecastActions.hideDayForecastDetails());
  };

  const paramsData = [
    {
      logo: temperatureLogo,
      logoAltText: 'average temperature icon',
      infoNode: (
        <span>
          Temperature: from <b>{minTemp}</b>, C to <b>{maxTemp}</b>, C
        </span>
      ),
    },
    {
      logo: atmPressureLogo,
      logoAltText: 'average atm pressure icon',
      infoNode: (
        <span>
          Atm. pressure: from <b>{minPressure}</b>, hPa to <b>{maxPressure}</b>,
          hPa
        </span>
      ),
    },
    {
      logo: humidityLogo,
      logoAltText: 'average humidity icon',
      infoNode: (
        <span>
          Humidity: from <b>{minHumidity}</b>, % to <b>{maxHumidity}</b>, %
        </span>
      ),
    },
    {
      logo: cloudinessLogo,
      logoAltText: 'average cloudiness icon',
      infoNode: (
        <span>
          Cloudiness: from <b>{minClouds}</b>, % to <b>{maxClouds}</b>, %
        </span>
      ),
    },
    {
      logo: windSpeedLogo,
      logoAltText: 'average wind speed icon',
      infoNode: (
        <span>
          Wind speed: from <b>{minSpeed}</b>, m/s to <b>{maxSpeed}</b>, m/s
        </span>
      ),
    },
  ];

  const renderParamsList = dataList => {
    return (
      <ul className={styles.paramsList}>
        {dataList.map((el, index) => (
          <li className={styles.paramsItem} key={index}>
            <img
              className={styles.infoLogo}
              src={el.logo}
              alt={el.logoAltText}
            />
            {el.infoNode}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.rootWrapper}>
      <h5 className={styles.heading}>{formattedDayDate}</h5>
      {renderParamsList(paramsData)}

      <div className={styles.cardListWrapper}>
        {thisDayDataSequence.map(el => {
          return (
            <div className={styles.threeHourCardWrapper} key={el}>
              <ThreeHourCard cardId={el} />
            </div>
          );
        })}
      </div>

      <button onClick={onHideCardDetails} className={styles.closeButton}>
        Close
      </button>
    </div>
  );
}

export default DayForecastDetails;
