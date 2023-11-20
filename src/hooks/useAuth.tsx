import auth from '@react-native-firebase/auth';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type {PropsWithChildren} from 'react'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

const AuthContext = createContext({})


GoogleSignin.configure({
    webClientId: '648695021147-f626d60nuq3hifvv2p8mj2lfrojgu1qg.apps.googleusercontent.com'
})

export const AuthProvider = ({children}: PropsWithChildren)=>{

    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    function onAuthStateChanged(user:any){
        if(user){
            setUser(user)
        }else{
            setUser(null)
        }
        setLoadingInitial(false)
    }

    useEffect(()=> auth().onAuthStateChanged(onAuthStateChanged), [])

    const signInWithGoogle = async ()=>{
        setIsLoading(true)
        try {
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          const userInfo: null | any = await GoogleSignin.signIn();
          setUser(userInfo)
          console.log(userInfo);
          
          const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
          return auth().signInWithCredential(googleCredential);
        } catch (error: any) {
          setError(error)
        }finally{
            setIsLoading(false)
        }
      }

      const logOut = async()=>{
        setIsLoading(true);
        try{
            await GoogleSignin.signOut();
            setUser(null)
        }catch(error:any){
            setError(error)
        }finally{
            setIsLoading(false)
        }
      }

    const memoedValue = useMemo(()=>({
        user,
        signInWithGoogle,
        GoogleSigninButton,
        isLoading,
        error,
        logOut
    }), [user, isLoading, error ])

    return (
        <AuthContext.Provider
            value={memoedValue}
        >
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
  return useContext(AuthContext);
}

export default useAuth