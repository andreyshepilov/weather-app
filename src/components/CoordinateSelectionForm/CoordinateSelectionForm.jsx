import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from 'constants/routes';
import * as forecastActions from 'store/forecast/actions';
import history from 'componentsCommon/history';

import { handleNotification } from 'helpers/utils';

import styles from './CoordinateSelectionForm.module.scss';

function CoordinateSelectionForm() {
  const dispatch = useDispatch();

  const [location, setLocation] = useState({
    lat: 0,
    lon: 0,
  });

  const [isEmpty, setIsEmpty] = useState(true);

  const onChange = e => {
    setLocation({
      ...location,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    if (
      location.lat >= -90 &&
      location.lat <= 90 &&
      location.lon >= -180 &&
      location.lon <= 180
    ) {
      dispatch(
        forecastActions.setSelectedLocation({
          lat: location.lat,
          lon: location.lon,
        })
      );

      history.push(`/${ROUTES.FORECAST}`);
    } else {
      handleNotification('Wrong location coordinates!', 'error');
    }
  };

  return (
    <div className={styles.rootWrapper}>
      <form className={styles.form}>
        <label htmlFor='lat'>Latitude: </label>
        <input
          type='number'
          id='lat'
          name='lat'
          placeholder='Latitude'
          min='-90'
          max='90'
          onChange={onChange}
        />
        <label htmlFor='lon'>Longitude: </label>
        <input
          type='number'
          id='lon'
          name='lon'
          placeholder='Longitude'
          min='-180'
          max='180'
          onChange={onChange}
        />
      </form>
      <button
        type='button'
        onClick={onSubmit}
        className={styles.submitButton}
        disabled={!(location.lat && location.lon)}
      >
        Submit
      </button>
    </div>
  );
}

export default CoordinateSelectionForm;
