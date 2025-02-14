import axios from 'axios';

export const createApiClient = (apiUrl, apiKey) => {
  const instance = axios.create({
    baseURL: apiUrl,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json', // Or 'application/json', depending on your API
    },
  });

  // Interceptor for handling response errors globally
  instance.interceptors.response.use(
    response => response, // Pass successful responses as they are
    error => {
      // Handle response errors globally if needed
      return Promise.reject(error);
    }
  );

  // POST method
  instance.postData = async (url, data) => {
    try {
      const response = await instance.post(url, data);
      return response.data;  // Returning the response data
    } catch (error) {
      console.error('Error in POST request:', error.response || error.message);
      throw error;
    }
  };

  // PUT method
  instance.putData = async (url, data) => {
    try {
      const response = await instance.put(url, data);
      return response.data;  // Returning the response data
    } catch (error) {
      console.error('Error in PUT request:', error.response || error.message);
      throw error;
    }
  };

  return instance;
};
