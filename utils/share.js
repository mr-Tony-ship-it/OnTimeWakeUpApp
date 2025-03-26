import { Platform } from 'react-native';

let Share;

if (Platform.OS !== 'web') {
  try {
    Share = require('react-native-share').default;
  } catch (error) {
    console.log('react-native-share not available:', error);
  }
}

export const sharePerformance = async (message) => {
  if (Platform.OS === 'web') {
    // Web implementation using Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Share User Performance Report',
          text: message,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      console.log('Web Share API not supported');
    }
    return;
  }

  // Native implementation
  if (!Share) {
    console.log('Share functionality not available on this platform');
    return;
  }

  const shareOptions = {
    title: 'Share User Performance Report',
    message: message,
    url: '', // Optional URL, you can add a link if required
  };

  try {
    await Share.open(shareOptions);
  } catch (error) {
    console.log('Error sharing:', error);
  }
}; 