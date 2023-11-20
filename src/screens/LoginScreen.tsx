import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../StackNavigator'
import useAuth from '../hooks/useAuth'

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const LoginScreen = ({navigation}: LoginProps) => {

  const {signInWithGoogle, GoogleSigninButton, isLoading}:any = useAuth();

  return (
    <View>
      <Text> {isLoading? "Loading..": "LoginScreen"}</Text>
      <GoogleSigninButton
      
        onPress={signInWithGoogle}
      />
    </View>
  )
}

export default LoginScreen