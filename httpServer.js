function httpServer(){
    return `import axios from 'axios';

    // Initialize Axios instance with a URL
    const http = axios.create({
      baseURL: 'https://your-api-base-url.com', // Replace with your actual base URL
    });
    
    // Function to add request interceptors dynamically
    http.interceptors.request.use(
      (config) => {
        // Modify the request config before sending it
        // For example, you can add headers, tokens, etc.
        // config.headers['Authorization'] = 'Bearer ' + getToken();
        return config;
      },
      (error) => {
        // Handle request errors
        return Promise.reject(error);
      }
    );
    
    // Function to add response interceptors dynamically
    http.interceptors.response.use(
      (response) => {
        // Modify the response data before resolving it
        // For example, you can extract data or handle errors globally
        // const modifiedData = response.data;
        // return modifiedData;
        return response;
      },
      (error) => {
        // Handle response errors
        return Promise.reject(error);
      }
    );
    
    export default http;`
}

module.exports = httpServer;