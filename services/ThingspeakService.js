import axios from 'axios';

// Aquí deberás poner la URL de tu canal y tu API Key
const API_URL = 'https://api.thingspeak.com/channels/2948954/feeds.json'; // Reemplaza {channel_id} con tu ID real
const API_KEY = '5RH8XW82TON5IFJD';  // Reemplaza con tu API Key

// Función para obtener la última ubicación
export const getLocation = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: { api_key: API_KEY, results: 1 },  // Solo obtendremos el último registro
    });

    const data = response.data.feeds[0];  // Obtener el primer feed
    const latitude = parseFloat(data.field1);  // Suponiendo que el campo 1 contiene la latitud
    const longitude = parseFloat(data.field2);  // Suponiendo que el campo 2 contiene la longitud
    console.log(latitude)
    console.log(longitude)
    return { latitude, longitude };
  } catch (error) {
    console.error('Error al obtener la ubicación de ThingSpeak:', error);
    return null;
  }
};