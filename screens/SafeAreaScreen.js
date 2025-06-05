import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import HeaderSafeArea from '../components/HeaderSafeArea';
import MapSafeArea from '../components/MapSafeArea';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SafeAreaScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [radius, setRadius] = useState(50);  // Radio inicial del área segura en metros
  const [markerPosition, setMarkerPosition] = useState({
    latitude: route.params?.lat || -34.759524,  // Latitud inicial
    longitude: route.params?.lon || -58.204984, // Longitud inicial
  });

  const handleConfirm = () => {
    // Guardar la nueva ubicación en AsyncStorage
    AsyncStorage.setItem('safeLatitude', markerPosition.latitude.toString());
    AsyncStorage.setItem('safeLongitude', markerPosition.longitude.toString());
    AsyncStorage.setItem('radius', radius.toString())
      .then(() => {
          navigation.navigate('Home', { toastMessage: 'Área segura actualizada', skipInitialLocationToast: true });
        })
        .catch((error) => console.error('Error guardando las coordenadas:', error));
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <HeaderSafeArea />
      
      {/* Mapa */}
      <View style={styles.mapContainer}>
        <MapSafeArea
          latitude={markerPosition.latitude}
          longitude={markerPosition.longitude}
          radius={radius}
          onDragEnd={(e) => {
            const newCoordinate = e.nativeEvent.coordinate;
            setMarkerPosition({
              latitude: newCoordinate.latitude,
              longitude: newCoordinate.longitude,
            });
          }}
        />
      </View>

      {/* Título y descripción */}
      <Text style={styles.title}>Área segura</Text>
      <Text style={styles.description}>
        A partir del punto establecido se creará un área segura que cubrirá un radio de la longitud elegida en forma circular.
        Si la mascota sale de esta área, usted será notificado.
      </Text>

      {/* Range slider */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Radio del área (en metros)</Text>
        
        {/* Valores del slider */}
        <View style={styles.sliderValuesContainer}>
          <Text style={styles.sliderValue}>10</Text>
          <Text style={styles.sliderValue}>100</Text>
        </View>

        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={500}
          step={10}
          value={radius}
          onValueChange={(value) => setRadius(value)}
          minimumTrackTintColor="#0A4C69"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#0A4C69"
        />

        {/* Valor actual del slider */}
        <Text style={styles.currentValue}>{`${radius} m`}</Text>
      </View>

      {/* Botón de Confirmar */}
      <View style={styles.buttonContainer}>
        <Text style={styles.confirmButton} onPress={handleConfirm}>
          Confirmar
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  mapContainer: {
    height: 330,
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  sliderContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sliderValuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  sliderValue: {
    fontSize: 14,
    color: '#555',
  },
  slider: {
    width: '100%',
    marginTop: 0,
  },
  currentValue: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 40,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#0A4C69',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',  // Hace que el botón ocupe todo el ancho disponible
    textAlign: 'center',  // Centra el texto dentro del botón
  },

});