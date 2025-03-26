import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from './styles/ThemeContext';
import { Provider as PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';

// Screens
import Splash from './screens/Splash';
import Feedback from './screens/Feedback';
import About from './screens/About';
import Settings from './screens/Settings';
import SidebarContent from './components/SidebarContent';
import Home from './screens/Home';
import CreateEvent from './screens/CreateEvent';
import UserPerformance from './screens/UserPerformance';
import TripStatus from './screens/TripStatus';
import ShowTrips from './screens/ShowTrips';


// Stack and Drawer Navigation
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// DrawerNavigator Component
const DrawerNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Drawer.Navigator
      drawerContent={(props) => <SidebarContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#1a202c' : '#ffffff',
        },
        headerTintColor: isDarkMode ? '#ffffff' : '#1a202c',
        drawerStyle: {
          backgroundColor: isDarkMode ? '#1a202c' : '#ffffff',
          width: 280,
        },
        drawerLabelStyle: {
          color: isDarkMode ? '#ffffff' : '#1a202c',
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="CreateEvent" component={CreateEvent} />
      <Drawer.Screen name="ShowTrips" component={ShowTrips} />
      <Drawer.Screen name="UserPerformance" component={UserPerformance} />
      <Drawer.Screen name="TripStatus" component={TripStatus} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Feedback" component={Feedback} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
};

// App Component
const App = () => {
  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        setTimeout(() => SplashScreen.hideAsync(), 2000);
      } catch (error) {
        console.error('Splash prevention error:', error);
      }
    };
    prepare();
  }, []);

  return (
    <ThemeProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="MainApp" component={DrawerNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
};

export default App;
