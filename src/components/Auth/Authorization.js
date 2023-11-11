import React, { useState, useEffect, Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  Alert,
  Platform,
  TextInput,
  ActivityIndicator,
} from "react-native";
import * as Colors from "../../common/colors";
import * as IMAGE from "../../common/Image";
import { AuthStyle } from "./AuthStyle";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { InnerStyle } from "../Component/InnerStyle";
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk-next';

import { AppleButton } from "@invertase/react-native-apple-authentication";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { ForgetInnerStyle } from "../ForgotComponent/ForgetInnerStyle";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useToken from "./Token";
import { connect } from "react-redux";
import { LoginAction } from "../../redux/action";

import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";

export function GoogleAuth() {
  const [loggedIn, setloggedIn] = useState(false);
  const [isLoading , setIsLoading] = useState(false)

  const token = useToken();
  const [user, setUser] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();


  // Google Sign -------

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userinfo = await GoogleSignin.signIn();    
      GoogleSignin.revokeAccess()
      setloggedIn(true);
      const credential = auth.GoogleAuthProvider.credential(
        userinfo.idToken,
        );    
        await AsyncStorage.setItem('UserName',userinfo.user.givenName)    
        await AsyncStorage.setItem("UserEmail",userinfo.user.email)
        await auth().signInWithCredential(credential);
        sendTokentoServer(2);
        dispatch(LoginAction({
          email :  userinfo.user.email,
          login_type : 2,
          social_media_id : userinfo.idToken
        }));
        setloggedIn(true);

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Signin in progress");
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("PLAY_SERVICES_NOT_AVAILABLE");
        // play services not available or outdated
      } else {
        console.log('error',error.code)
      }
    }
  };
  
  const  onAuthStateChanged = (user) => {
    setUser(user);
    if (user) setloggedIn(true);
    if (user) { 
      // navigation.navigate("MainStack");
      Sdata();
    }
  }

  const Sdata = async () => {
    try {
      AsyncStorage.getItem("@Data_Key", (err, result) => {
        const id = user;
        if (result !== null) {
          AsyncStorage.setItem("@Data_Key", JSON.stringify(id));
        } else {
          AsyncStorage.setItem("@Data_Key", JSON.stringify(id));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  {
    Platform.OS === "ios"
      ? useEffect(() => {
          GoogleSignin.configure({
            scopes: ["email"], //  API  want to access on behalf of the user, default is email and profile
            webClientId:
              "488313017078-fcsef3d4qrb675mgvarv1ujd31oub74r.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
              offlineAccess: true, //  Google API on behalf of the user FROM YOUR SERVER
          });
          const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
          return subscriber; // unsubscribe on unmount
        }, [])
      : useEffect(() => {
          GoogleSignin.configure({
            scopes: ["email"], // API you want to access on behalf of the user, default is email and profile
            webClientId:"488313017078-j0061vmlhp8fde0qjk21mm4vf7hbme5t.apps.googleusercontent.com", 
              // client ID of type WEB for your server (needed to verify user ID and offline access)
            // androidClientID : '488313017078-j0061vmlhp8fde0qjk21mm4vf7hbme5t.apps.googleusercontent.com',  
            offlineAccess: true, //  Google API on behalf of the user FROM YOUR SERVER
          });
          const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
          return subscriber; // unsubscribe on unmount
        }, []);
  }

  return (
    <>
    <View>
      <TouchableOpacity
        style={[
          AuthStyle.BtnInnerStyle,
          {
            backgroundColor: Colors.LigthDark,
            paddingVertical: RFPercentage(1),
            justifyContent:'center'
          },
        ]}
        onPress={signIn}
      >
        <Image
          resizeMode="contain"
          source={IMAGE.GoogleIcon}
          style={AuthStyle.SocialIconStyle_G}
        />
        <Text style={AuthStyle.BtnTextStyle}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
    {isLoading ? (
      <View style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}>
          <ActivityIndicator
            color={"white"}
            style={{ position: "relative", top: height / 2, left: width / 2.2 }}
            size={"large"}
          />
          </View>
        ) : undefined}
    </>
  );
}
//Apple Sign ---------

export function AppleSignIn() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });


    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error("Apple Sign-In failed - no identify token returned");
    }
    // Create a Firebase credential from the response
    const { identityToken, } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
    );
    // Sign the user in with the credential
    auth().signInWithCredential(appleCredential);
    sendTokentoServer(3);
    await AsyncStorage.setItem('UserName',appleAuthRequestResponse.fullName.givenName)
    dispatch(LoginAction({
      email :  appleAuthRequestResponse.email,
      login_type : 3,
      social_media_id : appleAuthRequestResponse.identityToken
    }));
  }
  return (
    <View>
      <TouchableOpacity
        style={[
          AuthStyle.BtnInnerStyle,
          {
            backgroundColor: Colors.LigthDark,
            paddingVertical: RFPercentage(1),
            justifyContent:'center',
          },
        ]}
        onPress={() => onAppleButtonPress()}
      >
        <Image
          resizeMode="contain"
          source={IMAGE.AppleIcon}
          style={AuthStyle.SocialIconStyle_A}
        />
        <Text style={AuthStyle.BtnTextStyle}>Continue with Apple</Text>
      </TouchableOpacity>
    </View>
  );
}

