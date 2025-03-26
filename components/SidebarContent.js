import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../styles/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SidebarContent = ({ navigation }) => {
  const { colors, isDarkMode, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      height: 150,
      backgroundColor: colors.primary,
      padding: 20,
      justifyContent: 'flex-end',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    menuContainer: {
      flex: 1,
      padding: 20,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginBottom: 8,
    },
    menuItemActive: {
      backgroundColor: colors.primary + '20',
    },
    menuIcon: {
      marginRight: 16,
    },
    menuText: {
      fontSize: 16,
      color: colors.text,
    },
    menuTextActive: {
      color: colors.primary,
      fontWeight: '600',
    },
    bottomSection: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 16,
    },
    themeToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    themeText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 12,
    },
  });

  const menuItems = [
    { name: 'Settings', icon: 'settings', route: 'Settings' },
    { name: 'Feedback', icon: 'feedback', route: 'Feedback' },
    { name: 'About', icon: 'info', route: 'About' },
  ];

  const renderMenuItem = (item) => {
    const isActive = navigation.getState().routes[navigation.getState().index].name === item.route;
    
    return (
      <TouchableOpacity
        key={item.route}
        style={[styles.menuItem, isActive && styles.menuItemActive]}
        onPress={() => navigation.navigate(item.route)}
      >
        <Icon
          name={item.icon}
          size={24}
          color={isActive ? colors.primary : colors.text}
          style={styles.menuIcon}
        />
        <Text style={[styles.menuText, isActive && styles.menuTextActive]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>OnTime WakeUp</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map(renderMenuItem)}
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
          <Icon
            name={isDarkMode ? 'light-mode' : 'dark-mode'}
            size={24}
            color={colors.text}
          />
          <Text style={styles.themeText}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SidebarContent;
