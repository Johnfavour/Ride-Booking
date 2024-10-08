import axios from 'axios';

export const fetchLocationSuggestions = async (query) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
      params: {
        input: query,
        key: 'API_KEY',
      },
    });
    return response.data.predictions;
  } catch (error) {
    console.error('Error fetching locations', error);
    throw error;
  }
};
