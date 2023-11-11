import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from "../../common/colors";
import * as IMAGE from "../../common/Image";
import GoogleAuth, { AppleSignIn, onFbLogin } from "./Authorization";
import { AuthStyle } from "./AuthStyle";
import { ForgetInnerStyle } from "../ForgotComponent/ForgetInnerStyle";

import { connect } from "react-redux";
import { LoginAction, RegisterAction } from "../../redux/action";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const { width, height } = Dimensions.get("window");

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      role: 3,
      modalVisible: false,
      showPassword: false,
      checkregister: false,
      checklogin: true,
      isLoading: false,
    };
  }
  setModalVisible = () => {
    this.setState({ modalVisible: true });
  };
  close = () => {
    this.setState({ modalVisible: false });
  };
  OpenTermsAndCondiionWebView = () => {
    if (this.state.modalVisible == true) {
      this.close();
      // this.setState({modalVisible : false},() =>{
      this.props.navigation.navigate("Web_TermsAndCondi");
      // })
    } else if (this.state.modalVisible == false) {
      this.props.navigation.navigate("Web_TermsAndCondi");
    }
  };
  PricacyPolice = () => {
    if (this.state.modalVisible == true) {
      this.close();
      this.props.navigation.navigate("Web_PrivacyPolicy");
    } else if (this.state.modalVisible == false) {
      this.props.navigation.navigate("Web_PrivacyPolicy");
    }
  };

  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.checkregister) {
      if (nextProps.Register.RegisterSuccess) {
        this.setState({ checklogin: false });
        if (nextProps.Register.data.data)
          this.setState({ checkregister: false });
        this.props.LoginAction({
          email: nextProps.Register.data.data.email,
          password: nextProps.Register.data.data.password,
          login_type: nextProps.Register.data.data.role,
        });
      }
    }
    if (this.state.checklogin) {
      if (nextProps.Login.LoginSuccess) {
        if (nextProps.Login.data.success) {
          this.setState({ checklogin: false });
          const AccessToken = nextProps.Login.data.data.token;
          await AsyncStorage.setItem("AccessToken", AccessToken);
          this.setState({ isLoading: false });
          this.props.navigation.navigate("MainStack");
        } else {
          this.setState({ isLoading: false });
        }
      } else {
        this.setState({ isLoading: false });
      }
    }
  }

  OnSignIn = async () => {
    const name = this.state.name;
    var mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const username = this.state.email.toLowerCase();
    const pass = this.state.password;
    if (name == "") {
      alert("Please Enter name");
    } else if (username.trim() == "") {
      alert("Please Enter email");
    } else if (!username.match(mailformat)) {
      alert("Please Enter Valid email");
    } else if (pass == "") {
      alert("Please Enter password");
    } else {
      this.setState({ isLoading: true });
      this.close();
      // this.setState({ isVisible: false }, () => {
      //   this.setState({ isloading: true });
      // });
      this.props.RegisterAction({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        role: 3,
      });

      this.setState({ checkregister: true });
    }
  };

  ChangeScreenlogin = () => {
    this.setState({ modalVisible: false });
    this.props.navigation.navigate("Login");
  };

  render() {
    const { modalVisible } = this.state;
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
        </ImageBackground>
        <View style={{ backgroundColor: Colors.Black_Blue, flex: 3 }}>
          <View style={[AuthStyle.SignUpMainViewStyle, { bottom: RFValue(1) }]}>
            <View
              style={[
                AuthStyle.ChildFirstViewStyle,
                { paddingHorizontal: RFPercentage(1.5) },
              ]}
            >
              <Text style={AuthStyle.WelcomHeaderTextStyle}>
                Welcome To Clarity Valley
              </Text>
              <Text
                style={[AuthStyle.CreationTextStyle, { textAlign: "center" }]}
              >
                Create an account to get started on your health and happiness
                journey.
              </Text>
            </View>
            <View style={[AuthStyle.SignUpBtnChildViewStyle]}>
              <View style={[AuthStyle.SocialBtnViewStyle]}>
                <TouchableOpacity
                  style={[
                    AuthStyle.BtnInnerStyle,
                    { justifyContent: "center" },
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

                <TouchableOpacity
                  style={[
                    AuthStyle.BtnInnerStyle,
                    { justifyContent: "center" },
                  ]}
                  onPress={() => this.setModalVisible(true)}
                >
                  <Image
                    resizeMode="contain"
                    source={IMAGE.RoundEmailIcon}
                    style={AuthStyle.SocialIconStyle_E}
                  />
                  <Text style={[AuthStyle.BtnTextStyle, {}]}>
                    Continue with Email
                  </Text>
                </TouchableOpacity>
                <Modal
                  visible={modalVisible}
                  transparent
                  animationType="slide"
                  onSwipeComplete={this.close}
                  useNativeDriver={true}
                  backdropColor={"transparent"}
                  useNativeDriverForBackdrop
                  swipeDirection={["down"]}
                  style={{
                    margin: 0,
                  }}
                >
                  <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
                    <View style={AuthStyle.ModalFirstViewStyle}>
                      <ScrollView showsVerticalScrollIndicator={true}>
                        <View style={AuthStyle.ChildFirstViewStyle}>
                          <Text style={AuthStyle.WelcomHeaderTextStyle}>
                            Welcome To Clarity Valley
                          </Text>
                          <Text style={AuthStyle.CreationTextStyle}>
                            SignUp an account to explore
                          </Text>
                        </View>
                        <View style={AuthStyle.TextInputStyle}>
                          <Image
                            resizeMode="contain"
                            source={IMAGE.NameIcon}
                            style={AuthStyle.TextInputIconStyle}
                          />
                          <TextInput
                            autoCapitalize={
                              Platform.OS === "ios" ? "none" : "off"
                            }
                            autoComplete={
                              Platform.OS === "ios" ? "none" : "off"
                            }
                            style={AuthStyle.TextInputInnerStyle}
                            value={this.state.name}
                            onChangeText={(V) => this.setState({ name: V })}
                            keyboardType="email-address"
                            placeholder="Name"
                            placeholderTextColor={"#a3a8c8"}
                          />
                        </View>
                        <View style={AuthStyle.TextInputStyle}>
                          <Image
                            resizeMode="contain"
                            source={IMAGE.EmialIcon}
                            style={[
                              AuthStyle.TextInputIconStyle,
                              {
                                height: RFPercentage(1.8),
                                width: RFPercentage(1.8),
                              },
                            ]}
                          />
                          <TextInput
                            autoCapitalize={
                              Platform.OS === "ios" ? "none" : "off"
                            }
                            autoComplete={
                              Platform.OS === "ios" ? "none" : "off"
                            }
                            style={AuthStyle.TextInputInnerStyle}
                            value={this.state.email}
                            onChangeText={(V) =>
                              this.setState({ email: V.trim() })
                            }
                            keyboardType="email-address"
                            placeholder="Email address"
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
                            autoCapitalize={
                              Platform.OS === "ios" ? "none" : "off"
                            }
                            autoComplete={
                              Platform.OS === "ios" ? "none" : "off"
                            }
                            style={[AuthStyle.TextInputInnerStyle, {}]}
                            value={this.state.password}
                            keyboardType="default"
                            onChangeText={(V) => this.setState({ password: V })}
                            placeholder="Password (8 + characters)"
                            placeholderTextColor={"#a3a8c8"}
                            secureTextEntry={
                              this.state.showPassword ? false : true
                            }
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
                        <TouchableOpacity
                          style={AuthStyle.BtnTouchViewStyle}
                          onPress={() => {
                            this.OnSignIn();
                          }}
                        >
                          <Text style={AuthStyle.SignUpBtnText}>Sign Up</Text>
                        </TouchableOpacity>
                        <View
                          style={[
                            AuthStyle.SignUpBtnViewStyle,
                            { marginVertical: RFPercentage(2) },
                          ]}
                        >
                          <Text style={AuthStyle.SignUpDisableTextStyle}>
                            Already have an account?{" "}
                          </Text>
                          <TouchableOpacity
                            onPress={() => this.ChangeScreenlogin()}
                          >
                            <Text
                              style={[
                                AuthStyle.SignUpBtnTextStyle,
                                { color: Colors.OrangeTextColor },
                              ]}
                            >
                              Log in
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={AuthStyle.BottomfirstViewStyle_M}>
                          <Text
                            style={[
                              AuthStyle.NonLinkedTextStyle,
                              { fontSize: RFValue(8) },
                            ]}
                          >
                            By continuing, you agree to Clarity-Valley{" "}
                          </Text>
                          <TouchableOpacity
                            onPress={() => this.OpenTermsAndCondiionWebView()}
                          >
                            <Text
                              style={[
                                AuthStyle.LinkTextStyle,
                                { fontSize: RFValue(8) },
                              ]}
                            >
                              Terms {"&"} Conditions{" "}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={AuthStyle.BottomSecondViewStyle}>
                          <Text
                            style={[
                              AuthStyle.SecoundNonLinkedTextStyle,
                              { fontSize: RFValue(8) },
                            ]}
                          >
                            and{" "}
                          </Text>
                          <TouchableOpacity
                            onPress={() => this.PricacyPolice()}
                          >
                            <Text
                              style={[
                                AuthStyle.SecoundLinkedTextStyle,
                                { fontSize: RFValue(8) },
                              ]}
                            >
                              Privacy Policy
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </ScrollView>
                    </View>
                  </KeyboardAwareScrollView>
                </Modal>

                <View style={[AuthStyle.SignUpBtnViewStyle]}>
                  <Text style={AuthStyle.SignUpDisableTextStyle}>
                    Already have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Login")}
                  >
                    <Text
                      style={[
                        AuthStyle.SignUpBtnTextStyle,
                        { color: Colors.OrangeTextColor },
                      ]}
                    >
                      Log in
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={AuthStyle.BottomfirstViewStyle}>
                  <Text style={AuthStyle.NonLinkedTextStyle}>
                    By continuing, you agree to Clarity-Valley's{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.OpenTermsAndCondiionWebView()}
                  >
                    <Text style={AuthStyle.LinkTextStyle}>
                      Terms {"&"}{" "}
                      <Text style={AuthStyle.LinkTextStyle}>Conditions</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={AuthStyle.BottomSecondViewStyle}>
                  {/* <TouchableOpacity>
                    <Text style={AuthStyle.LinkTextStyle}>Conditions </Text>
                  </TouchableOpacity> */}
                  <Text style={AuthStyle.SecoundNonLinkedTextStyle}>and </Text>
                  <TouchableOpacity onPress={() => this.PricacyPolice()}>
                    <Text style={AuthStyle.SecoundLinkedTextStyle}>
                      Privacy Policy
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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
    Register: state.Register,
  };
};
export default connect(mapStateToProps, { LoginAction, RegisterAction })(
  SignUp
);
