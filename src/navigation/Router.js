import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import "react-native-gesture-handler";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Splash from "../components/Auth/Splash";
import History from "../components/Component/History";
import Home from "../components/Component/Home";
import Explore from "../components/Component/Explore";
import Notification from "../components/Component/Notification";
import Profile from "../components/Component/Profile";
import LikeScreen from "../components/Component/LikeScreen";
import VideoCall from "../components/Component/VideoCall";

import EditProfile from "../components/SubComponent/EditProfile";
import Invite from "../components/SubComponent/Invite";
import Notes from "../components/SubComponent/Notes";
import Purchase from "../components/SubComponent/Purchase";
import Setting from "../components/SubComponent/Setting";
import Web_View_Com from "../components/SubComponent/Webcomponent/Web_View_Com";
import Web_TermsAndCondi from "../components/SubComponent/Webcomponent/Web_TermsAndCondi";
import Web_PrivacyPolicy from "../components/SubComponent/Webcomponent/Web_PrivacyPolicy";

import ForgetScreen from "../components/ForgotComponent/ForgetScreen";
import ForgotVerify from "../components/ForgotComponent/ForgotVerify,";
import Reset from "../components/ForgotComponent/Reset";

import { RFPercentage } from "react-native-responsive-fontsize";
import RouterSplash from "../components/Auth/RouterSplash";
import Splash2 from "../components/Auth/Splash(skipped)";
import BottomTabBar from "./BottomTabBar";
import DrawerBar from "./DrawerBar";

import Quiz from "../components/Component/Quiz";

import TrendingPage from "../components/Component/TrendingPage";
import VoiceToText from "../components/SubComponent/VoiceToText";

import CommonCategory from "../components/Component/CommonCategory";
import Meditation from "../components/Component/Meditation";
import ExploreScreen from "../components/Component/ExploreScreen";
import Topic from "../components/Component/Topic";
import BookingStatusScreen from "../components/Component/BookingStatusScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// const Router = () => {
//     <Stack.Navigator>
//         <Stack.Screen name='Splash' component={Splash} />
//         <Stack.Screen name='Login' component={Login}
//             options={{
//                 gestureEnabled: false,
//             }}
//         />
//         <Stack.Screen name='SignUp' component={SignUp} />
//     </Stack.Navigator>
// }

