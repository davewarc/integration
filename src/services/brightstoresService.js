import { createApiClient } from '../utils/apiClient.js';
import config from '../config/config.js';

const brightstoresClient = createApiClient(
  config.brightstores.apiUrl,
  config.brightstores.apiKey
);

const brightstoresApiKey = config.brightstores.apiKey;

export const getBrightstoreUsers = async (page, perPage) => {
  try {
    const response = await brightstoresClient.get(`/users?token=${brightstoresApiKey}&page=${page}&per_page=${perPage}`);
    return response.data;
  } catch (error) {
    console.error('Error of getting all users in Brightstores:', error.response?.data || error.message);
    throw error;
  }
}

export const createBrightstoreUsers = async (data) => {
  try {
    const response = await brightstoresClient.post(`/users?token=${brightstoresApiKey}`, data);
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

export const deleteBrightstoreUser = async (userId) => {
  try {
    const response = await brightstoresClient.delete(`/users/${userId}?token=${brightstoresApiKey}`);
    return response.data;
  } catch (error) {
    console.error('Error of updating all users in Brightstores:', error.response?.data || error.message);
    throw error;
  }
}

export const getBrightOrders = async () => {
  try {
    const response = await brightstoresClient.get(`/orders?token=${brightstoresApiKey}`);
    return response.data;
  } catch (error) {
    console.error('Error of updating all users in Brightstores:', error.response?.data || error.message);
    throw error;
  }
}

export const getBrightOrderById = async (id) => {
  try {
    const response = await brightstoresClient.get(`/orders/${id}?token=${brightstoresApiKey}`);
    return response.data;
  } catch (error) {
    console.error('Error of updating all users in Brightstores:', error.response?.data || error.message);
    throw error;
  }
}
