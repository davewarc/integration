import axios from 'axios';

export const createApiClient = (apiUrl, apiKey) => {
  const instance = axios.create({
    baseURL: apiUrl,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json', // Or 'application/json', depending on your API
    },
    timeout: 5000, // Set a timeout for requests (optional)
  });

  // Interceptor for handling response errors globally
  instance.interceptors.response.use(
    response => response, // Pass successful responses as they are
    error => {
      // Log error or send it to an error tracking system
      console.error('API Error:', error.response || error.message);
      return Promise.reject(error); // Reject the promise to propagate error
    }
  );

  // POST method
  instance.postData = async (url, data) => {
    try {
      const response = await instance.post(url, data);
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error in POST request:', error.response?.data || error.message);
      throw error; // Throw error to be handled later
    }
  };

  // PUT method
  instance.putData = async (url, data) => {
    try {
      const response = await instance.put(url, data);
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error in PUT request:', error.response?.data || error.message);
      throw error; // Throw error to be handled later
    }
  };

  // GET method (added this for completeness)
  instance.getData = async (url, params) => {
    try {
      const response = await instance.get(url, { params });
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error in GET request:', error.response?.data || error.message);
      throw error; // Throw error to be handled later
    }
  };

  // DELETE method (added this for completeness)
  instance.deleteData = async (url, params) => {
    try {
      const response = await instance.delete(url, { params });
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error in DELETE request:', error.response?.data || error.message);
      throw error; // Throw error to be handled later
    }
  };

  // PATCH method (added this for completeness)
  instance.patchData = async (url, data) => {
    try {
      const response = await instance.patch(url, data);
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error in PATCH request:', error.response?.data || error.message);
      throw error; // Throw error to be handled later
    }
  };

  // PUT request with more specific body configuration (optional)
  instance.putJson = async (url, data) => {
    try {
      const response = await instance.put(url, JSON.stringify(data)); // Explicitly stringify JSON body
      return response.data;
    } catch (error) {
      console.error('Error in PUT JSON request:', error.response?.data || error.message);
      throw error;
    }
  };

  return instance;
};