const MainScreen = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          gestureEnabled: false,
          // presentation: 'containedTransparentModal'
        }}
      />
      <Stack.Screen
        name="CommonCategory"
        component={CommonCategory}
        options={{
          gestureEnabled: true,
          presentation:
            Platform.OS === "android" ? "containedTransparentModal" : "card",
        }}
      />
      <Stack.Screen
        name="Topic"
        component={Topic}
        options={{
          gestureEnabled: true,
          presentation:
            Platform.OS === "android" ? "containedTransparentModal" : "card",
        }}
      />
      {/* <Stack.Screen 
                name='Explore' component={Explore}
                options={{
                    gestureEnabled: true,
                }}
            /> */}
      <Stack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          gestureEnabled: true,
        }}
      />

      {/* <Stack.Screen name='Meditation' component={Meditation}
                options={{
                    gestureEnabled: true,
                    // presentation: 'containedTransparentModal'
                }}
            /> */}
      <Stack.Screen
        name="Purchase"
        component={Purchase}
        options={{
          gestureEnabled: true,
          presentation:
            Platform.OS === "android" ? "containedTransparentModal" : "card",
          // presentation: 'containedTransparentModal'
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          gestureEnabled: false,
          // presentation: 'containedTransparentModal'
          presentation:
            Platform.OS === "android" ? "containedTransparentModal" : "card",
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          gestureEnabled: false,
          presentation:
            Platform.OS === "android" ? "containedTransparentModal" : "card",
        }}
      />
      <Stack.Screen
        name=" Notes"
        component={Notes}
        options={{
          // presentation: 'containedTransparentModal'
          presentation:
            Platform.OS === "android" ? "containedTransparentModal" : "card",
        }}
      />
      <Stack.Screen
        name="Invite"
        component={Invite}
        options={{
          presentation: "containedTransparentModal",
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={
          {
            // presentation: 'containedTransparentModal'
          }
        }
      />
    </Stack.Navigator>
  );
};
export const MainRouter = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen
          name="RouterSplash"
          component={RouterSplash}
          options={{
            gestureEnabled: false,
            // presentation: 'containedTransparentModal'
          }}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            gestureEnabled: false,
            // presentation: 'containedTransparentModal'
          }}
        />
        <Stack.Screen
          name="Splash2"
          component={Splash2}
          options={{
            gestureEnabled: false,
            // presentation: 'containedTransparentModal'
          }}
        />
        <Stack.Screen
          name="Router"
          component={Router}
          options={{
            gestureEnabled: false,
            // presentation: 'containedTransparentModal'
          }}
        />
        <Stack.Screen
          name="MainStack"
          component={MainStack}
          options={{
            gestureEnabled: false,
            // presentation: 'containedTransparentModal'
          }}
        />
        <Stack.Screen
          name="Web_TermsAndCondi"
          component={Web_TermsAndCondi}
          options={{
            gestureEnabled: true,
            // presentation: 'containedTransparentModal'
          }}
        />
        <Stack.Screen
          name="Web_PrivacyPolicy"
          component={Web_PrivacyPolicy}
          options={{
            gestureEnabled: true,
            // presentation: 'containedTransparentModal'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const Router = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          gestureEnabled: false,
          // presentation: 'containedTransparentModal'
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          gestureEnabled: false,
          // presentation: 'containedTransparentModal'
        }}
      />
      <Stack.Screen
        name="ForgetScreen"
        component={ForgetScreen}
        options={
          {
            // presentation: 'containedTransparentModal'
          }
        }
      />
      <Stack.Screen
        name="ForgotVerify"
        component={ForgotVerify}
        options={
          {
            // presentation: 'containedTransparentModal'
          }
        }
      />
      <Stack.Screen
        name="Reset"
        component={Reset}
        options={
          {
            // presentation: 'containedTransparentModal'
          }
        }
      />
      <Stack.Screen
        name="MainStack"
        component={MainStack}
        options={{
          gestureEnabled: false,
          // presentation: 'containedTransparentModal'
        }}
      />
    </Stack.Navigator>
  );
};
const MainStack = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Drawer" component={CustomeDrawer} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          // presentation: 'transparentModal'
          presentation:
            Platform.OS === "android" ? "containedTransparentModal" : "card",
        }}
      />
      <Stack.Screen
        name="Notes"
        component={Notes}
        options={{
          presentation:
            Platform.OS === "android" ? "containedTransparentModal" : "card",
          // presentation: 'containedTransparentModal'
        }}
      />
      <Stack.Screen
        name="VideoCall"
        component={VideoCall}
        options={{
          gestureEnabled: true,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="VoiceToText"
        component={VoiceToText}
        options={
          {
            // presentation: 'containedTransparentModal'
          }
        }
      />
      <Stack.Screen
        name="Invite"
        component={Invite}
        options={{
          // presentation: 'containedTransparentModal'
          presentation:
            Platform.OS === "android" ? "containedTransparentModal" : "card",
        }}
      />
      <Stack.Screen
        name="Purchase"
        component={Purchase}
        options={{
          // presentation: 'containedTransparentModal'
          presentation:
            Platform.OS === "android" ? "containedTransparentModal" : "card",
        }}
      />
      <Stack.Screen name="Quiz" component={Quiz} options={{}} />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          // presentation: 'containedTransparentModal'
          presentation:
            Platform.OS === "android" ? "containedTransparentModal" : "card",
        }}
      />
      <Stack.Screen
        name="BookingStatusScreen"
        component={BookingStatusScreen}
        options={
          {
            // presentation: 'containedTransparentModal'
            // presentation: Platform.OS === 'android' ? "containedTransparentModal" : "card"
          }
        }
      />
      <Stack.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          // presentation: 'containedTransparentModal'
          presentation:
            Platform.OS === "android" ? "containedTransparentModal" : "card",
        }}
      />
      <Stack.Screen
        name="TrendingPage"
        component={TrendingPage}
        options={
          {
            // presentation: 'containedTransparentModal'
          }
        }
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={
          {
            // presentation: 'containedTransparentModal'
          }
        }
      />
      {/* <Stack.Screen
        name="Meditation"
        component={Meditation}
        options={
          {
            // presentation: 'containedTransparentModal'
          }
        }
      /> */}

      <Stack.Screen
        name="Web_View_Com"
        component={Web_View_Com}
        options={{
          gestureEnabled: true,
          // presentation: 'containedTransparentModal'
        }}
      />
      {/* <Stack.Screen name='SettingStack' component={SettingStack} /> */}
    </Stack.Navigator>
  );
};

const CustomeDrawer = ({ props }) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // initialRouteName={'Explore'}
      drawerContent={(props) => <DrawerBar {...props} />}
    >
      <Drawer.Screen name="Bottom" component={Bottom} />
    </Drawer.Navigator>
  );
};

const Bottom = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarPosition={"bottom"}
      screenOptions={{
        tabBarStyle: {
          paddingVertical: RFPercentage(0.7),
          backgroundColor: "#FFFFFF",
        },
        tabBarIndicatorStyle: {
          height: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          headerShown: false,
          tabBarButton: (props) => <BottomTabBar label={"Home"} {...props} />,
        }}
      />
      <Tab.Screen
        name="LikeScreen"
        component={LikeScreen}
        options={{
          tabBarIcon: ({ size }) => <BottomTabBar size={20} />,
          headerShown: false,
          tabBarButton: (props) => (
            <BottomTabBar label={"LikeScreen"} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/icons/LogoIcon.png")}
              style={{ height: RFPercentage(6), width: RFPercentage(6) }}
            />
          ),
          tabBarIconStyle: {
            height: RFPercentage(4),
            width: RFPercentage(4),
          },
          headerShown: false,
          tabBarButton: (props) => (
            <BottomTabBar label={"Explore"} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <BottomTabBar label={"Notification"} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <BottomTabBar label={"Profile"} {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Router;
