import React, { Component } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from "../../common/colors";
import * as IMAGE from "../../common/Image";
import { InnerStyle } from "../Component/InnerStyle";
import { SubInnerStyle } from "./SubInnerStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Switch } from "react-native-switch";
import { connect } from "react-redux";
import { BGImageAction, ProfileDetailsAction } from "../../redux/action";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const { width, height } = Dimensions.get("window");

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSwitch: false,
      showWebView: false,
      ProfileImageset: null,
      isLoading: true,
      BG: "",
      name: null,
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
        this.setState({ ProfileDetails: profileData });
        console.log("ProfileData Bhaibhuaio", this.state.ProfileDetails);
        this.setState({ isLoading: false });
      }
    }
  }

  backAction = () => {
    this.props.navigation.goBack(null);
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }
  async componentDidMount() {
    this.props.navigation.addListener("focus", async () => {
      const ACToken = await AsyncStorage.getItem("AccessToken");
      BackHandler.addEventListener("hardwareBackPress", this.backAction);
      this.ProfileImageGet();
      this.props.BGImageAction(ACToken);
      this.props.ProfileDetailsAction();
    });
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
    this.ProfileImageGet();
    const name = await AsyncStorage.getItem("name");

    // this.setState({ name, email });
    this.setState({ name });
  }
  ProfileImageGet = async () => {
    const ProIMG = await AsyncStorage.getItem("ProfileImage");
    this.setState({ ProfileImageset: JSON.parse(ProIMG) });
  };

  render() {
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
          <View style={[InnerStyle.HeaderMainStyle]}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                resizeMode="contain"
                source={IMAGE.LeftSideIcon}
                style={InnerStyle.DrawerIconStyle}
              />
            </TouchableOpacity>
            <Text style={InnerStyle.HeaderTitle}>Settings</Text>
            <View style={InnerStyle.BlankSpace}></View>
          </View>
          <View
            style={[
              InnerStyle.ProfileSecoundMainViewStyle,
              {
                backgroundColor:
                  this.state.BG.colour === "#ffffff"
                    ? Colors.White
                    : Colors.DarkBlue,
              },
            ]}
          >
            <ScrollView>
              <View style={SubInnerStyle.secoundViewStyle}>
                <View style={SubInnerStyle.HeaderViewStyle}>
                  <Text
                    style={[
                      SubInnerStyle.FreeTextStyle,
                      {
                        color:
                          this.state.BG.colour === "#ffffff"
                            ? Colors.Black
                            : Colors.White,
                      },
                    ]}
                  >
                    Free Account
                  </Text>
                  <TouchableOpacity
                    style={[
                      SubInnerStyle.BtnGoPremiumViewStyle,
                      {
                        backgroundColor:
                          this.state.BG.colour === "#ffffff"
                            ? Colors.Black
                            : Colors.White,
                      },
                    ]}
                    onPress={() => this.props.navigation.navigate("Purchase")}
                  >
                    <Text
                      style={[
                        SubInnerStyle.BtnTextInviteStyle,
                        {
                          color:
                            this.state.BG.colour === "#ffffff"
                              ? Colors.White
                              : Colors.Black,
                        },
                      ]}
                    >
                      Go Premium
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  {/* <TouchableOpacity> */}
                  <View style={SubInnerStyle.ProfileviewStyle}>
                    <View style={{ flexDirection: "row" }}>
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
                          source={{ uri: this.state.ProfileDetails.image }}
                          style={InnerStyle.ProfileIMG}
                        />
                      )}
                      <View style={SubInnerStyle.ProfileCenterTextViewStyle}>
                        <Text
                          style={[
                            SubInnerStyle.ProfileNameTextStyle,
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
                            SubInnerStyle.ProfileSecoundTextStyle,
                            {
                              color:
                                this.state.BG.colour === "#ffffff"
                                  ? Colors.Black
                                  : Colors.White,
                            },
                          ]}
                        >
                          View Profile
                        </Text>
                      </View>
                    </View>
                    {/* <Image
                                                resizeMode="contain"
                                                source={IMAGE.RigthArrow}
                                                style={SubInnerStyle.RigthArrowIMG}
                                            /> */}
                  </View>
                  {/* </TouchableOpacity> */}
                </View>
                <View style={{ paddingHorizontal: RFValue(5) }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={SubInnerStyle.CommonViewStyle}>
                      <Image
                        resizeMode="contain"
                        source={IMAGE.BellIcon}
                        style={[
                          SubInnerStyle.CommonIMGStyle,
                          {
                            tintColor:
                              this.state.BG.colour === "#ffffff"
                                ? Colors.Black
                                : Colors.White,
                          },
                        ]}
                      />
                      <Text
                        style={[
                          SubInnerStyle.CommonTextStyle,
                          {
                            color:
                              this.state.BG.colour === "#ffffff"
                                ? Colors.Black
                                : Colors.White,
                          },
                        ]}
                      >
                        Notification
                      </Text>
                    </View>
                    <View style={{ alignSelf: "center" }}>
                      <Switch
                        value={this.state.isSwitch}
                        onValueChange={(isSwitch) =>
                          this.setState({ isSwitch })
                        }
                        disabled={false}
                        activeText={"On"}
                        inActiveText={"Off"}
                        circleSize={24}
                        barHeight={26}
                        circleBorderWidth={1}
                        backgroundActive={"green"}
                        backgroundInactive={
                          this.state.BG.colour === "#ffffff"
                            ? Colors.Grey
                            : Colors.White
                        }
                        circleActiveColor={"#30a566"}
                        circleInActiveColor={
                          this.state.BG.colour === "#ffffff"
                            ? Colors.Black
                            : Colors.White
                        }
                        changeValueImmediately={true}
                        innerCircleStyle={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        outerCircleStyle={{}}
                        renderActiveText={false}
                        renderInActiveText={false}
                        switchLeftPx={2.5}
                        switchRightPx={2.5}
                        switchWidthMultiplier={2}
                        switchBorderRadius={30}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      InnerStyle.horozontalLine,
                      {
                        backgroundColor: Colors.LineGrey,
                        marginVertical: RFPercentage(0),
                        width: windowWidth,
                        height: 0.5,
                        alignSelf: "center",
                      },
                    ]}
                  />
                  <View
                    style={[
                      InnerStyle.horozontalLine,
                      {
                        backgroundColor: Colors.LineGrey,
                        marginVertical: RFPercentage(0),
                        width: windowWidth,
                        height: 0.5,
                        alignSelf: "center",
                      },
                    ]}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Web_PrivacyPolicy")
                    }
                  >
                    <View style={SubInnerStyle.CommonViewStyle}>
                      <Image
                        resizeMode="contain"
                        source={IMAGE.LockIcon}
                        style={[
                          SubInnerStyle.CommonIMGStyle,
                          {
                            tintColor:
                              this.state.BG.colour === "#ffffff"
                                ? Colors.Black
                                : Colors.White,
                          },
                        ]}
                      />
                      <Text
                        style={[
                          SubInnerStyle.CommonTextStyle,
                          {
                            color:
                              this.state.BG.colour === "#ffffff"
                                ? Colors.Black
                                : Colors.White,
                          },
                        ]}
                      >
                        Privacy Policy
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View
                    style={[
                      InnerStyle.horozontalLine,
                      {
                        backgroundColor: Colors.LineGrey,
                        marginVertical: RFPercentage(0),
                        width: windowWidth,
                        height: 0.5,
                        alignSelf: "center",
                      },
                    ]}
                  />

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Web_View_Com")
                    }
                  >
                    <View style={SubInnerStyle.CommonViewStyle}>
                      <Image
                        resizeMode="contain"
                        source={IMAGE.HelpIcon}
                        style={[
                          SubInnerStyle.CommonIMGStyle,
                          {
                            tintColor:
                              this.state.BG.colour === "#ffffff"
                                ? Colors.Black
                                : Colors.White,
                          },
                        ]}
                      />
                      <Text
                        style={[
                          SubInnerStyle.CommonTextStyle,
                          {
                            color:
                              this.state.BG.colour === "#ffffff"
                                ? Colors.Black
                                : Colors.White,
                          },
                        ]}
                      >
                        Help
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={[
                      InnerStyle.horozontalLine,
                      {
                        backgroundColor: Colors.LineGrey,
                        marginVertical: RFPercentage(0),
                        width: windowWidth,
                        height: 0.5,
                        alignSelf: "center",
                      },
                    ]}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Web_View_Com")
                    }
                  >
                    <View style={SubInnerStyle.CommonViewStyle}>
                      <Image
                        resizeMode="contain"
                        source={IMAGE.InfoIcon}
                        style={[
                          SubInnerStyle.CommonIMGStyle,
                          {
                            tintColor:
                              this.state.BG.colour === "#ffffff"
                                ? Colors.Black
                                : Colors.White,
                          },
                        ]}
                      />
                      <Text
                        style={[
                          SubInnerStyle.CommonTextStyle,
                          {
                            color:
                              this.state.BG.colour === "#ffffff"
                                ? Colors.Black
                                : Colors.White,
                          },
                        ]}
                      >
                        About
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={[
                      InnerStyle.horozontalLine,
                      {
                        backgroundColor: Colors.LineGrey,
                        marginVertical: RFPercentage(0),
                        width: windowWidth,
                        height: 0.5,
                        alignSelf: "center",
                      },
                    ]}
                  />
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
  return {
    BGImage: state.BGImage,
    ProfileDetails: state.ProfileDetails,
  };
};

export default connect(mapStateToProps, {
  BGImageAction,
  ProfileDetailsAction,
})(Setting);
