/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Root } from 'native-base';
import NavigationApps from 'App/Navigator/Navigator';
import { Provider } from 'react-redux';
import configureStore from 'App/Redux/Store';


const App: () => React$Node = () => {
  const store = configureStore({});
  return (
    <Root>
      <Provider store={store}>
        <NavigationApps />
      </Provider>
    </Root>
  );
};

export default App;
