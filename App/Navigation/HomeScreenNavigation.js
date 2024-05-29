import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../pages/HomeScreen';
import ChatScreen from '../pages/ChatScreen';
const Stack = createNativeStackNavigator();
const HomeScreenNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='home' component={HomeScreen} />
            <Stack.Screen name='chat' component={ChatScreen} />

    </Stack.Navigator>
  )
}

export default HomeScreenNavigation