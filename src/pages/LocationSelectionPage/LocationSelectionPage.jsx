import React, { useState } from 'react';
import classNames from 'classnames';

import { CommonLayout } from 'layouts/CommonLayout';

import { PlaceSelectionForm } from 'components/PlaceSelectionForm';
import { CoordinateSelectionForm } from 'components/CoordinateSelectionForm';

import styles from './LocationSelectionPage.module.scss';

function LocationSelectionPage() {
  const [activeLocationForm, setActiveLocationForm] = useState('place');

  const onFormSelectorChange = e => {
    setActiveLocationForm(e.target.value);
  };

  return (
    <CommonLayout>
      <div className={styles.rootWrapper}>
        <h2 className={styles.pageHeading}>Select your location</h2>

        <div
          className={classNames(styles.formsWrapper, {
            [styles.formsWrapperAutocompleteActive]:
              activeLocationForm === 'place',
            [styles.formsWrappercoordinateSelectionActive]:
              activeLocationForm === 'coordinates',
          })}
        >
          <div
            className={classNames(styles.autocompleteWrapper, {
              [styles.autocompleteWrapperActive]:
                activeLocationForm === 'place',
            })}
          >
            <PlaceSelectionForm />
          </div>
          <div
            className={classNames(styles.coordinateSelectionWrapper, {
              [styles.coordinateSelectionWrapperActive]:
                activeLocationForm === 'coordinates',
            })}
          >
            <CoordinateSelectionForm />
          </div>
        </div>

        <div className={styles.formSelectionWrapper}>
          <label className={styles.container}>
            By place
            <input
              type='radio'
              checked={activeLocationForm === 'place'}
              name='radio'
              value={'place'}
              onChange={onFormSelectorChange}
            />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.container}>
            By coordinates
            <input
              type='radio'
              checked={activeLocationForm === 'coordinates'}
              name='radio'
              value={'coordinates'}
              onChange={onFormSelectorChange}
            />
            <span className={styles.checkmark}></span>
          </label>
        </div>
      </div>
    </CommonLayout>
  );
}

export default LocationSelectionPage;
