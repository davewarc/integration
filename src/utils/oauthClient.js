import axios from 'axios';
import qs from 'qs';
import config from '../config/config.js';

export const getOauthToken = async (clientId, clientSecret) => {
  const data = qs.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
    scope: 'read',
  });

  const axiosConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${config.gainsight.apiUrl}/oauth2/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };

  try {
    const response = await axios.request(axiosConfig);
    return response.data;
  } catch (error) {
    console.error('Error getting OAuth token:', error.response?.data || error.message);
    throw error;
  }
};
