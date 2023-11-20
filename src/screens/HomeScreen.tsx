import { View, Text, Button, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../StackNavigator'
import useAuth from '../hooks/useAuth'
import tw from 'twrnc'
import Icon from 'react-native-vector-icons/Ionicons'

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({navigation}: HomeProps) => {

  const {logOut, user}:any = useAuth()
  
  return (
    <SafeAreaView>
      {/* Header  */}
      <View style={tw`flex-row justify-between px-5 items-center`}>
        <TouchableOpacity onPress={logOut}>
          <Image
            style={tw`h-10 w-10 rounded-full`}
            source={{uri: user.photoURL || user.user.photo}}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={tw`h-15 w-15`}
            source={{uri: "https://static.vecteezy.com/system/resources/previews/023/986/928/original/tinder-app-logo-tinder-app-logo-transparent-tinder-app-icon-transparent-free-free-png.png"}}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.navigate("Chat")}>
          <Icon name='chatbubbles-sharp' color="#f0475e" size={30}/>
        </TouchableOpacity>
      </View>


      {/* End of Header  */}
    </SafeAreaView>
  )
}

export default HomeScreen