import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import useAuth from './hooks/useAuth';
import ModalScreen from './screens/ModalScreen';
import MatchedScreen from './screens/MatchedScreen';

export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  Login: undefined;
  Modal: undefined;
  Match: {loggedInProfile: any, userSwiped: any}
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigator() {

  const {user}:any= useAuth();

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      {
        user ? (
          <>
            <Stack.Group>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: "modal"}}>
              <Stack.Screen name="Modal" component={ModalScreen}/>
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: "transparentModal"}}>
              <Stack.Screen name="Match" component={MatchedScreen}/>
            </Stack.Group>
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )
      }
    </Stack.Navigator>
  )
}

export default StackNavigator