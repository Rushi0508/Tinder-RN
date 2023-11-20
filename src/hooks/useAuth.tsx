// import auth from '@react-native-firebase/auth';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type {PropsWithChildren} from 'react'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut 
} from '@firebase/auth'
import { auth } from '../firebase';
const AuthContext = createContext({})


GoogleSignin.configure({
    webClientId: '648695021147-f626d60nuq3hifvv2p8mj2lfrojgu1qg.apps.googleusercontent.com'
})

export const AuthProvider = ({children}: PropsWithChildren)=>{

    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(
        ()=>
        onAuthStateChanged(auth, (user)=>{
            console.log(user);
            if(user){
                setUser(user)
            }else{
                setUser(null)
            }
            setLoadingInitial(false)
        }), 
        []
    );

    const signInWithGoogle = async ()=>{
        setIsLoading(true)
        try {
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          const {idToken, accessToken}: null | any = await GoogleSignin.signIn();

          const googleCredential = GoogleAuthProvider.credential(idToken, accessToken);
          await signInWithCredential(auth, googleCredential);
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
            signOut(auth)
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