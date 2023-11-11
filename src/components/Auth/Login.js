import React, { Component } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from "../../common/colors";
import * as IMAGE from "../../common/Image";
import { AuthStyle } from "./AuthStyle";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GoogleAuth, {
  AppleSignIn,
  Email_Login,
  onFbLogin,
  signinwithfacebook,
} from "./Authorization";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ForgetInnerStyle } from "../ForgotComponent/ForgetInnerStyle";
import { connect } from "react-redux";
import { LoginAction } from "../../redux/action";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const { width, height } = Dimensions.get("window");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      Logintype: 1,
      isLoading: false,
      showPassword: false,
    };
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.Login.LoginSuccess) {
      if (nextProps.Login.data.success) {
        let AccessToken = nextProps.Login.data.data.token;
        await AsyncStorage.setItem("AccessToken", AccessToken);
        this.setState({ isLoading: false });
        // this.props.navigation.navigate("MainStack");
      } else {
        Alert.alert(nextProps.Login.data.message);
        this.setState({ isLoading: false });
      }
    }
  }

  OnLogin = async () => {
    var mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const username = this.state.email.toLowerCase();
    const pass = this.state.password;
    if (username.trim() == "") {
      alert("Please Enter email");
    } else if (!username.match(mailformat)) {
      alert("Please Enter Valid email");
    } else if (pass == "") {
      alert("Please Enter password");
    } else {
      this.setState({ isLoading: true });
      this.props.LoginAction({
        email: this.state.email,
        password: this.state.password,
        login_type: this.state.Logintype,
      });

      this.setState({ email: "" });
      this.setState({ password: "" });
      this.setState({ login_type: null });
    }
  };

  backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }
  render() {
    return (
      <>
        <ImageBackground
          // resizeMode='contain'
          source={IMAGE.SunsetImage}
          style={AuthStyle.backgroundImage}
        >
          <StatusBar
            hidden={false}
            barStyle={"light-content"}
            translucent
            backgroundColor="transparent"
          />
          {/* <View style={AuthStyle.HeaderStyle}>
                        <Text style={AuthStyle.HeaderMainTextStyle}>Clarity Valley</Text>
                        <Text style={AuthStyle.HeaderChildTextStyle}>Log into your Clarity Valley account</Text>
                    </View> */}
        </ImageBackground>
        <View style={{ backgroundColor: Colors.LigthDark, flex: 3 }}>
          <View style={[AuthStyle.SignUpMainViewStyle, { bottom: RFValue(1) }]}>
            <ScrollView
              // bounces={false}
              showsVerticalScrollIndicator={false}
            >
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
              >
                <View style={AuthStyle.ChildFirstViewStyle}>
                  <Text style={AuthStyle.WelcomHeaderTextStyle}>
                    Welcome To Clarity Valley
                  </Text>
                  <Text style={AuthStyle.CreationTextStyle}>
                    Login an account to explore
                  </Text>
                </View>
                <View style={AuthStyle.SignUpBtnChildViewStyle}>
                  {/* <Email_Login /> */}
                  <View style={AuthStyle.TextInputStyle}>
                    <Image
                      resizeMode="contain"
                      source={IMAGE.EmialIcon}
                      style={AuthStyle.TextInputIconStyle}
                    />
                    <TextInput
                      autoCapitalize={Platform.OS === "ios" ? "none" : "off"}
                      autoComplete={Platform.OS === "ios" ? "none" : "off"}
                      style={AuthStyle.TextInputInnerStyle}
                      value={this.state.email}
                      onChangeText={(V) => this.setState({ email: V.trim() })}
                      keyboardType="email-address"
                      placeholder="Email"
                      placeholderTextColor={"#a3a8c8"}
                    />
                  </View>
                  <View style={AuthStyle.TextInputStyle}>
                    <Image
                      resizeMode="contain"
                      source={IMAGE.PasswordIcon}
                      style={AuthStyle.TextInputIconStyle}
                    />
                    <TextInput
                      autoCapitalize={Platform.OS === "ios" ? "none" : "off"}
                      autoComplete={Platform.OS === "ios" ? "none" : "off"}
                      style={AuthStyle.TextInputInnerStyle}
                      keyboardType="default"
                      value={this.state.password}
                      onChangeText={(V) =>
                        this.setState({ password: V.trim() })
                      }
                      // secureTextEntry={true}
                      placeholder={"Password"}
                      placeholderTextColor={"#a3a8c8"}
                      secureTextEntry={this.state.showPassword ? false : true}
                    />
                    <TouchableOpacity
                      style={{
                        right: RFPercentage(5),
                        padding: RFPercentage(1),
                      }}
                      onPress={() =>
                        this.state.showPassword
                          ? this.setState({ showPassword: false })
                          : this.setState({ showPassword: true })
                      }
                    >
                      <Image
                        source={
                          this.state.showPassword
                            ? require("../../assets/images/icons/ShowIcon.png")
                            : require("../../assets/images/icons/HideIcon.png")
                        }
                        style={[ForgetInnerStyle.hiddenStyleIcon, {}]}
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("ForgetScreen")
                      }
                    >
                      <Text style={AuthStyle.ForgetTextStyle}>
                        Forgot password?
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={AuthStyle.LoginBtn}
                      onPress={
                        () => this.OnLogin()
                        // navigation.navigate('MainStack')
                      }
                    >
                      <Text style={AuthStyle.LoginBtnTextStyle}>Log In</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={AuthStyle.LineViewStyle}>
                    <View style={AuthStyle.LineStyle} />
                    <View>
                      <Text style={AuthStyle.LineTextStyle}>OR</Text>
                    </View>
                    <View style={AuthStyle.LineStyle} />
                  </View>
                  <View style={[AuthStyle.SocialBtnViewStyle, {}]}>
                    <TouchableOpacity
                      style={[
                        AuthStyle.BtnInnerStyle,
                        {
                          paddingVertical: RFPercentage(1),
                          justifyContent: "center",
                        },
                      ]}
                      onPress={() => onFbLogin()}
                    >
                      <Image
                        resizeMode="contain"
                        source={IMAGE.FacebookIcon}
                        style={AuthStyle.SocialIconStyle_F}
                      />
                      <Text style={AuthStyle.BtnTextStyle}>
                        Continue with Facebook
                      </Text>
                    </TouchableOpacity>
                    <GoogleAuth />
                    {Platform.OS === "ios" ? <AppleSignIn /> : null}
                    {/* <AppleSignIn /> */}
                    <View style={AuthStyle.SignUpBtnViewStyle}>
                      <Text style={AuthStyle.SignUpDisableTextStyle}>
                        Don't have an account?{" "}
                      </Text>
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("SignUp")}
                      >
                        <Text style={AuthStyle.SignUpBtnTextStyle}>SignUp</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </ScrollView>
          </View>
        </View>
        {this.state.isLoading ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <ActivityIndicator
              color={"white"}
              style={{
                position: "absolute",
                top: height / 2,
                left: width / 2.2,
              }}
              size={"large"}
            />
          </View>
        ) : undefined}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Login: state.Login,
  };
};
export default connect(mapStateToProps, { LoginAction })(Login);