// Signin Facebook  Funtion For all Firebase

getInfoFromToken = token => {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: 'id,name,first_name,last_name',
    },
  };
  const profileRequest = new GraphRequest(
    '/me',
    {token, parameters: PROFILE_REQUEST_PARAMS},
    (error, user) => {
      if (error) {
        console.log('login info has error: ' + error);
      } else {
        this.setState({userInfo: user});
        console.log('result:', user);
      }
    },
  );
  new GraphRequestManager().addRequest(profileRequest).start();
};

 const signinwithfacebook = async () => {
  LoginManager.logInWithPermissions(['public_profile']).then(
    login => {
      if (login.isCancelled) {
        console.log('Login cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          const accessToken = data.accessToken.toString();
          this.getInfoFromToken(accessToken);
        });
      }
    },
    error => {
      console.log('Login fail with error: ' + error);
    },
  );
  // const result = await LoginManager.logInWithPermissions([
  //   "public_profile",
  //   "email",
  // ]);
  // console.log('facebookData',result);
  
  // if (result.isCancelled) {
  //   throw "User cancelled the login process";
  // }
  
  // // Once signed in, get the users AccesToken
  // const data = await AccessToken.getCurrentAccessToken();


  // if (!data) {
  //   throw "Something went wrong obtaining access token";
  // }

  // // Create a Firebase credential with the AccessToken
  // const facebookCredential = auth.FacebookAuthProvider.credential(
  //   data.accessToken
  // );
//   {
//     LoginManager.logOut();
//     return LoginManager.logInWithPermissions(['email', 'public_profile']).then(
//         result =>
//         {
//             console.log("result esult=>", result);
//             if (result.declinedPermissions && result.declinedPermissions.includes("email"))
//             {
//                 resCallback({ message: "Email is required" })
//             }
//             if (result.isCancelled)
//             {
//                 console.log("Error",result)
//             }
//             else
//             {
//                 const infoRequest = new GraphRequest(
//                     '/me?fields=email,name,picture',
//                     null,
//                     resCallback
//                 );
//                 new GraphRequestManager().addRequest(infoRequest).start()
//             }
//         },
//         function (error)
//         {
//             console.log("Login fail with error", error);
//         }
//     )
//     //  Create a Firebase credential with the AccessToken
//   // const facebookCredential = auth.FacebookAuthProvider.credential(
//   //    data.accessToken
//   // );
//   // auth().signInWithCredential(facebookCredential);
//   // sendTokentoServer(4);
// }

  // Sign-in the user with the credential
}; 
export const onFbLogin = async () =>
{
    try
    {
        await signinwithfacebook(responseInfoCallback);
    }
    catch (error)
    {
        console.log("Error: ", error);
    }
}

const responseInfoCallback = async (error, result) =>
{
    if (error)
    {
        console.log("Error top: ", error);
        return
    }
    else
    {
        const userData = result;
        console.log("User data: ", userData);
        setfbData(userData);

    }
}

//Signout Funtion For all Firebase

// export function Google_Signout(props) {
//   const [loggedIn, setloggedIn] = useState(false);
//   const log = props.Logstyle;

//   const navigation = useNavigation();
//   const [user, setUser] = useState([]);
//   signOut = async () => {
//     try {
//       auth()
//         .signOut()
//         .then(() => createTwoButtonAlert());
//       setloggedIn(false);
//       // console.log('signOut', signOut);
//       navigation.navigate("Login", {
//         screen: "Login",
//         initial: false,
//       });
//       GoogleSignin.revokeAccess();
//       GoogleSignin.signOut();
//       // LoginManager.logOut();
//       await AsyncStorage.removeItem("AccessToken");
//       // setuserInfo([]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   function onAuthStateChanged(user) {
//     setUser(user);
//     console.log("user", user);
//     if (user) setloggedIn(true);
//   }
//   // const createTwoButtonAlert = () =>
//   //   Alert.alert("Do You Really Want", "LogOut", [
//   //     {
//   //       text: "Cancel",
//   //       onPress: () => null,
//   //       style: "cancel",
//   //     },
//   //     { text: "OK", onPress: () => signOut() },
//   //   ]);
//   // return (
//   //   user && (
//   //     <TouchableOpacity onPress={() => signOut()}>
//   //       <Text style={log}>LogOut</Text>
//   //     </TouchableOpacity>
//   //   )
//   // );
// }

