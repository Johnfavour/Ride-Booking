import axios from 'axios';

const UBER_API_KEY = 'o5nYdfOi9UiKPMgvvbghMxb9Mg8MI2bOzHtmWUf1'; // Replace this with your actual Uber API key
const BASE_URL = 'https://api.uber.com/v1.2/estimates/price';

export const fetchRideEstimates = async (pickupLat, pickupLon, destLat, destLon) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Token ${UBER_API_KEY}`, // Uber API key for authorization
      },
      params: {
        start_latitude: pickupLat,
        start_longitude: pickupLon,
        end_latitude: destLat,
        end_longitude: destLon,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching ride estimates:', error.response?.data || error.message);
    throw new Error('Error fetching ride estimates');
  }
};
