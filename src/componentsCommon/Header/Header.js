import React from 'react';
import styles from './Header.module.scss';
import { ROUTES } from 'constants/routes';
import history from 'componentsCommon/history';

function Header() {
  const onGoToRoot = () => {
    history.push(`/${ROUTES.SELECT_LOCATION}`);
  };

  return (
    <header className={styles.rootWrapper}>
      <div className={styles.logo} onClick={onGoToRoot}>
        <div className={`${styles.half} ${styles.left}`}>Weather</div>
        <div className={`${styles.half} ${styles.right}`}>
          <span>app</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
