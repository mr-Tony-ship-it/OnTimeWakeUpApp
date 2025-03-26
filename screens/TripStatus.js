import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../styles/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart } from 'react-native-chart-kit';

const TripStatus = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { trip } = route.params;

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
    backButton: {
      padding: 8,
    },
    content: {
      padding: 20,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    infoText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 8,
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      alignSelf: 'flex-start',
    },
    statusUpcoming: {
      backgroundColor: colors.primary + '20',
    },
    statusCompleted: {
      backgroundColor: '#4CAF5020',
    },
    statusText: {
      fontSize: 14,
      fontWeight: '600',
    },
    statusTextUpcoming: {
      color: colors.primary,
    },
    statusTextCompleted: {
      color: '#4CAF50',
    },
    chartContainer: {
      marginTop: 16,
    },
    actionButton: {
      backgroundColor: colors.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
    },
    actionButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: colors.card,
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 0,
    color: (opacity = 1) => colors.primary,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Trip Status</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Icon name="location-on" size={24} color={colors.primary} />
            <Text style={styles.infoText}>{trip.destination}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="event" size={24} color={colors.primary} />
            <Text style={styles.infoText}>{trip.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="access-time" size={24} color={colors.primary} />
            <Text style={styles.infoText}>{trip.time}</Text>
          </View>
          <View style={[styles.statusBadge, trip.status === 'upcoming' ? styles.statusUpcoming : styles.statusCompleted]}>
            <Text style={[styles.statusText, trip.status === 'upcoming' ? styles.statusTextUpcoming : styles.statusTextCompleted]}>
              {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Progress</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={320}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>
            {trip.status === 'upcoming' ? 'Start Trip' : 'View Details'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default TripStatus;
