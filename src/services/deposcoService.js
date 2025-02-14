import { createApiClient } from '../utils/apiClient.js';
import config from '../config/config.js';

const deposcoClient = createApiClient(
  config.deposco.apiUrl,
  config.deposco.apiKey
);

export const pushOrderToDeposco = async (orderData) => {
  try {
    const response = await deposcoClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error pushing order to Deposco:', error.response?.data || error.message);
    throw error;
  }
};
