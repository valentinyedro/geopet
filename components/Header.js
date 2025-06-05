import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Header({ onReload }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geopet</Text>
      <TouchableOpacity style={styles.button} onPress={onReload}>
        <Image source={require('../assets/refresh.png')} style={styles.buttonImage} />
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 8,
  },
  buttonImage: {
    width: 26,  // Ajusta el tamaño de la imagen
    height: 26, // Ajusta el tamaño de la imagen
  },
});