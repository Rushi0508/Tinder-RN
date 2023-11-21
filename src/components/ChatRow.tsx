import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import { getMatchedUserInfo } from '../lib/getMatchedUserInfo';
import tw from 'twrnc'

const ChatRow = ({matchDetails}) => {

    const navigation = useNavigation();
    const {user}:any = useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null)

    useEffect(()=>{
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
    }, [matchDetails, user])

  return (
    <TouchableOpacity
        style={[tw`flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg shadow-[#000] shadow-offset-0/1 shadow-radius-1.41 elevation-2 shadow-opacity-20`]}
    >
        <Image
            style={tw`rounded-full h-16 w-16 mr-4`}
            source={{uri: matchedUserInfo.photoURL}}
        />
        <View>
            <Text style={tw`text-lg text-gray-700 font-semibold`}>
                {matchedUserInfo?.displayName}
            </Text>
            <Text>"Say Hii !!</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ChatRow