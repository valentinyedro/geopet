import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';  // Importamos el Toast

export default function App() {
  return (
    <>
      <AppNavigator />
      <Toast />
    </>
  );
}