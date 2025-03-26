import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../styles/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = ({ navigation }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 24,
    },
    title: {
      fontSize: 30,
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: 32,
      color: colors.text,
    },
    button: {
      padding: 16,
      borderRadius: 16,
      marginBottom: 20,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '600',
      marginLeft: 16,
    },
    blueButton: {
      backgroundColor: colors.primary,
    },
    greenButton: {
      backgroundColor: colors.success,
    },
    yellowButton: {
      backgroundColor: colors.warning,
    },
    purpleButton: {
      backgroundColor: colors.secondary,
    },
  });

  const getButtonStyle = (color) => {
    switch (color) {
      case 'bg-blue':
        return styles.blueButton;
      case 'bg-green':
        return styles.greenButton;
      case 'bg-yellow':
        return styles.yellowButton;
      case 'bg-purple':
        return styles.purpleButton;
      default:
        return styles.blueButton;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>OnTime WakeUp</Text>

        {[
          { title: "Create New Event", color: "bg-blue", icon: "event", screen: "CreateEvent" },
          { title: "Show Trips", color: "bg-green", icon: "list", screen: "ShowTrips" },
          { title: "Trip Status", color: "bg-yellow", icon: "track-changes", screen: "TripStatus" },
          { title: "User Performance", color: "bg-purple", icon: "person", screen: "UserPerformance" },
        ].map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, getButtonStyle(button.color)]}
            onPress={() => navigation.navigate(button.screen)}
          >
            <View style={styles.buttonContent}>
              <Icon name={button.icon} size={28} color="#fff" />
              <Text style={styles.buttonText}>
                {button.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Home; 