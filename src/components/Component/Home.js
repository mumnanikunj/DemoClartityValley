import React, { Component } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
  FlatList,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from "../../common/colors";
import * as Fonts from "../../common/Fonts";
import * as IMAGE from "../../common/Image";
import { InnerStyle } from "./InnerStyle";
import Modal from "react-native-modal";
// import { global } from "../../../global";
import { CheckPermissionsAudio } from "../SubComponent/AppPermission";

import { connect } from "react-redux";
import {
  GetCateGoryAction,
  BGImageAction,
  RecoMediaAction,
} from "../../redux/action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainerRefContext } from "@react-navigation/native";
import ModalComponents from "./ModalComponents";
import Orientation, {
  useOrientationChange,
  useDeviceOrientationChange,
  useLockListener,
  LANDSCAPE_RIGHT,
  PORTRAIT,
  PORTRAIT_UPSIDE_DOWN,
} from "react-native-orientation-locker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const win = Dimensions.get("window");
const ratio = win.width / 535; //541 is actual image width

const { width, height } = Dimensions.get("window");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      isLoading: true,
      imgloading: true,
      modalVisible: false,
      MostSelectedData: [],
      ApiDataRes: [],
      RecoData: [],
      UserName: "",
      BG: "",
      // BGImage: "",
      // BGColour: "",
      ExtraData: [
        {
          IMG: require("../../assets/images/ImageTest1.webp"),
          Title: "Anxiety",
        },
        {
          IMG: require("../../assets/images/ImageTest2.jpeg"),
          Title: "Meditation",
        },
        {
          IMG: require("../../assets/images/ImageTest3.jpeg"),
          Title: "Sleep problems",
        },
      ],
    };
  }

  //  componentWillMount(nextProps){
  //   if (nextProps?.BGImage) {
  //     this.setState({ isLoading: true });
  //     if (nextProps.BGImage.BGImageSuccess) {
  //       if (nextProps.BGImage.data) {
  //         const Image = nextProps.BGImage.data.data[0].image;
  //         // console.log('BGColour',Image)
  //         const BgColor = nextProps.BGImage.data.data[0].colour
  //         this.setState({ BGImage: Image });
  //         this.setState({BGColour : BgColor})
  //         // AsyncStorage.setItem("BGImage", JSON.stringify(Image));
  //         this.setState({ isLoading: false });
  //       }
  //     }
  //   }
  // }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps?.Category) {
      if (nextProps?.Category?.GetCategorySuccess) {
        this.setState({ isLoading: true });
        if (nextProps?.Category?.data) {
          var DT = JSON.stringify(nextProps.Category.data);
          let temp = JSON.parse(DT);
          this.setState({ ApiDataRes: temp.data }, () => {
            if (this.state.ApiDataRes.length > 0) {
              this.setState({ isLoading: false });
            } else {
              this.setState({ isLoading: true });
            }
          });
        }
      }
    }
    if (nextProps?.BGImage) {
      this.setState({ isLoading: true });
      if (nextProps.BGImage.BGImageSuccess) {
        if (nextProps.BGImage.data) {
          const BGI = nextProps.BGImage.data.data;
          const found = BGI.find((obj) => {
            return obj.name === "Home";
          });
          this.setState({ BG: found });
        }
      }
    }
    if (nextProps?.RecoMedia) {
      this.setState({ isLoading: true });
      if (nextProps?.RecoMedia?.RecommendedSuccess) {
        if (nextProps?.RecoMedia?.data) {
          const RecoMediaApiData = nextProps.RecoMedia.data.data;
          this.setState({ RecoData: RecoMediaApiData });
          this.setState({ isLoading: false });
        }
      }
    }
  }

  backAction = () => {
    BackHandler.exitApp();
    return true;
  };
  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
    CheckPermissionsAudio();
    // this.setState({isLoading : false})
    const ACToken = await AsyncStorage.getItem("AccessToken");
    this.props.GetCateGoryAction(ACToken);
    this.props.BGImageAction(ACToken);
    this.props.RecoMediaAction(ACToken);
    const UserName = await AsyncStorage.getItem("UserName");
    this.setState({ UserName: UserName });
    // this.HomeCataGory()
    // const BGI = await AsyncStorage.getItem("BGImage");
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }

  ModalHandle = (element) => {
    this.setState({ modalVisible: true });
    this.setState({ MostSelectedData: element });
    console.log("MostViewData", this.state.MostSelectedData);
  };

  ModalClose = () => {
    this.setState({ modalVisible: false });
  };

  RenderData = ({ item, index }) => {
    // return this.state?.ApiDataRes?.map((element, index) => {
    return (
      <>
        <View
          style={{
            maxWidth: windowWidth / 2.12,
            alignItems: "center",
            flex: 1,
            paddingVertical: RFPercentage(1),
            // paddingTop:RFPercentage(6),
          }}
          key={index}
        >
          <View style={InnerStyle.InnerMainViewStyle}>
            <TouchableOpacity
              style={InnerStyle.BottonViewStyle}
              onPress={() =>
                this.props.navigation.navigate("CommonCategory", {
                  item,
                })
              }
            >
              <ImageBackground
                // resizeMode="contain"
                onLoadStart={(i) => {
                  this.setState({ imgloading: false });
                }}
                // onLoad={(e) => {
                //   this.setState({ imgloading: false });
                // }}
                style={InnerStyle.ImageContainerStyle}
                imageStyle={{ borderRadius: RFPercentage(1.5) }}
                source={
                  this.state.imgloading
                    ? IMAGE.DummyImage
                    : { uri: item.category_thumb_img }
                }
                onLoadEnd={(i) => this.setState({ imgloading: false })}
              >
                <Text style={InnerStyle.InnerTextStyle}>{item.name}</Text>
                {/* <Image              
                  resizeMode="contain"
                  // source={element.Icon}
                  style={
                    index == 0
                      ? (size = {
                          height: RFPercentage(8),
                          width: RFPercentage(8),
                        })
                      : (size = {
                          height: RFPercentage(5),
                          width: RFPercentage(5),
                        })
                  }
                /> */}
                {this.state.imgloading ? (
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
                      color={"black"}
                      style={{ position: "relative" }}
                      size={"small"}
                    />
                  </View>
                ) : undefined}
                <Text style={InnerStyle.SessionTextStyle}>
                  {/* {element.Sessions}  */}
                  sessions
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
    // });
  };

  ExtraDataRender = () => {
    return this.state.RecoData.map((element, index) => {
      return (
        <View
          style={{
            paddingHorizontal: RFPercentage(1),
            paddingVertical: RFPercentage(2),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              // this.props.navigation.navigate("RBSeetComponent")
              // this.props.navigation.navigate("Meditation");
              // this.ModalHandle(element);
            }}
          >
            <Image
              // resizeMode="contain"
              source={
                this.state.imgloading
                  ? IMAGE.DummyImage
                  : { uri: element.media_thumb_img }
              }
              style={{
                height: RFPercentage(16),
                width: RFPercentage(16),
                borderRadius: RFPercentage(3),
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              paddingVertical: RFPercentage(1),
              alignItems: "center",
              justifyContent: "center",
              width: RFPercentage(16),
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                color: Colors.Black,
                fontFamily: Fonts.SemiBold,
                fontSize: RFValue(10),
              }}
              numberOfLines={1}
            >
              {element.media_title}
            </Text>
          </View>
        </View>
      );
    });
  };

  render() {
    // var BImage = this.state.BGImage;
    return (
      <>
        <ImageBackground
          resizeMode={Platform.OS == "android" ? "stretch" : "cover"}
          // onLoadStart={(e) => {
          //   this.setState({ imgloading: true });
          // }}
          // onLoad={(e) => {
          //   this.setState({ imgloading: false });
          // }}
          // onLoadEnd={(element) => this.setState({ imgloading: false })}
          source={
            this.state.isLoading
              ? IMAGE.HomeImage
              : { uri: this.state.BG.image }
          }
          style={[
            InnerStyle.HeaderImage,
            {
              width: Platform.OS == "android" ? win.width : win.width,
              height: Platform.OS == "android" ? 260 * ratio : 290 * ratio,
            },
          ]}
        >
          <StatusBar
            hidden={false}
            barStyle={"light-content"}
            translucent
            backgroundColor="transparent"
          />
        </ImageBackground>
        <View
          style={[
            InnerStyle.SecoundMainviewStyle,
            { backgroundColor: this.state.BG.colour },
          ]}
        >
          <View
            style={{
              position: "relative",
              flex: 1,
              marginTop:
                Platform.OS === "ios" ? -RFPercentage(30) : -RFPercentage(32),
              height: windowHeight,
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <View style={InnerStyle.SecoundHeaderTitleStyle}>
                <View
                  style={[
                    InnerStyle.HeaderMainStyle,
                    {
                      paddingHorizontal: RFValue(0),
                      marginTop: RFPercentage(3.5),
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}
                  >
                    <Image
                      resizeMode="contain"
                      source={IMAGE.DrawerIcon}
                      style={InnerStyle.DrawerIconStyle}
                    />
                  </TouchableOpacity>
                  {/* <Text style={InnerStyle.HeaderTitle}>Home</Text> */}
                  <View style={InnerStyle.BlankSpace}></View>
                </View>
                <View style={InnerStyle.TextViewStyle}>
                  <Text style={InnerStyle.HeaderTextStyle}>
                    Take a Deep Breath
                  </Text>
                  <Text style={InnerStyle.HeaderChildTextStyle}>
                    Explore our library to find what you need today
                  </Text>
                </View>
                <View style={InnerStyle.HeaderSecoundStyle}>
                  <View style={InnerStyle.ProfileInfoStyle}>
                    <Text style={InnerStyle.WelcomeTextStyle}>
                      Welcome {this.state.UserName}
                    </Text>
                  </View>
                  <View>
                    <Image
                      resizeMode="contain"
                      source={IMAGE.Profile}
                      style={InnerStyle.StaticImageStyle}
                    />
                  </View>
                </View>
                <View style={InnerStyle.SearchViewStyle}>
                  <Image
                    resizeMode="contain"
                    source={IMAGE.SearchIcon}
                    style={InnerStyle.SearchIconStyle}
                  />
                  <TextInput
                    autoCapitalize={Platform.OS === "ios" ? "none" : "off"}
                    autoComplete={Platform.OS === "ios" ? "none" : "off"}
                    style={InnerStyle.TextInputInnerStyle}
                    value={this.state.searchValue}
                    onChangeText={(V) =>
                      this.setState({ searchValue: V.trim() })
                    }
                    placeholder="Search here..."
                    placeholderTextColor={Colors.Black}
                  />
                </View>
              </View>
              {/* <View style={InnerStyle.SectionView}>{this.RenderData()}</View> */}
              <FlatList
                contentContainerStyle={{ flex: 1 }}
                numColumns={2}
                data={this.state.ApiDataRes}
                keyExtractor={(item) => item}
                renderItem={this.RenderData}
              />
              <View>
                <Text
                  style={{ color: Colors.Black, fontFamily: Fonts.SemiBold }}
                >
                  Recommended Collection{" "}
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <View
                    style={{
                      height: windowHeight / 5,
                      flexDirection: "row",
                      marginBottom: RFPercentage(5),
                    }}
                  >
                    {this.ExtraDataRender()}
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
          <Modal
            visible={this.state.modalVisible}
            transparent
            animationType="slide"
            onSwipeComplete={() => {
              Orientation.lockToPortrait();
              this.ModalClose();
            }}
            onRequestClose={() => this.ModalClose()}
            useNativeDriver={true}
            backdropColor={"transparent"}
            useNativeDriverForBackdrop
            statusBarTranslucent
            swipeDirection={"down"}
            propagateSwipe={true}
            style={{
              margin: 0,
            }}
          >
            <View style={{ height: windowHeight / 1 }}>
              <ModalComponents MostView={this.state.MostSelectedData} />
            </View>
          </Modal>
        </View>
        {this.state.isLoading ? (
          <ActivityIndicator
            color={"black"}
            style={{ position: "absolute", top: height / 2, left: width / 2.2 }}
            size={"large"}
          />
        ) : undefined}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Category: state.GetCategory,
    BGImage: state.BGImage,
    RecoMedia: state.RecoMedia,
  };
};
export default connect(mapStateToProps, {
  GetCateGoryAction,
  BGImageAction,
  RecoMediaAction,
})(Home);
