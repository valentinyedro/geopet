import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import registerNNPushToken from 'native-notify';

export default function App() {
  return (
    <>
      <AppNavigator />
      <Toast />
    </>
  );
}