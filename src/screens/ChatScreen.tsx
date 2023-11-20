import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../StackNavigator'

type ChatProps = NativeStackScreenProps<RootStackParamList, 'Chat'>

const ChatScreen = ({navigation}: ChatProps) => {
  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  )
}

export default ChatScreen