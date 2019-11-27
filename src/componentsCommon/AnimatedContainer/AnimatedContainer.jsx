import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

AnimatedContainer.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

function AnimatedContainer({ show, children }) {
  const [render, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    render && (
      <div
        style={{ animation: `${show ? 'fadeIn' : 'fadeOut'} 0.3s`, }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  );
}

export default AnimatedContainer;
