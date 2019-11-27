import React, { useState } from 'react';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';

import * as forecastActions from 'store/forecast/actions';
import { ROUTES } from 'constants/routes';
import history from 'componentsCommon/history';

import AlgoliaPlaces from 'algolia-places-react';

import styles from './PlaceSelectionForm.module.scss';

function PlaceSelectionForm() {
  const dispatch = useDispatch();

  const [location, setLocation] = useState({
    lat: 0,
    lon: 0,
  });

  const [isEmpty, setIsEmpty] = useState(true);

  const onSubmit = () => {
    dispatch(
      forecastActions.setSelectedLocation({
        lat: location.lat,
        lon: location.lon,
      })
    );

    history.push(`/${ROUTES.FORECAST}`);
  };

  return (
    <div className={styles.rootWrapper}>
      <div className={styles.autocompleteWrapper}>
        <AlgoliaPlaces
          placeholder='Write an address here'
          options={{
            language: 'en',
            countries: [],
            type: 'city',
          }}
          onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => {
            if (suggestion) setIsEmpty(false);
            setLocation({
              lat: get(suggestion, 'latlng.lat', 0),
              lon: get(suggestion, 'latlng.lng', 0),
            });
          }}
          onClear={() => setIsEmpty(true)}
        />
      </div>
      <button
        disabled={isEmpty}
        type='button'
        name='Submit'
        onClick={onSubmit}
        className={styles.submitButton}
      >
        Submit
      </button>
    </div>
  );
}

export default PlaceSelectionForm;
