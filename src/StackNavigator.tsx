import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import useAuth from './hooks/useAuth';


export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  Login: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigator() {

  const {user}:any= useAuth();

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      {
        user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )
      }
    </Stack.Navigator>
  )
}

export default StackNavigator