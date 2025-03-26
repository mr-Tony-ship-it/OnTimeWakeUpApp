import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../styles/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart, PieChart } from 'react-native-chart-kit';

const UserPerformance = () => {
  const { colors } = useTheme();

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
    statRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    statLabel: {
      fontSize: 16,
      color: colors.text,
      opacity: 0.8,
    },
    statValue: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    chartContainer: {
      marginTop: 16,
    },
  });

  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  };

  const pieChartData = [
    {
      name: 'On Time',
      population: 75,
      color: '#4CAF50',
      legendFontColor: colors.text,
    },
    {
      name: 'Delayed',
      population: 25,
      color: '#FF5252',
      legendFontColor: colors.text,
    },
  ];

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
        <Text style={styles.title}>Performance</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Statistics</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Trips</Text>
            <Text style={styles.statValue}>24</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>On Time Rate</Text>
            <Text style={styles.statValue}>75%</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Average Delay</Text>
            <Text style={styles.statValue}>15 min</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Progress</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={lineChartData}
              width={320}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Trip Completion Rate</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={pieChartData}
              width={320}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              hasLegend={true}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserPerformance;
