import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocation } from '../services/ThingspeakService';
import Toast from 'react-native-toast-message';


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

// Llamar a la API de ThingSpeak

export const fetchLocation = async (route, navigation, setLocation) => {
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
};

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
    const safeAreaNotification = isSafeAreaChecked !== undefined || null ? isSafeAreaChecked : false;
    const batteryNotification = isBatteryChecked !== undefined || null ? isBatteryChecked : false;

    // Guardamos los valores en AsyncStorage
    await AsyncStorage.setItem('safeAreaNotification', JSON.stringify(safeAreaNotification));
    await AsyncStorage.setItem('batteryNotification', JSON.stringify(batteryNotification));
    
    // Cerrar el modal después de guardar los cambios
    onClose();
  } catch (error) {
    console.error('Error al guardar la configuración de notificaciones:', error);
  }
};

