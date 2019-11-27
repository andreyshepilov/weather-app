import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ROUTES } from 'constants/routes';
import history from 'componentsCommon/history';

import { CommonLayout } from 'layouts/CommonLayout';

import { LocationInfo } from 'components/LocationInfo';
import { CurrentWeather } from 'components/CurrentWeather';
import { ForecastedWeather } from 'components/ForecastedWeather';
import { DayForecastDetails } from 'components/DayForecastDetails';
import { AnimatedContainer } from 'componentsCommon/AnimatedContainer';
import { HourForecastDetails } from 'components/HourForecastDetails';

import styles from './ForecastPage.module.scss';

function ForecastPage() {
  const dayDetailsOpened = useSelector(
    state => state.forecast.forecastedWeather.dayDetailsSectionIsOpened
  );

  const hourDetailsOpened = useSelector(
    state => state.forecast.forecastedWeather.hourDetailsSectionIsOpened
  );

  const dataIsLoaded = useSelector(state => state.forecast.dataIsLoaded);

  const currentWeatherLoading = useSelector(
    state => state.forecast.currentWeather.loading
  );

  const forecastedWeather = useSelector(
    state => state.forecast.forecastedWeather.loading
  );

  useEffect(() => {
    if (!dataIsLoaded && !currentWeatherLoading && !forecastedWeather)
      history.push(`/${ROUTES.REDIRECT_URL}`);
  }, [dataIsLoaded, currentWeatherLoading, forecastedWeather]);

  return (
    <CommonLayout>
      <div className={styles.rootWrapper}>
        <section className={styles.locationCurrentWeatherSection}>
          <div className={styles.locationInfoWrapper}>
            <LocationInfo />
          </div>
          <div className={styles.currentWeatherWrapper}>
            <CurrentWeather />
          </div>
        </section>
        <section className={styles.forecastedWeatherSection}>
          <ForecastedWeather />
        </section>
        <AnimatedContainer show={dayDetailsOpened}>
          <section className={styles.dayDetailsSection}>
            <DayForecastDetails />
          </section>
        </AnimatedContainer>
        <AnimatedContainer show={hourDetailsOpened}>
          <section className={styles.hourDetailsSection}>
            <HourForecastDetails />
          </section>
        </AnimatedContainer>
      </div>
    </CommonLayout>
  );
}

export default ForecastPage;
