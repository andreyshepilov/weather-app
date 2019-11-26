import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { RootRouter } from 'RootRouter';

import bgImage from 'assets/images/rain-316579_1280.jpg';

import 'stylesCommon/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import styles from './TopLevelLayout.module.scss';

function TopLevelLayout() {
  return (
    <Fragment>
      <ToastContainer />
      <RootRouter />
      <div
        className={styles.backgroundHolder} // should be here because animatedRoute
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>
    </Fragment>
  );
}

export default TopLevelLayout;
