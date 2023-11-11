import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Colors from "../common/colors";
import * as IMAGE from "../common/Image";
import { DrawerStyle } from "./DrawerStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const DrawerBar = () => {
  const navigation = useNavigation();
  return (
    // <DrawerContentScrollView {...props} style={{backgroundColor:"red"}}>
    <>
      <View style={{}}>
        <View style={{ backgroundColor: Colors.Drawer }}>
          <Image
            resizeMode="contain"
            source={IMAGE.Logo1}
            style={DrawerStyle.Logo}
          />
        </View>
      </View>
      <View style={DrawerStyle.DrawerMainView}>
        <View style={DrawerStyle.Sec_View}>
          <TouchableOpacity
            style={DrawerStyle.CommonTouchStyle}
            onPress={() => navigation.navigate("Home")}
          >
            <Image
              resizeMode="contain"
              source={IMAGE.home_Icon}
              style={DrawerStyle.CommmonIcon}
            />
            <Text style={DrawerStyle.CommonTextStyle}>Home</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: RFPercentage(2) }}>
          <TouchableOpacity
            style={DrawerStyle.CommonTouchStyle}
            onPress={() => navigation.navigate("TrendingPage")}
          >
            <Image
              resizeMode="contain"
              source={IMAGE.TrandingIcon}
              style={DrawerStyle.CommmonIcon}
            />
            <Text style={DrawerStyle.CommonTextStyle}>Inspiration</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: RFPercentage(2) }}>
          <TouchableOpacity
            style={DrawerStyle.CommonTouchStyle}
            onPress={() => navigation.navigate("History")}
          >
            <Image
              resizeMode="contain"
              source={IMAGE.cloud_Icon}
              style={DrawerStyle.CommmonIcon}
            />
            <Text style={DrawerStyle.CommonTextStyle}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: RFPercentage(2) }}>
          <TouchableOpacity
            style={DrawerStyle.CommonTouchStyle}
            onPress={() => navigation.navigate("BookingStatusScreen")}
          >
            <Image
              resizeMode="contain"
              source={IMAGE.BookingIcon}
              style={[DrawerStyle.CommmonIcon, { tintColor: Colors.White }]}
            />
            <Text style={DrawerStyle.CommonTextStyle}>Appointment Status</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: RFPercentage(2) }}>
          <TouchableOpacity
            style={DrawerStyle.CommonTouchStyle}
            onPress={() => navigation.navigate("Quiz")}
          >
            <Image
              resizeMode="contain"
              source={IMAGE.QuestionIcon}
              style={DrawerStyle.CommmonIcon}
            />
            <Text style={DrawerStyle.CommonTextStyle}>Myers Quiz</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: RFPercentage(2) }}>
          <TouchableOpacity
            style={DrawerStyle.CommonTouchStyle}
            onPress={() => navigation.navigate("Setting")}
          >
            <Image
              resizeMode="contain"
              source={IMAGE.settings_Icon}
              style={DrawerStyle.CommmonIcon}
            />
            <Text style={DrawerStyle.CommonTextStyle}>Settings</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: RFPercentage(2) }}>
          <TouchableOpacity
            style={DrawerStyle.CommonTouchStyle}
            onPress={async () => {
              AsyncStorage.removeItem("AccessToken");
              navigation.navigate("Router");
            }}
          >
            <Image
              resizeMode="contain"
              source={IMAGE.ExitIcon}
              style={DrawerStyle.CommmonIcon}
            />
            <Text style={DrawerStyle.CommonTextStyle}>Logout</Text>
            {/* <Google_Signout Logstyle={DrawerStyle.CommonTextStyle} /> */}
          </TouchableOpacity>
        </View>
      </View>
    </>
    // </DrawerContentScrollView>
  );
};

export default DrawerBar;
