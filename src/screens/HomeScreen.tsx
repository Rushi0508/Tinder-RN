import { View, Text, Button, SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../StackNavigator'
import useAuth from '../hooks/useAuth'
import tw from 'twrnc'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Swiper from 'react-native-deck-swiper'
import auth from '@react-native-firebase/auth'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({navigation}: HomeProps) => {

  const {logOut, user}:any = useAuth()
  const swipeRef = useRef(null)
  const [profiles, setProfiles] = useState([]);

  useLayoutEffect(()=>{
    const unsub = onSnapshot(doc( db, "users", user.uid), (snapshot)=>{
      if(!snapshot.exists()){
        navigation.navigate("Modal");
      }
    })
    return unsub;
  }, [])

  useEffect(()=>{
    let unsub;

    const fetchCards = async()=>{
      unsub = onSnapshot(collection(db, "users"), snapshot=>{
        setProfiles(
          snapshot.docs.filter(doc=>doc.id!==user.uid).map((doc)=>({
            id: doc.id,
            ...doc.data()
          }))
        )
      })
    }
    fetchCards();
    return unsub;
  }, [])
  console.log(profiles);
  
  
  return (
    <SafeAreaView style={tw`flex-1`}>
      {/* Header  */}
      <View style={tw`flex-row justify-between px-5 items-center`}>
        <TouchableOpacity onPress={logOut}>
          <Image
            style={tw`h-10 w-10 rounded-full`}
            source={{uri: user.photoURL}}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("Modal")}>
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
      
      {/* Cards  */}
      <View style={tw`flex-1 -mt-6`}>
        <Swiper cards={profiles}
          ref={swipeRef}
          containerStyle={{backgroundColor: "transparent"}}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          onSwipedLeft={()=>{
            console.log("SWIPE PASS")
          }}
          onSwipedRight={()=>{
            console.log("SWIPE MATCH")
          }}
          backgroundColor={"#4FD0E9"}
          overlayLabels={{
            left: {
              title: "NOPE",
              style:{
                label:{
                  textAlign: "right",
                  color: "red"
                }
              }
            },
            right: {
              title: "MATCH",
              style:{
                label:{
                  textAlign: "left",
                  color: "#4DED30"
                }
              }
            }
          }}
          renderCard={(card)=> card? (
            <View key={card.id} style={tw`relative bg-white h-3/4 rounded-xl`}>
              <Image 
                style={tw`h-full w-full rounded-xl absolute top-0`}
                source={{uri: card.photoURL}}
              />
              <View style={tw`absolute bottom-0 items-center justify-between px-6 py-2 rounded-b-xl flex-row bg-white w-full h-20 shadow-[#000] shadow-offset-0/1 shadow-radius-1.41 elevation-2 shadow-opacity-0.2`}>
                <View>
                  <Text style={tw`text-xl font-bold`}>{card.displayName}</Text>
                  <Text>{card.job}</Text>
                </View>
                <Text style={tw`text-2xl font-bold`}>{card.age}</Text>
              </View>
            </View>
          ):(
            <View
              style={
                tw`relative bg-white h-3/4 rounded-xl items-center justify-center shadow-[#000] shadow-offset-0/1 shadow-radius-1.41 elevation-2 shadow-opacity-0.2`
              }
            >
              <Text style={tw`font-bold text-lg pb-5`}>No more profiles</Text>
              <Image 
                style={tw`h-25 w-25`}
                // height={100}
                // width={50}
                source={{uri: "https://links.papareact.com/6gb"}}
              />
            </View>
          )}
        />
      </View>

      <View style={tw`flex flex-row justify-evenly mb-5 pb-5`}>
        <TouchableOpacity
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-red-200`}
          onPress={()=> swipeRef.current.swipeLeft()}
        >
            <Icon1 name='cross' size={25} color="red"/>
        </TouchableOpacity>
        <TouchableOpacity 
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-green-200`}
          onPress={()=>swipeRef.current.swipeRight()}
        >
            <Icon2 name='heart' size={25} color="green"/>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cardShadow:{
    shadowColor: "#000",
    shadowOffset:{
      width: 0,
      height: 1
    },
    shadowOpacity:0.2,
    shadowRadius: 1.41,
    elevation: 2,
    
  }
})

export default HomeScreen