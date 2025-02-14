import { createApiClient } from '../utils/apiClient.js';
import config from '../config/config.js';

const brightstoresClient = createApiClient(
  config.brightstores.apiUrl,
  config.brightstores.apiKey
);

export const pushOrderToBrightstores = async (orderData) => {
  try {
    const response = await brightstoresClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error pushing order to Brightstores:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchBrightstoresOrders = async () => {
  try {
    const response = await brightstoresClient.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching Brightstores orders:', error.response?.data || error.message);
    throw error;
  }
};
