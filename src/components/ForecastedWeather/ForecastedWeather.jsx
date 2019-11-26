import { DayCard } from 'components/DayCard';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import styles from './ForecastedWeather.module.scss';

function ForecastedWeather() {
  const dayDataSequence = useSelector(
    state => state.forecast.forecastedWeather.dayDataSequence
  );

  return (
    <Fragment>
      <div className={styles.rootWrapper}>
        <h5>Forecast</h5>
        <div className={styles.cardListWrapper}>
          {dayDataSequence.map(key => {
            return (
              <div key={key} className={styles.dayCardWrapper}>
                <DayCard cardId={key} />
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default ForecastedWeather;
