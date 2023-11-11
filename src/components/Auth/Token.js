import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useToken() {
  const [token, setToken] = useState('')
  useEffect(() => {
    const ACToken = async () =>{
        const AToken = await AsyncStorage.getItem('AccessToken')
            setToken(AToken)
    }
    ACToken()
    //   return auth().onAuthStateChanged(user => {
    //       if (user) {
    //           user.getIdToken(true)
    //               .then(latestToken => setToken(latestToken))
    //               .catch(err => console.log(err))
    //       }
    //   })
  }, [])
  return token
}