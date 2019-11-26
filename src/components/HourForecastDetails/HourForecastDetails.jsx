import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import moment from 'moment';

import * as forecastActions from 'store/forecast/actions';

import temperatureLogo from 'assets/icons/thermometer.svg';
import atmPressureLogo from 'assets/icons/pressure-1.svg';
import humidityLogo from 'assets/icons/humidity.svg';
import cloudinessLogo from 'assets/icons/cloud-2.svg';
import windSpeedLogo from 'assets/icons/wind.svg';
import windDirectionLogo from 'assets/icons/wind-direction.svg';
import rainVolumeLogo from 'assets/icons/drop.svg';
import snowVolumeLogo from 'assets/icons/snowflake.svg';
import calculationTimeLogo from 'assets/icons/time-left.svg';
import cloudLogo from 'assets/icons/cloud-1.svg';

import styles from './HourForecastDetails.module.scss';

function HourForecastDetails() {
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
      `forecast.forecastedWeather.data[${selectedDayId}][${selectedHourId}]`,
      {}
    )
  );

  const forecastTime = moment
    .unix(get(thisHourData, 'dt', ''))
    .format('MMM Do YYYY, hh:mm'); // TODO: set default date

  const weatherConditionIconCode = get(thisHourData, 'weather[0].icon', '');
  const weatherConditionDescription = get(
    thisHourData,
    'weather[0].description',
    ''
  );

  const minTemp = get(thisHourData, 'main.temp_min', '');
  const mainTemp = get(thisHourData, 'main.temp', '');
  const maxTemp = get(thisHourData, 'main.temp_max', '');
  const atmPressureMain = get(thisHourData, 'main.pressure', '');
  const atmPressureSea = get(thisHourData, 'main.sea_level', '');
  const atmPressureGround = get(thisHourData, 'main.grnd_level', '');
  const humidity = get(thisHourData, 'main.humidity', '');
  const cloudiness = get(thisHourData, 'clouds.all', '');
  const windSpeed = get(thisHourData, 'wind.speed', '');
  const windDirection = get(thisHourData, 'wind.deg', '');
  const rainVolume = get(thisHourData, 'rain.3h', '');
  const snowVolume = get(thisHourData, 'snow.3h', '');
  const calculationTime = get(thisHourData, 'dt_txt', '');

  const onHideCardDetails = () => {
    dispatch(forecastActions.hideHourForecastDetails());
  };

  const renderParamsList = dataList => {
    return (
      <ul className={styles.paramsList}>
        {dataList.map((el, index) =>
          el.value ? (
            <li className={styles.paramsItem} key={index}>
              <img
                className={styles.infoLogo}
                src={el.logo}
                alt={el.logoAltText}
              />
              <span className={styles.infoText}>
                {el.text}
                {'  '}
                {el.value}
              </span>
            </li>
          ) : null
        )}
      </ul>
    );
  };

  const paramsData = [
    {
      logo: temperatureLogo,
      logoAltText: 'min temperature icon',
      text: 'Minimum temperature, C:',
      value: minTemp,
    },
    {
      logo: temperatureLogo,
      logoAltText: 'main temperature icon',
      text: 'Temperature, C:',
      value: mainTemp,
    },
    {
      logo: temperatureLogo,
      logoAltText: 'max temperature icon',
      text: 'Maximum temperature, C:',
      value: maxTemp,
    },
    {
      logo: atmPressureLogo,
      logoAltText: 'atmospheric pressure icon',
      text: 'Atmospheric pressure, hPa:',
      value: atmPressureMain,
    },
    {
      logo: atmPressureLogo,
      logoAltText: 'atmospheric pressure sea level icon',
      text: 'Atmospheric pressure on the sea level, hPa:',
      value: atmPressureSea,
    },
    {
      logo: atmPressureLogo,
      logoAltText: 'atmospheric pressure ground level icon',
      text: 'Atmospheric pressure on the ground level, hPa:',
      value: atmPressureGround,
    },
    {
      logo: humidityLogo,
      logoAltText: 'humidity icon',
      text: 'Humidity, %:',
      value: humidity,
    },
    {
      logo: cloudinessLogo,
      logoAltText: 'cloudiness icon',
      text: 'Cloudiness, %:',
      value: cloudiness,
    },
    {
      logo: windSpeedLogo,
      logoAltText: 'wind speed icon',
      text: 'Wind speed, meter/sec :',
      value: windSpeed,
    },
    {
      logo: windDirectionLogo,
      logoAltText: 'wind direction icon',
      text: 'Wind direction, degrees:',
      value: windDirection,
    },
    {
      logo: rainVolumeLogo,
      logoAltText: 'rain volume 3h icon',
      text: 'Rain volume for last 3 hours, mm:',
      value: rainVolume,
    },
    {
      logo: snowVolumeLogo,
      logoAltText: 'snow volume 3h icon',
      text: 'Snow volume for last 3 hours, mm:',
      value: snowVolume,
    },
    {
      logo: calculationTimeLogo,
      logoAltText: 'time of calculation icon',
      text: 'Time of calculation:',
      value: calculationTime,
    },
  ];

  return (
    <div className={styles.rootWrapper}>
      <h5 className={styles.heading}>{forecastTime}</h5>

      <div className={styles.weatherConditionSection}>
        <div className={styles.weatherConditionIconWrapper}>
          {weatherConditionIconCode ? (
            <img
              src={`http://openweathermap.org/img/wn/${weatherConditionIconCode}@2x.png`}
              alt='weather condition icon'
            />
          ) : (
            <img src={cloudLogo} alt='weather condition icon' /> // TODO: style default icon
          )}
        </div>
        <div className={styles.weatherConditionDescription}>
          {weatherConditionDescription}
        </div>
      </div>

      {renderParamsList(paramsData)}

      <button onClick={onHideCardDetails} className={styles.closeButton}>
        Close
      </button>
    </div>
  );
}

export default HourForecastDetails;
