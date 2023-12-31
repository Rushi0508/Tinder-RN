import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../StackNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import ChatList from '../components/ChatList'

type ChatProps = NativeStackScreenProps<RootStackParamList, 'Chat'>

const ChatScreen = ({navigation}: ChatProps) => {
  return (
    <SafeAreaView>
      <Header title="Chat" callEnabled={false}/>
      <ChatList/>
    </SafeAreaView>
  )
}

export default ChatScreen