import React from 'react';

import styles from './PageErrorBoundary.module.scss';

class PageErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: JSON.stringify(error) };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2 className={styles.heading}>Error!</h2>
          <div className={styles.errorMessage}>
            Message: {this.state.errorMessage}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PageErrorBoundary;
