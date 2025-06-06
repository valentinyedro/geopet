import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';

export default function MapHome({ latitude, longitude, radius, safeLocation, isLoading }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Punto central */}
        <Marker
          coordinate={{ latitude, longitude }} 
          pinColor="#0A4C69"
          draggable={false}
        />

        {/* Círculo de área segura */}
        {safeLocation && radius && (
          <Circle
            center={{ latitude: safeLocation.latitude, longitude: safeLocation.longitude }}
            radius={radius}
            strokeWidth={2}
            strokeColor="#0A4C69"
            fillColor="rgba(10, 76, 105, 0.2)"
          />
        )}
      </MapView>

      {/* Capa oscurecida sobre el mapa */}
      {isLoading && (
        <View style={styles.overlay}>
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Oscurecer el mapa
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
  },
});