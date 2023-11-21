import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/Foundation'
import { useNavigation } from '@react-navigation/native'

const Header = ({title,callEnabled}) => {

    const  navigation = useNavigation()
  return (
    <View style={tw`p-2 flex-row items-center justify-between`}>
      <View style={tw`flex flex-row items-center`}>
        <TouchableOpacity
            onPress={()=>navigation.goBack()}
            style={tw`p-2`}
        >
            <Icon name="chevron-back-outline" size={34} color="#f0475e"/>
        </TouchableOpacity>
        <Text style={tw`text-2xl font-bold pl-2`}>{title}</Text>
      </View>
      {callEnabled && (
        <TouchableOpacity style={tw`rounded-full mr-4 px-3 py-2 bg-red-200`}>
            <Icon1 name="telephone" size={20} color="red"/>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Header