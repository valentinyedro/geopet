import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';

export default function MapHome({ latitude, longitude, radius, safeLocation }) {
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
});