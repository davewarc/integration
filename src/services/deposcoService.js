import axios from 'axios';
import config from '../config/config.js';

const baseUrl = config.deposco.apiUrl;
const tenant = config.deposco.tenant;
const auth = Buffer.from(`${config.deposco.username}:${config.deposco.password}`).toString('base64');

export const createDeposcoNewOrder = async (data) => {

  try {
    const response = await axios.post(
      `${baseUrl}/${tenant}/orders/updates`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error pushing order to Deposco:', error.response?.data || error.message);
    throw error;
  }
};
