import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import DatePicker from 'react-native-modern-datepicker';
const { getApiUrl } = require('../config');
import * as Notifications from 'expo-notifications';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../styles/ThemeContext';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const CreateEvent = ({ navigation }) => {
  const { isDarkMode, colors } = useTheme();
  const [destination, setDestination] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [arrivalPeriod, setArrivalPeriod] = useState('AM');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateOption, setDateOption] = useState('Today');
  const [apiUrl, setApiUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [placeName, setPlaceName] = useState('Fetching...');

  useEffect(() => {
    const init = async () => {
      try {
        const url = await getApiUrl();
        setApiUrl(url);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setPlaceName('Permission denied');
          return;
        }
        const loc = await Promise.race([
          Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000)),
        ]);
        const geocode = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
        const place = geocode[0];
        setPlaceName(place ? `${place.city || place.region || 'Unknown'}, ${place.country || ''}` : 'Unknown');
      } catch (error) {
        setPlaceName('Unable to fetch location');
      }
      await Notifications.requestPermissionsAsync();
    };
    init();
  }, []);

  const createTrip = async () => {
    if (!destination || !arrivalDate) {
      alert('Please enter destination and date');
      return;
    }
    setIsLoading(true);

    const hours = arrivalTime.getHours();
    const minutes = arrivalTime.getMinutes();
    const adjustedHours = arrivalPeriod === 'PM' && hours < 12 ? hours + 12 : hours;
    const arrivalDateTime = new Date(`${arrivalDate}T${adjustedHours}:${minutes}:00`);

    try {
      const response = await axios.post(apiUrl, {
        origin: placeName,
        destination,
        arrival_datetime: arrivalDateTime.toISOString(),
      }, { timeout: 5000 });

      const wakeUpTime = new Date(arrivalDateTime.getTime() - 60 * 60 * 1000);

      await Notifications.scheduleNotificationAsync({
        content: { title: "Wake Up!", body: `Get ready for your trip to ${response.data.destination}!` },
        trigger: { date: wakeUpTime },
      });

      alert('Trip created successfully!');
      setDestination('');
      setArrivalDate('');
      setDateOption('Today');
      setArrivalPeriod('AM');
    } catch (error) {
      alert('Failed to plan trip: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const setQuickDate = (option) => {
    const today = new Date();
    if (option === 'Today') setArrivalDate(today.toISOString().split('T')[0]);
    else if (option === 'Tomorrow') {
      today.setDate(today.getDate() + 1);
      setArrivalDate(today.toISOString().split('T')[0]);
    }
    setDateOption(option);
    setShowDatePicker(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    backButton: {
      padding: 8,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 12,
      color: colors.text,
    },
    dateTimeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    dateTimeInput: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 12,
      marginHorizontal: 5,
    },
    submitButton: {
      backgroundColor: colors.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    submitButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Create New Trip</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Destination</Text>
          <GooglePlacesAutocomplete
            placeholder="Enter destination"
            onPress={(data, details = null) => {
              setDestination(data.description);
            }}
            query={{
              key: process.env.GOOGLE_PLACES_API_KEY,
              language: 'en',
            }}
            styles={{
              container: {
                flex: 0,
                backgroundColor: 'transparent',
              },
              textInput: {
                backgroundColor: colors.card,
                borderRadius: 8,
                padding: 12,
                color: colors.text,
              },
              listView: {
                backgroundColor: colors.card,
                borderRadius: 8,
              },
              row: {
                backgroundColor: colors.card,
                padding: 13,
                height: 'auto',
                flexDirection: 'row',
                alignItems: 'center',
              },
            }}
          />
        </View>

        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTimeInput}>
            <Text style={styles.label}>Date</Text>
            <DatePicker
              mode="calendar"
              selected={arrivalDate}
              onDateChange={setArrivalDate}
              style={{ borderRadius: 8 }}
            />
          </View>

          <View style={styles.dateTimeInput}>
            <Text style={styles.label}>Time</Text>
            <DatePicker
              mode="time"
              selected={arrivalTime}
              onDateChange={setArrivalTime}
              style={{ borderRadius: 8 }}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={createTrip}>
          <Text style={styles.submitButtonText}>Create Trip</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateEvent;
