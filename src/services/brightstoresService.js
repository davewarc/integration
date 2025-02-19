import { createApiClient } from '../utils/apiClient.js';
import config from '../config/config.js';
import axios from 'axios';

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
    console.error('Error from Brightstores:', error.response?.data || error.message);
    throw error;
  }
}
