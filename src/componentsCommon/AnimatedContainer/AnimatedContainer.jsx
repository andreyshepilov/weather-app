import React, { useState, useEffect } from 'react';

import './styles.css';

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
        style={{ animation: `${show ? 'fadeIn' : 'fadeOut'} 1s` }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  );
}

export default AnimatedContainer;
