import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function NotificationsButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Configurar Notificaciones</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0A4C69',
    paddingVertical: 12,
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