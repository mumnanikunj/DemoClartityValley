import React, { Component } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { InnerStyle } from "../Component/InnerStyle";

import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CheckPermissionsAudio,
  checkMedia,
  checkCamera,
} from "../SubComponent/AppPermission";

import * as Colors from "../../common/colors";
import * as Fonts from "../../common/Fonts";
import * as IMAGE from "../../common/Image";
import DateTimePicker from "react-native-modal-datetime-picker";

import { connect } from "react-redux";
import {
  EditProfileAction,
  BGImageAction,
  ProfileDetailsAction,
} from "../../redux/action";
import moment from "moment";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const { width, height } = Dimensions.get("window");

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: "",
      phone: "",
      BirthDate: moment().format("Y-M-D"),
      Response: "",
      ProfileImageset: null,
      modalVisible: false,
      SelectDate: moment().format("Y-M-D"),
      isLoading: true,
      BG: "",
      ProfileDetails: [],
      checkUpdateProfile: false,
      imageChanged: false,
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
        console.log("EditProfile", profileData);
        this.setState({ ProfileDetails: profileData });
        this.setState({ editName: nextProps.ProfileDetails.data.data[0].name });
        this.setState({ phone: nextProps.ProfileDetails.data.data[0].phone });
        this.setState({ BirthDate: nextProps.ProfileDetails.data.data[0].age });
        this.setState({
          ProfileImageset: nextProps.ProfileDetails.data.data[0].image,
        });
        this.setState({ isLoading: false });
      }
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  close = async () => {
    this.setState({ modalVisible: false });
  };

  backAction = () => {
    this.props.navigation.goBack(null);
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }

  async componentDidMount() {
    var image;
    this.props.navigation.addListener("focus", async () => {
      BackHandler.addEventListener("hardwareBackPress", this.backAction);
      const ACToken = await AsyncStorage.getItem("AccessToken");
      this.props.BGImageAction(ACToken);
      this.props.ProfileDetailsAction();
      this.props.EditProfileAction();

      CheckPermissionsAudio();
      checkMedia();
      checkCamera();
      this.ProfileImageGet();
    });
  }
  ProfileImageGet = async () => {
    const ProIMG = await AsyncStorage.getItem("ProfileImage");
    // this.setState({ ProfileImageset: JSON.parse(ProIMG) });
  };

  Selectcamera = async () => {
    ImagePicker.openCamera({
      width: 400,
      height: 500,
      cropping: true,
    }).then((image) => {
      console.log("image patyh", image);
      this.setState({ ProfileImageset: image.path, imageChanged: true });

      // this.setState({ ProfileImageset: image.path }, () => {
      //   AsyncStorage.setItem(
      //     "ProfileImage",
      //     JSON.stringify(this.state.ProfileImageset)
      //   );
      //   this.close();
      //   console.log("statesetpathimage", this.state.ProfileImageset);
      // });
    });
  };

  Selectgallery = async () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    }).then((image) => {
      console.log("image patyh", image);
      this.setState({ ProfileImageset: image.path, imageChanged: true });
      // this.setState({ ProfileImageset: image.path }, () => {
      //   AsyncStorage.setItem(
      //     "ProfileImage",
      //     JSON.stringify(this.state.ProfileImageset)
      //   );
      //   this.close();
      //   console.log("statesetpathimage", this.state.ProfileImageset);
      // });
    });
  };

  UpdateProfile = async () => {
    if (this.state.ProfileImageset == null) {
      alert("Please Set Profile Photo");
    } else if (this.state.editName == "") {
      alert("Please Enter Your Name");
    } else if (this.state.phone == "") {
      alert("Please Enter Your Mobile Number");
    } else if (this.state.BirthDate == "") {
      alert("Please Enter Your Birth Of Date");
    } else {
      const PImage = await AsyncStorage.getItem("ProfileImage");

      if (this.state.imageChanged) {
        this.props.EditProfileAction({
          name: this.state.editName,
          phone: this.state.phone,
          age: this.state.SelectDate,
          image: this.state.ProfileImageset,
        });
      } else {
        this.props.EditProfileAction({
          name: this.state.editName,
          phone: this.state.phone,
          age: this.state.SelectDate,
        });
      }

      this.props.navigation.goBack();
    }
  };

  render() {
    const showDatepicker = () => {
      this.setState({ DatepickerVisible: true });
    };
    const hideDatePicker = () => {
      this.setState({ DatepickerVisible: false });
    };
    const handleConfirm = (date) => {
      console.log("A Date has been picked", date);
      hideDatePicker();
      this.setState({ SelectDate: moment(date).format("Y-M-D") }, () => {
        console.log("setdateinState :", this.state.SelectDate);
      });
    };

    return (
      <View>
        <ImageBackground
          //  resizeMode="contain"
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
            <Text style={InnerStyle.HeaderTitle}>Edit Profile</Text>
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
            <View style={InnerStyle.SecoundInnerViewStyle}>
              {this.state.ProfileImageset == "" ||
              this.state.ProfileImageset == null ? (
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
                    uri: this.state.ProfileImageset,
                    // uri: this.state.Image,
                    // uri: `https://app.clarityvalley.com/public/users_image/${this.state.ProfileImageset}`,
                  }}
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
              )}
            </View>
            <Modal
              visible={this.state.modalVisible}
              transparent
              animationType="slide"
              onSwipeComplete={this.close}
              useNativeDriver={true}
              backdropColor={"transparent"}
              useNativeDriverForBackdrop
              swipeDirection={["slide"]}
              style={{
                // margin: 10,
                justifyContent: Platform.OS === "ios" ? "flex-end" : "flex-end",
              }}
            >
              <TouchableWithoutFeedback
                accessible={false}
                onPress={() => Keyboard.dismiss()}
              >
                <View style={{}}>
                  <View
                    style={{
                      height: windowHeight / 10,
                      marginVertical: RFPercentage(1),
                      backgroundColor: Colors.White,
                      justifyContent: "space-around",
                      borderRadius: RFPercentage(1),
                      borderWidth: 1,
                      borderColor: "rgb(230,227,224)",
                    }}
                  >
                    <TouchableOpacity
                      style={{ paddingVertical: RFPercentage(1.6) }}
                      onPress={() => this.Selectcamera()}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          fontFamily: Fonts.Bold,
                          color: Colors.AvatarColorText,
                        }}
                      >
                        Take Photo
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderBottomColor: Colors.DarkBlue,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                      }}
                    />
                    <TouchableOpacity
                      style={{ paddingVertical: RFPercentage(1.6) }}
                      onPress={() => this.Selectgallery()}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          fontFamily: Fonts.Bold,
                          color: Colors.AvatarColorText,
                        }}
                      >
                        {Platform.OS === "android"
                          ? "Choose Photo From Gallery"
                          : "Choose From Library..."}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.White,
                      borderWidth: 1,
                      borderColor: "rgb(230,227,224)",
                      justifyContent: "center",
                      paddingVertical: RFPercentage(1.6),
                      borderRadius: RFPercentage(1),
                    }}
                    onPress={() => this.close()}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        fontFamily: Fonts.Bold,
                        color: Colors.AvatarColorText,
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            <TouchableOpacity
              onPress={() => this.setModalVisible()}
              style={{ alignSelf: "center" }}
            >
              <Text
                style={[
                  InnerStyle.ChangeImageTextStyle,
                  {
                    color:
                      this.state.BG.colour === "#ffffff"
                        ? Colors.Black
                        : Colors.White,
                  },
                ]}
              >
                Change Avatar
              </Text>
            </TouchableOpacity>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              enableOnAndroid={true}
            >
              <View style={InnerStyle.TextInputViewStyle}>
                <Text
                  style={[
                    InnerStyle.staticTextStyle,
                    {
                      color:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Black
                          : Colors.White,
                    },
                  ]}
                >
                  UserName
                </Text>
                <TextInput
                  placeholder="Enter Your Name"
                  style={InnerStyle.TextinputStyle}
                  placeholderTextColor={"grey"}
                  maxLength={30}
                  value={this.state.editName}
                  onChangeText={(V) => this.setState({ editName: V })}
                />
                <View
                  style={[
                    InnerStyle.horozontalLine,
                    {
                      marginVertical:
                        Platform.OS === "ios" ? RFPercentage(1) : 0,
                      backgroundColor:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Black
                          : Colors.White,
                    },
                  ]}
                />
              </View>
              <View style={InnerStyle.TextInputViewStyle}>
                <Text
                  style={[
                    InnerStyle.staticTextStyle,
                    {
                      color:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Black
                          : Colors.White,
                    },
                  ]}
                >
                  Your Phone
                </Text>
                <TextInput
                  placeholder="Enter Your Mobile No"
                  style={InnerStyle.TextinputStyle}
                  placeholderTextColor={"grey"}
                  keyboardType={"phone-pad"}
                  maxLength={10}
                  value={this.state.phone}
                  onChangeText={(V) => this.setState({ phone: V.trim() })}
                />
                <View
                  style={[
                    InnerStyle.horozontalLine,
                    {
                      marginVertical:
                        Platform.OS === "ios" ? RFPercentage(1) : 0,
                      backgroundColor:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Black
                          : Colors.White,
                    },
                  ]}
                />
              </View>
              <View style={InnerStyle.TextInputViewStyle}>
                <Text
                  style={[
                    InnerStyle.staticTextStyle,
                    {
                      color:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Black
                          : Colors.White,
                    },
                  ]}
                >
                  Your Birth Of Date
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TextInput
                    placeholder="Select BirthDate"
                    style={[
                      InnerStyle.TextinputStyle,
                      {
                        color:
                          this.state.BG.colour === "#ffffff"
                            ? Colors.Black
                            : Colors.White,
                      },
                    ]}
                    placeholderTextColor={"grey"}
                    keyboardType={"decimal-pad"}
                    maxLength={10}
                    value={this.state.SelectDate}
                    onChangeText={(V) => this.setState({ SelectDate: V })}
                  />
                  <TouchableOpacity onPress={showDatepicker}>
                    <Text
                      style={{
                        color:
                          this.state.BG.colour === "#ffffff"
                            ? Colors.Black
                            : Colors.White,
                        fontFamily: Fonts.SemiBold,
                        fontSize: RFValue(12),
                      }}
                    >
                      Select Date
                    </Text>
                  </TouchableOpacity>
                  <DateTimePicker
                    isVisible={this.state.DatepickerVisible}
                    mode="date"
                    format={"Y-M-D"}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    // minimumDate={this.state.date}
                    value={this.state.date}
                    onChange={(date) => {
                      this.setState({ SelectDate: date });
                    }}
                  />
                </View>
                <View
                  style={[
                    InnerStyle.horozontalLine,
                    {
                      marginVertical:
                        Platform.OS === "ios" ? RFPercentage(1) : 0,
                      backgroundColor:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Black
                          : Colors.White,
                    },
                  ]}
                />
              </View>
              <TouchableOpacity
                style={InnerStyle.BtnTouchStyle}
                onPress={() => {
                  this.UpdateProfile();
                }}
              >
                <Text style={[InnerStyle.BtnInnerStyle, {}]}>UPDATE</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    EditProfile: state.EditProfile,
    BGImage: state.BGImage,
    ProfileDetails: state.ProfileDetails,
  };
};
export default connect(mapStateToProps, {
  EditProfileAction,
  BGImageAction,
  ProfileDetailsAction,
})(EditProfile);
