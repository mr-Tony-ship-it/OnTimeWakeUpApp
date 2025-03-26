import React, { useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

const Splash = ({ navigation }) => {
  // State for animated values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = async () => {
      try {
        // Run animations in parallel
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 10,
            friction: 2,
            useNativeDriver: true,
          }),
        ]).start();

        // Hide the splash screen after a short delay
        await SplashScreen.hideAsync();
        if (navigation && navigation.replace) {
          setTimeout(() => {
            navigation.replace('MainApp');
          }, 2000); // Adjust navigation timing
        }
      } catch (error) {
        console.error('Error hiding splash screen:', error);
      }
    };

    animate();
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <LinearGradient
      colors={['#4B8FD4', '#3A8D99']}
      style={styles.container}
    >
      {/* Animated container for Lottie animation */}
      <Animated.View style={[styles.animationContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <LottieView
          source={require('../assets/clock-animation.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </Animated.View>

      {/* Animated container for app name */}
      <Animated.View style={[styles.appNameContainer, { opacity: fadeAnim }]}>
        <Text style={styles.appName}>OnTime WakeUp</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  animationContainer: {
    marginBottom: 20,
  },
  animation: {
    width: 250,
    height: 250,
  },
  appNameContainer: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: '#333',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default Splash;
