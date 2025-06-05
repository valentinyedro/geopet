import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HeaderSafeArea() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurar área segura</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingHorizontal: 20,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 24,
  },
});