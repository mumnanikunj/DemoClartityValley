import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from "../common/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const { width, height } = Dimensions.get("window");

const BottomTabBar = ({ label, accessibilityState, onPress }) => {
  const focused = accessibilityState.selected;
  // const ActiveIcon = IMAGE.ActiveIcon;
  return (
    <TouchableOpacity style={{ width: windowWidth / 5 }} onPress={onPress}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          resizeMode="contain"
          source={
            label == "Home"
              ? require("../assets/images/icons/HomeIcon.png")
              : label == "LikeScreen"
              ? require("../assets/images/icons/Heart_i.png")
              : label == "Explore"
              ? require("../assets/images/Logo1.png")
              : label == "Notification"
              ? require("../assets/images/icons/bell_icon.png")
              : require("../assets/images/icons/ProfileIcon.png")
          }
          style={
            label == "Explore"
              ? (size = {
                  height: RFPercentage(5.5),
                  width: RFPercentage(12),
                  marginVertical: RFValue(0),
                })
              : label == "Home"
              ? (size = {
                  height: RFPercentage(2.5),
                  width: RFPercentage(2.5),
                  paddingVertical: RFPercentage(3),
                  tintColor: focused ? "#000000" : "#686868",
                })
              : label == "LikeScreen"
              ? (size = {
                  height: RFPercentage(3),
                  width: RFPercentage(3),
                  paddingVertical: RFPercentage(3.4),
                  tintColor: focused ? "#000000" : "#686868",
                })
              : label == "Notification"
              ? (size = {
                  height: RFPercentage(3.5),
                  width: RFPercentage(3.5),
                  paddingVertical: RFPercentage(3.4),
                  tintColor: focused ? "#000000" : "#686868",
                })
              : (size = {
                  height: RFPercentage(2.5),
                  width: RFPercentage(2.5),
                  paddingVertical: RFPercentage(3.4),
                  tintColor: focused ? "#000000" : "#686868",
                })
          }
        />
        <View
          style={
            label == "Explore"
              ? (size = {
                  paddingVertical: RFValue(2),
                  marginLeft: RFValue(0),
                })
              : null
          }
        >
          {focused ? (
            <View
              style={{
                backgroundColor: Colors.Orange1,
                height: RFPercentage(0.5),
                width: RFPercentage(0.5),
                borderRadius: RFPercentage(0.5),
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: Colors.White,
                height: RFPercentage(0.6),
                width: RFPercentage(0.6),
                borderRadius: RFPercentage(0.6),
              }}
            />
          )}
        </View>
      </View>
      <SafeAreaView style={{ backgroundColor: "transparent" }} />
    </TouchableOpacity>
  );
};

export default BottomTabBar;
