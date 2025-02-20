import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import RouterProvider from './routes/RouterProvider';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <RouterProvider />
    </Provider>
  );
}

export default App;
