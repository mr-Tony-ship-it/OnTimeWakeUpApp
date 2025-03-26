import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../styles/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ShowTrips = ({ navigation }) => {
  const { colors } = useTheme();
  const [trips, setTrips] = useState([
    {
      id: '1',
      destination: 'New York, NY',
      date: '2024-03-20',
      time: '09:00',
      status: 'upcoming',
    },
    {
      id: '2',
      destination: 'Los Angeles, CA',
      date: '2024-03-21',
      time: '14:30',
      status: 'completed',
    },
  ]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    tripCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 20,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    tripHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    destination: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    status: {
      fontSize: 14,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusUpcoming: {
      backgroundColor: colors.primary + '20',
      color: colors.primary,
    },
    statusCompleted: {
      backgroundColor: '#4CAF5020',
      color: '#4CAF50',
    },
    tripDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    detailText: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.8,
      marginLeft: 8,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyText: {
      fontSize: 16,
      color: colors.text,
      opacity: 0.8,
      textAlign: 'center',
    },
  });

  const renderTrip = ({ item }) => (
    <TouchableOpacity
      style={styles.tripCard}
      onPress={() => navigation.navigate('TripStatus', { trip: item })}
    >
      <View style={styles.tripHeader}>
        <Text style={styles.destination}>{item.destination}</Text>
        <Text
          style={[
            styles.status,
            item.status === 'upcoming'
              ? styles.statusUpcoming
              : styles.statusCompleted,
          ]}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>
      <View style={styles.tripDetails}>
        <Icon name="event" size={16} color={colors.text} />
        <Text style={styles.detailText}>{item.date}</Text>
      </View>
      <View style={styles.tripDetails}>
        <Icon name="access-time" size={16} color={colors.text} />
        <Text style={styles.detailText}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No trips found. Create a new trip to get started!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
      </View>
      <FlatList
        data={trips}
        renderItem={renderTrip}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 20 }}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

export default ShowTrips;
