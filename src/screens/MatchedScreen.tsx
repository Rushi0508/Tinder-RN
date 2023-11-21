import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { RootStackParamList } from '../StackNavigator'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'

type MatchProps = NativeStackScreenProps<RootStackParamList, "Match">


const MatchScreen = ({route}: MatchProps) => {

  const {loggedInProfile, userSwiped} = route.params
  const navigation = useNavigation();

  return (
    <View style={tw`h-full bg-red-500 pt-20 opacity-90`}>
      <View style={tw`justify-center px-10 pt-20`}>
        <Image
          style={tw`h-20 w-full`}
          source={{uri: "https://links.papareact.com/mg9"}}
        />
      </View>

      <Text style={tw`text-white text-center mt-5`}>
        You and {userSwiped.displayName} has liked each other.
      </Text>

      <View style={tw`flex-row justify-evenly mt-5`}>
        <Image
          style={tw`h-32 w-32 rounded-full`}
          source={{uri: loggedInProfile.photoURL}}
        />
        <Image
          style={tw`h-32 w-32 rounded-full`}
          source={{uri: userSwiped.photoURL}}
        />
      </View>

      <TouchableOpacity
        style={tw`bg-white m-5 px-5 py-5 rounded-full mt-20`}
        onPress={()=>{
          navigation.goBack();
          //@ts-ignore
          navigation.navigate("Chat")
        }}
      >
        <Text style={tw`text-black text-base text-center`}>Send a Message</Text>
      </TouchableOpacity>

    </View>
  )
}

export default MatchScreen