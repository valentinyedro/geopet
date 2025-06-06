import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocation } from '../services/ThingspeakService';
import Toast from 'react-native-toast-message';
import { getDistance } from 'geolib';
import * as Notifications from 'expo-notifications';
import { Alert, Linking } from 'react-native';

// API

// Llamar a la API de ThingSpeak

export const fetchLocation = async (route, navigation, setLocation, safeLocation, safeRadius, isSafeAreaChecked) => {
    const locationData = await getLocation();
    if (locationData) {
        setLocation(locationData);  // Actualiza el estado con la nueva ubicación

        // Mostrar el Toast de "Ubicación actualizada"
        if (!route.params?.skipInitialLocationToast) {
        Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Ubicación actualizada',
            visibilityTime: 3000,
        });
        } 
        navigation.setParams({
        skipInitialLocationToast: false,
        });
    }
    else {
        // Mostrar el Toast de error si no se pudo obtener la ubicación
        if (!route.params?.skipInitialLocationToast) {
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error al obtener la ubicación',
            visibilityTime: 3000,
        });
        }
    }
    if (isSafeAreaChecked == true)
      {
        checkSafeArea(locationData, safeLocation, safeRadius);
      }
};

// NOTIFICACIONES

// Cargar la configuración de las notificaciones desde AsyncStorage

export const loadNotificationSettings = async (setIsSafeAreaChecked, setIsBatteryChecked) => {
    try {
    const savedSafeArea = await AsyncStorage.getItem('safeAreaNotification');
    const savedBattery = await AsyncStorage.getItem('batteryNotification');
    // Si tenemos los valores guardados, los seteamos en los switches
    if (savedSafeArea !== null) {
        setIsSafeAreaChecked(JSON.parse(savedSafeArea));
    }
    if (savedBattery !== null) {
        setIsBatteryChecked(JSON.parse(savedBattery));
    }
    } catch (error) {
    console.error('Error al cargar la configuración de notificaciones:', error);
    }
};

// Guardar el estado de las notificaciones en AsyncStorage

export const handleSaveNotifications = async (isSafeAreaChecked, isBatteryChecked, onClose) => {
  try {
    // Asegurarnos de que no estamos guardando undefined
    const safeAreaNotification = (isSafeAreaChecked !== undefined && isSafeAreaChecked !== null) ? isSafeAreaChecked : false;
    const batteryNotification = (isBatteryChecked !== undefined && isBatteryChecked !== null) ? isBatteryChecked : false;

    // Guardamos los valores en AsyncStorage
    await AsyncStorage.setItem('safeAreaNotification', JSON.stringify(safeAreaNotification));
    await AsyncStorage.setItem('batteryNotification', JSON.stringify(batteryNotification));
    // Cerrar el modal después de guardar los cambios
    onClose();
  } catch (error) {
    console.error('Error al guardar la configuración de notificaciones:', error);
  }
};

// ÁREA SEGURA

// Cargar coordenadas del área segura

export const loadCoordinates = async (setSafeLocation, setSafeRadius) => {
      try {
        const storedSafeLatitude = await AsyncStorage.getItem('safeLatitude');
        const storedSafeLongitude = await AsyncStorage.getItem('safeLongitude');
        const storedRadius = await AsyncStorage.getItem('radius');

        if (storedSafeLatitude && storedSafeLongitude && storedRadius) {
          const safeLocationData = {
            latitude: parseFloat(storedSafeLatitude),
            longitude: parseFloat(storedSafeLongitude),
          };
          setSafeLocation(safeLocationData);
          setSafeRadius(parseFloat(storedRadius));
        }
      } catch (error) {
        console.error('Error al recuperar las coordenadas y el radio:', error);
      }
    };

// Verificar si la mascota está fuera del área segura
const checkSafeArea = (currentLocation, safeLocation, safeRadius) => {
  if (!safeLocation || !safeRadius) {
    return;  // Si no tenemos la zona segura o el radio, no hacemos nada
  }

  // Calculamos la distancia entre la ubicación de la mascota y el centro del área segura
  const distance = getDistance(
    { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
    { latitude: safeLocation.latitude, longitude: safeLocation.longitude }
  );
  console.log(`la distancia de la mascota es: ${distance}`)
  console.log(`Current location: ${currentLocation.latitude}, ${currentLocation.longitude}`)
  console.log(`Safe location: ${safeLocation.latitude}, ${safeLocation.longitude}`)
  console.log(`Radius: ${safeRadius}`)
  // Verificamos si la distancia es mayor que el radio de la zona segura (en metros)
  if (distance > safeRadius) {
    console.log('Mascota fuera del área segura');
    // Si está fuera del área segura, enviamos una notificación push
    Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Tu mascota ha salido del área segura!",
        body: "Tu mascota se ha alejado del área segura, por favor revisa su ubicación.",
        sound: true,
        color: '#0A4C69',
      },
      trigger: null, // Se dispara inmediatamente
    });
  }
};

// EXTRAS

// Crear ruta hacia mascota en Maps

export const openRouteToPet = (location) => {
  const petLocation = location;  // Reemplaza con las coordenadas de la mascota

  const url = `google.navigation:q=${petLocation.latitude},${petLocation.longitude}`;

  // Verificar si Google Maps está disponible en el dispositivo
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // Si no está disponible, abrir Google Maps en el navegador
        const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${petLocation.latitude},${petLocation.longitude}`;
        Linking.openURL(fallbackUrl);
      }
    })
    .catch((err) => Alert.alert("Error", "No se pudo abrir Google Maps."));
};