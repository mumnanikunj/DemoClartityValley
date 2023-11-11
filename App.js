/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';

import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import reducer from './src/redux/reducer';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/redux/saga';
import Orientation from 'react-native-orientation-locker';
import { MainRouter } from './src/navigation/Router';
import { StripeProvider } from '@stripe/stripe-react-native';
console.disableYellowBox = true;

LogBox.ignoreAllLogs()

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)
LogBox.ignoreLogs(['Sending']);
const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <StripeProvider publishableKey='pk_test_51MLKb0SCKYNLFEQfdS2uEw2y6hNwMvxdkjgIsTi00XHDRnTUWH9Eo84hQpIsQHgMHjkzucaLOerXKenrC2qCHsK700jTIaC7Cf'
    // merchantIdentifier='merchant.com.{{ClarityValley}}'
    // urlScheme="your-url-scheme"
    // threeDSecureParams={{
    //   backgroundColor: '#FFFFFF', // iOS only
    //   timeout: 5,
    //   label: {
    //     headingTextColor: '#0000',
    //     headingFontSize: 13,
    //   },
    //   navigationBar: {
    //     headerText: '3d secure',
    //   },
    //   footer: { // iOS only
    //     backgroundColor: '#FFFFFF',
    //   },
    //   submitButton: {
    //     backgroundColor: '#000000',
    //     cornerRadius: 12,
    //     textColor: '#FFFFFF',
    //     textFontSize: 14,
    //   },
    // }}
    >
    <Provider store={store}>
      <MainRouter />
    </Provider>
    </StripeProvider>
  )
}

export default App;

