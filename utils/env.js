/*import React from 'react';
import * as SecureStore from 'expo-secure-store';

// Custom hook to access environment variables
export const useEnv = (key) => {
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    const fetchEnv = async () => {
      const storedValue = await SecureStore.getItemAsync(key);
      if (storedValue) {
        setValue(storedValue);
      } else {
        // Fallback: Hardcode for development (replace with your Geoapify API key)
        const fallbackValue = "AIzaSyAkrM88bQkJCjnrUn6DpiGmXSwcaFwCcEo"; // Replace with your key
        await SecureStore.setItemAsync(key, fallbackValue);
        setValue(fallbackValue);
      }
    };
    fetchEnv();
  }, [key]);

  return value;
};

// Function to set an environment variable (e.g., during initial setup)
export const setEnv = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};*/
