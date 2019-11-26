import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { get } from 'lodash';

import cloudLogo from 'assets/icons/cloud-1.svg';
import atmPressureLogo from 'assets/icons/pressure-1.svg';
import humidityLogo from 'assets/icons/humidity.svg';
import cloudinessLogo from 'assets/icons/cloud-2.svg';
import windSpeedLogo from 'assets/icons/wind.svg';
import windDirectionLogo from 'assets/icons/wind-direction.svg';
import rainVolumeLogo from 'assets/icons/drop.svg';
import snowVolumeLogo from 'assets/icons/snowflake.svg';
import calculationTimeLogo from 'assets/icons/time-left.svg';
import sunriseLogo from 'assets/icons/sunrise.svg';
import sunsetLogo from 'assets/icons/sunset.svg';

import styles from './CurrentWeather.module.scss';

function CurrentWeather() {
  const currentWeather = useSelector(
    state => state.forecast.currentWeather.data
  );

  const [detailsIsOpened, setDetailsIsOpened] = useState(false);

  const weatherConditionDescription = get(
    currentWeather,
    'weather[0].description',
    ''
  );
  const weatherConditionIconCode = get(currentWeather, 'weather[0].icon', '');

  const mainTemp = get(currentWeather, 'main.temp', '');
  const minTemp = get(currentWeather, 'main.temp_min', '');
  const maxTemp = get(currentWeather, 'main.temp_max', '');

  const atmPressureMain = get(currentWeather, 'main.pressure', '');
  const atmPressureSea = get(currentWeather, 'main.sea_level', '');
  const atmPressureGround = get(currentWeather, 'main.grnd_level', '');

  const humidity = get(currentWeather, 'main.humidity', '');

  const windSpeed = get(currentWeather, 'wind.speed', '');
  const windDirection = get(currentWeather, 'wind.deg', '');

  const cloudiness = get(currentWeather, 'clouds.all', '');

  const rainVolume1 = get(currentWeather, 'rain.1h', '');
  const rainVolume3 = get(currentWeather, 'rain.3h', '');

  const snowVolume1 = get(currentWeather, 'snow.1h', '');
  const snowVolume3 = get(currentWeather, 'snow.3h', '');

  const calculationTime = get(currentWeather, 'dt', '');

  const sunriseTime = get(currentWeather, 'sys.sunrise', '');
  const sunsetTime = get(currentWeather, 'sys.sunset', '');

  const additionalParamsData = [
    {
      logo: atmPressureLogo,
      logoAltText: 'pressure main icon',
      text: 'Atm. pressure, hPa:',
      value: atmPressureMain,
    },
    {
      logo: atmPressureLogo,
      logoAltText: 'pressure sea level icon',
      text: 'Atm. pressure (sea level), hPa:',
      value: atmPressureSea,
    },
    {
      logo: atmPressureLogo,
      logoAltText: 'pressure ground level icon',
      text: 'Atm. pressure (ground level), hPa:',
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
      text: 'Wind speed, m/s:',
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
      logoAltText: 'rain volume 1h icon',
      text: 'Rain volume 1h, mm:',
      value: rainVolume1,
    },
    {
      logo: rainVolumeLogo,
      logoAltText: 'rain volume 3h icon',
      text: 'Rain volume 3h :',
      value: rainVolume3,
    },
    {
      logo: snowVolumeLogo,
      logoAltText: 'snow volume 1h icon',
      text: 'Snow volume 1h:',
      value: snowVolume1,
    },
    {
      logo: snowVolumeLogo,
      logoAltText: 'snow volume 3h icon',
      text: 'Snow volume 3h:',
      value: snowVolume3,
    },
    {
      logo: calculationTimeLogo,
      logoAltText: 'time of calculation icon',
      text: 'Time of calculation:',
      value: calculationTime,
    },
    {
      logo: sunriseLogo,
      logoAltText: 'sunrise icon',
      text: 'Sunrise time:',
      value: sunriseTime,
    },
    {
      logo: sunsetLogo,
      logoAltText: 'sunset icon',
      text: 'Sunset time:',
      value: sunsetTime,
    },
  ];

  const renderAdditionalParamsList = dataList => {
    return (
      <ul
        className={classNames(styles.otherParamsList, {
          [styles.otherParamsListOpened]: detailsIsOpened,
        })}
      >
        {dataList.map((el, index) =>
          el.value ? (
            <li className={styles.otherParamsItem} key={index}>
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

  const onDetailsOpenClose = () => {
    detailsIsOpened === false
      ? setDetailsIsOpened(true)
      : setDetailsIsOpened(false);
  };

  return (
    <div className={styles.rootWrapper}>
      <h5 className={styles.pageHeading}>Weather today: </h5>

      <div className={styles.tempWeatherWrapper}>
        <div className={styles.temperatureSection}>
          {maxTemp ? (
            <div className={styles.temperatureMinMax}>Min: {maxTemp}, C</div>
          ) : null}
          {mainTemp ? (
            <div className={styles.temperatureMain}>{mainTemp}, C</div>
          ) : null}
          {minTemp ? (
            <div className={styles.temperatureMinMax}>Max: {minTemp}, C</div>
          ) : null}
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

      <button
        onClick={onDetailsOpenClose}
        type='button'
        className={classNames(styles.showMoreButton, {
          [styles.showMoreButtonOpenedState]: detailsIsOpened,
        })}
      >
        {detailsIsOpened ? 'Show less' : 'Show more'}
      </button>

      {renderAdditionalParamsList(additionalParamsData)}
    </div>
  );
}

export default CurrentWeather;
