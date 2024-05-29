import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './App/pages/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreenNavigation from './App/Navigation/HomeScreenNavigation';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';


const fetchFonts = () => {
  return Font.loadAsync({
    'custom-font': require('./assets/fonts/KatahdinRound.otf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(error) => console.warn(error)}
      />
    );
  }

  return (
    <View style={styles.container}>
     <NavigationContainer>
      <HomeScreenNavigation/>
     </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    fontFamily: 'custom-font'
  },
});
