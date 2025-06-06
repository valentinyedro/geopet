import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function RouteToPetButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Ruta hacia Mascota</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0A4C69',
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    padding: 6,
    fontWeight: 'bold',
  },
});