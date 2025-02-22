import dotenv from 'dotenv';

dotenv.config();

const config = {
  gainsight: {
    clientId: process.env.GAINSIGHT_API_CLIENT_ID,
    clientKey: process.env.GAINSIGHT_API_CLIENT_KEY,
    apiUrl: process.env.GAINSIGHT_API_URL,
  },
  brightstores: {
    apiUrl: process.env.BRIGHTSTORES_API_URL,
    apiKey: process.env.BRIGHTSTORES_API_KEY,
  },
  deposco: {
    apiUrl: process.env.DEPOSCO_API_URL,
    tenant: process.env.DEPOSCO_API_TENANT,
    username: process.env.DEPOSCO_USER_NAME,
    password: process.env.DEPOSCO_PASSWORD,
  },
};

export default config;
