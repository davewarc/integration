import { createApiClient } from '../utils/apiClient.js';
import { getOauthToken } from '../utils/oauthClient.js';
import config from '../config/config.js';

const gainsightAuth = async () => {
  try {
    const oauthResponse = await getOauthToken(
      config.gainsight.clientId,
      config.gainsight.clientKey
    );

    return oauthResponse.access_token;

  } catch (error) {
    console.error('Error initializing Gainsight client:', error.message);
    throw error;
  }
}

const initializeClient = async (subApiUri = '') => {
  try {
    const apiKey = await gainsightAuth();
    return createApiClient(`${config.gainsight.apiUrl}${subApiUri}`, apiKey);
  } catch (error) {
    console.error('Error initializing Gainsight client:', error.message);
    throw error;
  }
};

/**
 * @module Authentication
 * @returns Get - bearer token (apiKey)
 */
export const fetchGainsightAuth = async () => {
  try {
    return await gainsightAuth();
  } catch (error) {
    console.error('Error fetching Gainsight services:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * @module Users
 * @returns Get all users
 */
export const fetchGainsightUsers = async () => {
  try {
    const gainsightClient  = await initializeClient();
    const response = await gainsightClient.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching Gainsight services:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * @module Users
 * @params UserId
 * @returns Get User By Id
 */
export const fetchGainsightUserById = async (userId) => {
  try {
    const gainsightClient  = await initializeClient();
    const response = await gainsightClient.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Gainsight services:', error.response?.data || error.message);
    throw error;
  }
}

export const registerGainsightUser = async (newUser) => {
  try {
    const gainsightClient  = await initializeClient();
    const response = await gainsightClient.post('/user/register', newUser);
    return response.data;
  } catch (error) {
    console.error('Error fetching Gainsight services:', error.response?.data || error.message);
    throw error;
  }
}

export const fetchGainsightPointsByUserIds = async (userIds) => {
  try {
    const gainsightClient  = await initializeClient();
    const response = await gainsightClient.get('/points', {
      params: {
        userId: userIds
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Gainsight services:', error.response?.data || error.message);
    throw error;
  }
}