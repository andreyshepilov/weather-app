import React from 'react';

import { PageErrorBoundary } from 'componentsCommon/PageErrorBoundary';
import { Header } from 'componentsCommon/Header';
import { Footer } from 'componentsCommon/Footer';

import styles from './CommonLayout.module.scss';

function CommonLayout({ children }) {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Header />
      </div>
      <main className={styles.mainContentWrapper}>
        <div className={styles.container}>
          <PageErrorBoundary>{children}</PageErrorBoundary>
        </div>
      </main>
      <div className={styles.container}>
        <Footer />
      </div>
    </div>
  );
}

export default CommonLayout;
