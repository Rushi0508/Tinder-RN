import { View, Text, Button } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../StackNavigator'
import useAuth from '../hooks/useAuth'

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({navigation}: HomeProps) => {

  const {logOut, user}:any = useAuth()
  
  return (
    <View>
      <Text>Welcome, {user.displayName || user?.user.name}</Text>
      <Button title="Go to chat screen" onPress={()=>navigation.navigate("Chat")}/>
      <Button 
        title= "Logout" 
        onPress={()=>{
          logOut();
        }} />
    </View>
  )
}

export default HomeScreen