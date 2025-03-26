import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '../styles/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const About = () => {
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
    description: {
      fontSize: 16,
      color: colors.text,
      opacity: 0.8,
      lineHeight: 24,
      marginBottom: 16,
    },
    linkButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: colors.card,
      borderRadius: 8,
      marginBottom: 8,
    },
    linkText: {
      fontSize: 16,
      color: colors.primary,
      marginLeft: 12,
    },
    version: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.6,
      textAlign: 'center',
      marginTop: 20,
    },
  });

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>About</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>OnTime WakeUp App</Text>
          <Text style={styles.description}>
            OnTime WakeUp App helps you manage your trips and wake up on time to reach your destinations. 
            With features like trip planning, real-time status updates, and performance tracking, 
            we make sure you never miss an important appointment or meeting.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact & Support</Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => handleLinkPress('mailto:tonijohn@depaul.edu.in')}
          >
            <Icon name="email" size={24} color={colors.primary} />
            <Text style={styles.linkText}>Email Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => handleLinkPress('https://ontimewakeup.com/support')}
          >
            <Icon name="help" size={24} color={colors.primary} />
            <Text style={styles.linkText}>Help Center</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Legal</Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => handleLinkPress('https://ontimewakeup.com/privacy')}
          >
            <Icon name="privacy-tip" size={24} color={colors.primary} />
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => handleLinkPress('https://ontimewakeup.com/terms')}
          >
            <Icon name="gavel" size={24} color={colors.primary} />
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

export default About;
