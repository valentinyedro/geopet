import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { loadNotificationSettings, handleSaveNotifications } from '../services/AuxiliaryService';

export default function NotificationsModal({ visible, onClose }) {
  const [isSafeAreaChecked, setIsSafeAreaChecked] = useState(false);
  const [isBatteryChecked, setIsBatteryChecked] = useState(false);
  
  // Estado para controlar si ya se ha solicitado permiso
  const [permissionGranted, setPermissionGranted] = useState(null);

  // Solicitar permisos cuando el modal se abra
  useEffect(() => {
    if (visible) {
      requestPermissions();
    }
  }, [visible]);

  const requestPermissions = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      setPermissionGranted(status === 'granted');
      
    } catch (error) {
      console.error('Error al solicitar permisos', error);
    }
  };

  useEffect(() => {
    if (visible) {
      loadNotificationSettings(setIsSafeAreaChecked, setIsBatteryChecked);
    }
  }, [visible]);

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Configurar Notificaciones</Text>

          {/* Notificación sobre permisos */}
          {permissionGranted === false && (
            <Text style={styles.permissionText}>
              No se han habilitado las notificaciones. Por favor habilítelas en la configuración.
            </Text>
          )}
          
          {/* Switches para las notificaciones */}
          <View style={styles.switchContainer}>
            <View style={styles.switchRow}>
              <Switch
                value={isSafeAreaChecked}
                onValueChange={setIsSafeAreaChecked}
              />
              <Text style={styles.switchText}>
                Permitir notificaciones cuando la mascota sale del área segura
              </Text>
            </View>
            
            <View style={styles.switchRow}>
              <Switch
                value={isBatteryChecked}
                onValueChange={setIsBatteryChecked}
              />
              <Text style={styles.switchText}>
                Permitir notificaciones cuando la batería del dispositivo sea baja
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.closeButton} onPress={() => {handleSaveNotifications(isSafeAreaChecked, isBatteryChecked, onClose)}}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 340,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  switchContainer: {
    width: '100%',
    marginVertical: 10,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchText: {
    marginLeft: 10,
    marginRight: 60,
    textAlign: 'justify',
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: '#0A4C69',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  permissionText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});