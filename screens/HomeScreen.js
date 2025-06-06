import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import MapHome from '../components/MapHome';
import SafeAreaButton from '../components/SafeAreaButton';
import NotificationsButton from '../components/NotificationsButton';
import NotificationsModal from '../components/NotificationsModal';
import RouteToPetButton from '../components/RouteToPetButton';
import Toast from 'react-native-toast-message';
import { loadCoordinates, fetchLocation, openRouteToPet, loadNotificationSettings } from '../services/AuxiliaryService';

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [modalVisible, setModalVisible] = useState(false);  // Para controlar la visibilidad del modal
  const [location, setLocation] = useState({ latitude: -34.759524, longitude: -58.204984 }); // Ubicación predeterminada
  const [safeLocation, setSafeLocation] = useState(null); // Coordenadas de la zona segura
  const [safeRadius, setSafeRadius] = useState(null); // Radio de la zona segura
  const [isLoading, setIsLoading] = useState(false);  // Estado para control del loading
  const [isSafeAreaChecked, setIsSafeAreaChecked] = useState(false);
  const [isBatteryChecked, setIsBatteryChecked] = useState(false);

  // USEEFFECTS

  // Cargar las coordenadas y el radio de la zona segura desde AsyncStorage cuando la pantalla se monta
  useEffect(() => {
    loadCoordinates(setSafeLocation, setSafeRadius);
  }, []);

  useEffect(() => {
    // Verificamos si hay un mensaje de Toast al navegar a esta pantalla
    if (route.params?.toastMessage) {
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: route.params.toastMessage,
        visibilityTime: 3000,
      });
    }
    navigation.setParams({
      toastMessage: false,
    });
  }, [route.params?.toastMessage]);  // Dependemos del parámetro toastMessage

  // Llamamos a la API de ThingSpeak cuando la pantalla se carga. Solo se ejecuta una vez cuando la pantalla se monta.
  useEffect(() => {
    setIsLoading(true);  // Activar el loading antes de la actualización
    
    setTimeout(() => {
      fetchLocation(route, navigation, setLocation, safeLocation, safeRadius, isSafeAreaChecked);  // Actualizar ubicación después de 1 segundo
      setIsLoading(false);  // Desactivar el loading
    }, 300);

  }, []);

  // LÓGICA BOTONES

  const handleReload = () => {
    setIsLoading(true);  // Activar el loading antes de la actualización

    setTimeout(() => {
      fetchLocation(route, navigation, setLocation, safeLocation, safeRadius, isSafeAreaChecked);  // Actualizar ubicación después de 1 segundo
      setIsLoading(false);  // Desactivar el loading
    }, 300);
  };

    const openNotificationsModal = () => {
    setModalVisible(true);  // Muestra el modal
  };

  const closeNotificationsModal = () => {
    setModalVisible(false); // Cierra el modal
    loadNotificationSettings(setIsSafeAreaChecked, setIsBatteryChecked);
  };

  return (
    <View style={styles.container}>
      <Header onReload={handleReload} />
      
      <View style={styles.mapContainer}>
        {/* Mostrar mapa con la capa oscurecida si está cargando */}
        {isLoading ? (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : null}
        <MapHome
          latitude={location.latitude}
          longitude={location.longitude}
          radius={safeRadius}
          safeLocation={safeLocation}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          isLoading={isLoading}
        />
      </View>
      
      <View style={styles.buttonsContainer}>
        <SafeAreaButton onPress={() => navigation.navigate('SafeArea', { lat: location.latitude, lon: location.longitude })} />
        <NotificationsButton onPress={openNotificationsModal} />
        <RouteToPetButton onPress={() => {openRouteToPet(location)}} />
      </View>

      <NotificationsModal visible={modalVisible} onClose={closeNotificationsModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20
  },
  mapContainer: {
    height: 450,  // Altura fija para el mapa
    borderRadius: 10,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,  // Cubre todo el mapa
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Fondo oscuro
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 10,
  },
  buttonsContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
});