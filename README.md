# Geopet - Localizador de Mascotas

Geopet es una aplicación móvil construida con **React Native** que permite realizar un seguimiento de la ubicación de las mascotas mediante un collar (único ejemplar construido para este fin) que sube la información a un canal de ThingSpeak. La aplicación ofrece la capacidad de establecer un área segura para cada mascota, recibir notificaciones cuando la mascota salga de esa área o cuando la batería del dispositivo esté baja, y ver la ubicación actual de la mascota en un mapa.

## Características

- **Localización en tiempo real**: Visualiza la ubicación de tu mascota en el mapa.
- **Área segura**: Configura una zona segura alrededor de la ubicación de la mascota. Recibirás una notificación si la mascota sale de esta área.
- **Notificaciones**: Recibe notificaciones si tu mascota sale del área segura o si la batería del collar es baja.
- **Interfaz amigable**: Diseño sencillo con opciones fáciles de usar para configurar el área segura y las notificaciones.

## Tecnologías

- **React Native**: Framework para desarrollar aplicaciones móviles nativas utilizando JavaScript y React.
- **React Navigation**: Librería de navegación para React Native que facilita el manejo de pantallas y rutas.
- **AsyncStorage**: Almacenamiento local para guardar configuraciones y preferencias, como el área segura y las notificaciones.
- **react-native-maps**: Librería para mostrar mapas interactivos en la aplicación, utilizada para mostrar la ubicación de la mascota y el área segura.

## Instalación

1. **Clona el repositorio**:

```bash
git clone https://github.com/tu-usuario/geopet.git
cd geopet