const sendTokentoServer = (loginType) => {
  try {
    auth()
      .currentUser?.getIdToken()
      .then((token) => {
      });
  } catch (err) {
    console.log("=======>err", err);
  }
};

// Email Auth

// export function Email_Signup() {
//     const [authenticated, setAuthenticated] = useState(false);
//     const [email, setEmail] = useState();
//     const [uname, setUname] = useState();
//     const [password, setPassword] = useState();
//     const navigation = useNavigation();

//     auth().onAuthStateChanged((user) => {
//         if (user) {
//             setAuthenticated(true);
//         } else {
//             setAuthenticated(false);
//         }
//     });

//     const createUser = (email, password) => {
//         try {
//             auth().createUserWithEmailAndPassword(email, password);
//         } catch (error) {
//             alert(error);
//         }
//     };

//     if (authenticated) {

//         { navigation.goBack(), navigation.navigate('MainStack') }
//     }
//     else {
//         console.log('FAILED SIGNUP')
//     }

//     return (
//         <View>
//             <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>

//                 <View style={AuthStyle.ChildFirstViewStyle}>
//                     <Text style={AuthStyle.WelcomHeaderTextStyle}>Welcome To Clarity Valley</Text>
//                     <Text style={AuthStyle.CreationTextStyle}>SignUp an account to explore</Text>
//                 </View>
//                 <View style={AuthStyle.TextInputStyle}>
//                     <Image
//                         resizeMode='contain'
//                         source={IMAGE.NameIcon}
//                         style={AuthStyle.TextInputIconStyle}
//                     />
//                     <TextInput
//                         autoCapitalize={Platform.OS === 'ios' ? 'none' : 'off'}
//                         autoComplete={Platform.OS === 'ios' ? 'none' : 'off'}
//                         style={AuthStyle.TextInputInnerStyle}
//                         value={uname}
//                         onChangeText={setUname}
//                         keyboardType="email-address"
//                         placeholder='Name'
//                         placeholderTextColor={'#a3a8c8'}
//                     />
//                 </View>
//                 <View style={AuthStyle.TextInputStyle}>
//                     <Image
//                         resizeMode='contain'
//                         source={IMAGE.EmialIcon}
//                         style={[AuthStyle.TextInputIconStyle, { height: RFPercentage(1.8), width: RFPercentage(1.8) }]}
//                     />
//                     <TextInput
//                         autoCapitalize={Platform.OS === 'ios' ? 'none' : 'off'}
//                         autoComplete={Platform.OS === 'ios' ? 'none' : 'off'}
//                         style={AuthStyle.TextInputInnerStyle}
//                         value={email}
//                         onChangeText={setEmail}
//                         keyboardType="email-address"
//                         placeholder='Email address'
//                         placeholderTextColor={'#a3a8c8'}
//                     />
//                 </View>
//                 <View style={AuthStyle.TextInputStyle}>
//                     <Image
//                         resizeMode='contain'
//                         source={IMAGE.PasswordIcon}
//                         style={AuthStyle.TextInputIconStyle}
//                     />
//                     <TextInput
//                         autoCapitalize={Platform.OS === 'ios' ? 'none' : 'off'}
//                         autoComplete={Platform.OS === 'ios' ? 'none' : 'off'}
//                         style={[AuthStyle.TextInputInnerStyle, {}]}
//                         value={password}
//                         onChangeText={setPassword}
//                         secureTextEntry={true}
//                         placeholder='Password (8 + characters)'
//                         placeholderTextColor={'#a3a8c8'}
//                     />
//                 </View>
//                 <TouchableOpacity
//                     style={AuthStyle.BtnTouchViewStyle}
//                     onPress={() => { navigation.navigate('MainStack') }}

//                 >
//                     <Text style={AuthStyle.SignUpBtnText}>Sign Up</Text>
//                 </TouchableOpacity>
//             </KeyboardAwareScrollView>
//         </View>
//     )
// }

export function Email_Login() {
  const OnLogin = () => {};

  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  const signin = (email, password) => {
    try {
      auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };
  if (authenticated) {
    navigation.navigate("MainStack");
  } else {
    console.log("FAILED SIGNUP");
  }
  return <View></View>;
}


class Authorization extends Component {

    render(){
      return(
        <>
        <GoogleAuth />
        </>
        // <View></View>
        // alert('login Success')
      )
    }
}

const mapStateToProps = (state) =>{
  return {
    Login : state.Login
  }
}

export default connect(
  mapStateToProps,
  {LoginAction}
)(Authorization)