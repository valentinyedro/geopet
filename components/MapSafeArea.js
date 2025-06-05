import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';

export default function MapSafeArea({ latitude = -34.759524, longitude = -58.204984, radius, onDragEnd }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
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
          draggable={true}
          onDragEnd={onDragEnd }
        />

        {/* Círculo de área segura */}
        {radius && (
          <Circle
            center={{ latitude, longitude }}
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