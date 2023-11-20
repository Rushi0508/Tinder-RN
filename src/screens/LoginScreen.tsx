import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../StackNavigator'
import useAuth from '../hooks/useAuth'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context'
type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const LoginScreen = ({navigation}: LoginProps) => {

  const {signInWithGoogle}:any = useAuth();

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ImageBackground
        source={{uri: "https://tinder.com/static/tinder.png"}}
        resizeMode='cover'
        style={tw`flex-1`}
      >
       <TouchableOpacity onPress={signInWithGoogle}  style={tw`absolute p-4 rounded-2xl bg-white bottom-40 w-52 mx-[25%]`}>
        <Text style={tw`font-semibold text-center`}>SignIn & Get Swiping</Text> 
       </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default LoginScreen