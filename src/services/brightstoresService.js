import { createApiClient } from '../utils/apiClient.js';
import config from '../config/config.js';

const brightstoresClient = createApiClient(
  config.brightstores.apiUrl,
  config.brightstores.apiKey
);

const brightstoresApiKey = config.brightstores.apiKey;

export const getBrightstoreUsers = async () => {
  try {
    const response = await brightstoresClient.get(`/users?token=${brightstoresApiKey}`);
    return response.data;
  } catch (error) {
    console.error('Error of getting all users in Brightstores:', error.response?.data || error.message);
    throw error;
  }
}

export const updateBrightstoreUsers = async (userId, points) => {
  try {
    const response = await brightstoresClient.put(`/users/${userId}?token=${brightstoresApiKey}`, {
      balance: points,
    });
    return response.data;
  } catch (error) {
    console.error('Error of updating all users in Brightstores:', error.response?.data || error.message);
    throw error;
  }
}