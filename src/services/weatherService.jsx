// services/weatherService.js
import axios from 'axios';

const API_KEY = "0cc1b272f0a53c213e459366098c8787";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

export const fetchWeather = async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching weather data');
    }
  };
