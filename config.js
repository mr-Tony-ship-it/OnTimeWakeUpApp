const axios = require('axios');

const getHostIp = async () => {
  if (__DEV__) {
    try {
      // Try to get the IP from the backend server
      const response = await axios.get('http://localhost:3000/api/v1/server_ip');
      return response.data.server_ip;
    } catch (error) {
      console.error('Failed to fetch IP:', error);
      // Try alternative common development IPs
      const commonIps = ['192.168.1.7', '192.168.1.6', '192.168.1.5', '192.168.1.4','192.168.1.2','192.168.1.3'];
      for (const ip of commonIps) {
        try {
          const response = await axios.get(`http://${ip}:3000/api/v1/server_ip`);
          return response.data.server_ip;
        } catch (e) {
          continue;
        }
      }
      // If all attempts fail, return localhost
      return 'localhost';
    }
  }
  // In production, use the environment variable or a default value
  return process.env.API_DOMAIN || 'your-production-url.com';
};

const getApiUrl = async () => {
  const host = await getHostIp();
  const protocol = __DEV__ ? 'http' : 'https';
  return `${protocol}://${host}:3000/api/v1/trips`;
};

// Export a function to get the current API URL
const getCurrentApiUrl = async () => {
  return await getApiUrl();
};

module.exports = {
  getApiUrl,
  getCurrentApiUrl
};