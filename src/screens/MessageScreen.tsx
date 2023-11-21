import { View, Text, TextInput, Button, Pressable, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../StackNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import { getMatchedUserInfo } from '../lib/getMatchedUserInfo'
import tw from 'twrnc'
import SenderMessage from '../components/SenderMessage'
import ReceiverMessage from '../components/ReceiverMessage'

type MessageProps = NativeStackScreenProps<RootStackParamList, "Message">

const MessageScreen = ({route}: MessageProps) => {

    const {user}:any = useAuth();
    const {matchDetails} = route.params
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    const sendMessage = ()=>{

    }

  return (
    <SafeAreaView style={tw`flex-1`}>
        <Header title={getMatchedUserInfo(matchDetails.users,user.uid).displayName} callEnabled/>

        <KeyboardAvoidingView
            behavior={Platform.OS==="ios"? "padding": 'height'}
            style={tw`flex-1`}
            keyboardVerticalOffset={10}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <FlatList
                    data={messages}
                    style={tw`pl-4`}
                    keyExtractor={item=>item.id}
                    renderItem={({item:message})=>
                        message.userId === user.uid ? (
                            <SenderMessage key={message.id} message={message}/>
                        ):(
                            <ReceiverMessage key={message.id} message={message}/>
                        )
                    }
                />
            </TouchableWithoutFeedback>
            <View style={tw`flex-row items-center justify-between border-t border-gray-200 px-5 py-2`}>
                <TextInput
                    style={tw`h-10 text-lg`}
                    placeholder='Send Message...'
                    onChangeText={setInput}
                    onSubmitEditing={sendMessage}
                    value={input}
                    />
                <TouchableOpacity>
                    <Text style={tw`text-lg text-red-500`}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default MessageScreen