import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';

import { TopLevelLayout } from 'layouts/TopLevelLayout';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <TopLevelLayout />
      </Provider>
    </div>
  );
}

export default App;
