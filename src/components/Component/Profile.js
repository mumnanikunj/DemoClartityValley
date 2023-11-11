import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
} from "react-native";

import * as IMAGE from "../../common/Image";
import * as Colors from "../../common/colors";
import * as Fonts from "../../common/Fonts";
import { InnerStyle } from "./InnerStyle";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BGImageAction,
  ProfileDetailsAction,
  EditProfileAction,
} from "../../redux/action";
import { connect } from "react-redux";
import Api from "../../common/Api";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const { width, height } = Dimensions.get("window");

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      ProfileImageset: null,
      isLoading: true,
      BG: "",
      name: "",
      ProfileDetails: [],
    };
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps?.BGImage) {
      if (nextProps?.BGImage.BGImageSuccess) {
        const BGI = nextProps.BGImage.data.data;
        const found = BGI.find((obj) => {
          return obj.name === "CommonScreen";
        });
        this.setState({ BG: found });
        this.setState({ isLoading: false });
      }
    }
    if (nextProps?.ProfileDetails) {
      if (nextProps?.ProfileDetails.LoginSuccess) {
        const profileData = nextProps.ProfileDetails.data.data[0];
        console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-", profileData);
        this.setState({ ProfileDetails: profileData });
        this.setState({ isLoading: false });
      }
    }
    if (nextProps?.EditProfile) {
      console.log("====00000000", nextProps?.EditProfile);
      if (nextProps?.EditProfile.EditProfileSuccess) {
        await this.props.ProfileDetailsAction();
        const data = await Api.ProfileDetails();
        console.log("data+-+-++-+-+-+-+-+-+-", data); ///////
        this.setState({ ProfileDetails: profileData });
        this.setState({ isLoading: false });
      }
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }
  async componentDidMount() {
    // this.props.navigation.addListener("focus", async () => {
    //   await this.props.ProfileDetailsAction();
    //   console.log("bhaio bhai......",this.props.EditProfile.data.data[0]);
    //   const profileData = this.props.ProfileDetails.data.data[0];
    //     this.setState({ ProfileDetails: profileData });
    //     this.setState({ isLoading: false });
    // });
    this.props.ProfileDetailsAction();
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
    this.ProfileImageGet();
  }
  ProfileImageGet = async () => {
    const ProIMG = await AsyncStorage.getItem("ProfileImage");
    this.setState({ ProfileImageset: JSON.parse(ProIMG) });
  };

  Logout() {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          AsyncStorage.removeItem("AccessToken");
          AsyncStorage.removeItem("UserName");
          this.props.navigation.navigate("Login");
        },
        style: "destructive",
      },
    ]);
  }

  render() {
    console.log("name", this.state.ProfileDetails.name);
    console.log("Email", this.state.ProfileDetails.email);
    console.log("image", this.state.ProfileDetails.image);
    return (
      <View>
        <ImageBackground
          source={
            this.state.isLoading
              ? IMAGE.HomeImage
              : { uri: this.state.BG.image }
          }
          style={{ height: windowHeight }}
        >
          <StatusBar
            hidden={false}
            barStyle={"light-content"}
            translucent
            backgroundColor="transparent"
          />
          <View style={InnerStyle.HeaderMainStyle}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Image
                resizeMode="contain"
                source={IMAGE.DrawerIcon}
                style={InnerStyle.DrawerIconStyle}
              />
            </TouchableOpacity>
            <Text style={InnerStyle.HeaderTitle}>Profile</Text>
            <View style={InnerStyle.BlankSpace}></View>
          </View>

          <View
            style={[
              InnerStyle.ProfileSecoundMainViewStyle,
              {
                backgroundColor: this.state.isLoading
                  ? Colors.DarkBlue
                  : this.state.BG.colour,
              },
            ]}
          >
            <View style={InnerStyle.ProfileInnerStyle}>
              {this.state.ProfileDetails.image == "" ||
              this.state.ProfileDetails.image == null ? (
                <Image
                  resizeMode="contain"
                  source={IMAGE.ProfileImage}
                  style={[
                    InnerStyle.ProfileIMG,
                    {
                      backgroundColor:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Grey
                          : Colors.White,
                    },
                  ]}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={{
                    // uri: `https://app.clarityvalley.com/public/${this.state.Image}`,
                    // uri: this.state.ProfileImageset,

                    uri: this.state.ProfileDetails.image,
                  }}
                  style={InnerStyle.ProfileIMG}
                />
              )}
              <View style={InnerStyle.BasicInfoStyle}>
                <Text
                  style={[
                    InnerStyle.ProfileNameTextStyle,
                    {
                      color:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Black
                          : Colors.White,
                    },
                  ]}
                >
                  {this.state.ProfileDetails.name}
                </Text>
                <Text
                  style={[
                    InnerStyle.ProfileNameTextStyle,
                    {
                      color:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Black
                          : Colors.White,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {this.state.ProfileDetails.email}
                </Text>
              </View>
            </View>
            <ScrollView>
              <View style={InnerStyle.ProfileSectionMainViewStyle}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("EditProfile")}
                >
                  <View style={InnerStyle.ProfileSectionStyle}>
                    <Text
                      style={[
                        InnerStyle.ProfileTextStyle,
                        {
                          color:
                            this.state.BG.colour === "#ffffff"
                              ? Colors.Black
                              : Colors.White,
                        },
                      ]}
                    >
                      Edit Profile
                    </Text>
                    <Image
                      resizeMode="contain"
                      source={IMAGE.RigthArrow}
                      style={[
                        InnerStyle.RigthArrowStyle,
                        {
                          tintColor:
                            this.state.BG.colour === "#ffffff"
                              ? Colors.Black
                              : Colors.White,
                        },
                      ]}
                    />
                  </View>
                </TouchableOpacity>
                <View
                  style={[
                    InnerStyle.horozontalLine,
                    {
                      backgroundColor:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Black
                          : Colors.White,
                    },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Notes")}
                >
                  <View style={InnerStyle.ProfileSectionStyle}>
                    <Text
                      style={[
                        InnerStyle.ProfileTextStyle,
                        {
                          color:
                            this.state.BG.colour === "#ffffff"
                              ? Colors.Black
                              : Colors.White,
                        },
                      ]}
                    >
                      Notes / Diary
                    </Text>
                    <Image
                      resizeMode="contain"
                      source={IMAGE.RigthArrow}
                      style={[
                        InnerStyle.RigthArrowStyle,
                        {
                          tintColor:
                            this.state.BG.colour === "#ffffff"
                              ? Colors.Black
                              : Colors.White,
                        },
                      ]}
                    />
                  </View>
                </TouchableOpacity>
                <View
                  style={[
                    InnerStyle.horozontalLine,
                    {
                      backgroundColor:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Black
                          : Colors.White,
                    },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Invite")}
                >
                  <View style={InnerStyle.ProfileSectionStyle}>
                    <Text
                      style={[
                        InnerStyle.ProfileTextStyle,
                        {
                          color:
                            this.state.BG.colour === "#ffffff"
                              ? Colors.Black
                              : Colors.White,
                        },
                      ]}
                    >
                      Share with Friends
                    </Text>
                    <Image
                      resizeMode="contain"
                      source={IMAGE.RigthArrow}
                      style={[
                        InnerStyle.RigthArrowStyle,
                        {
                          tintColor:
                            this.state.BG.colour === "#ffffff"
                              ? Colors.Black
                              : Colors.White,
                        },
                      ]}
                    />
                  </View>
                </TouchableOpacity>
                <View
                  style={[
                    InnerStyle.horozontalLine,
                    {
                      backgroundColor:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Black
                          : Colors.White,
                    },
                  ]}
                />

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Purchase")}
                >
                  <View style={InnerStyle.ProfileSectionStyle}>
                    <Text
                      style={[
                        InnerStyle.ProfileTextStyle,
                        {
                          color:
                            this.state.BG.colour === "#ffffff"
                              ? Colors.Black
                              : Colors.White,
                        },
                      ]}
                    >
                      Purchase
                    </Text>
                    <Image
                      resizeMode="contain"
                      source={IMAGE.RigthArrow}
                      style={[
                        InnerStyle.RigthArrowStyle,
                        {
                          tintColor:
                            this.state.BG.colour === "#ffffff"
                              ? Colors.Black
                              : Colors.White,
                        },
                      ]}
                    />
                  </View>
                </TouchableOpacity>
                <View
                  style={[
                    InnerStyle.horozontalLine,
                    {
                      backgroundColor:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Black
                          : Colors.White,
                    },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Setting")}
                >
                  <View style={InnerStyle.ProfileSectionStyle}>
                    <Text
                      style={[
                        InnerStyle.ProfileTextStyle,
                        {
                          color:
                            this.state.BG.colour === "#ffffff"
                              ? Colors.Black
                              : Colors.White,
                        },
                      ]}
                    >
                      Settings
                    </Text>
                    <Image
                      resizeMode="contain"
                      source={IMAGE.RigthArrow}
                      style={[
                        InnerStyle.RigthArrowStyle,
                        {
                          tintColor:
                            this.state.BG.colour === "#ffffff"
                              ? Colors.Black
                              : Colors.White,
                        },
                      ]}
                    />
                  </View>
                </TouchableOpacity>
                <View
                  style={[
                    InnerStyle.horozontalLine,
                    {
                      backgroundColor:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Black
                          : Colors.White,
                    },
                  ]}
                />
                <View style={InnerStyle.ProfileSectionStyle}>
                  <TouchableOpacity
                    onPress={this.Logout}
                    // onPress={async () => {
                    //   // Google_Signout()
                    //   await AsyncStorage.removeItem("AccessToken");
                    //   await AsyncStorage.removeItem("UserName");
                    //   this.props.navigation.navigate("Login");
                    // }}
                  >
                    <Text
                      style={{
                        color:
                          this.state.BG.colour === "#ffffff"
                            ? Colors.Black
                            : Colors.White,
                        fontFamily: Fonts.Bold,
                        fontSize: RFPercentage(2),
                      }}
                    >
                      Logout
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("-+-+-+-+-+-+-+-+-", JSON.stringify(state.ProfileDetails));
  return {
    EditProfile: state.EditProfile,
    BGImage: state.BGImage,
    ProfileDetails: state.ProfileDetails,
  };
};

export default connect(mapStateToProps, {
  BGImageAction,
  ProfileDetailsAction,
  EditProfileAction,
})(Profile);
