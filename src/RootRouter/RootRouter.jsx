import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { AnimatedSwitch, spring } from 'react-router-transition';

import history from 'componentsCommon/history';
import { ROUTES } from 'constants/routes';

import { ForecastPage } from 'pages/ForecastPage';
import { LocationSelectionPage } from 'pages/LocationSelectionPage';

import './animatedRoutes.css';

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

const bounceTransition = {
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

function RootRouter() {
  return (
    <Router history={history}>
      <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className='route-animated-wrapper'
      >
        <Route
          path={`/${ROUTES.SELECT_LOCATION}`}
          exact
          component={LocationSelectionPage}
        />
        <Route path={`/${ROUTES.FORECAST}`} exact component={ForecastPage} />
        <Redirect from='*' to={`/${ROUTES.SELECT_LOCATION}`} />
      </AnimatedSwitch>
    </Router>
  );
}

export default RootRouter;
