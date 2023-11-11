import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  Animated,
  ScrollView,
  ImageBackground,
  BackHandler,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Colors from "../../common/colors";
import { Easing, Keyframe } from "react-native-reanimated";
import * as IMAGE from "../../common/Image";
import * as Fonts from "../../common/Fonts";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { InnerStyle } from "./InnerStyle";

import Modal from "react-native-modal";
import { AuthStyle } from "../Auth/AuthStyle";
import { useNavigation } from "@react-navigation/native";
import Videoplayer from "./VideoPlayer";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import ModalComponents from "./ModalComponents";
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

import Orientation, {
  useOrientationChange,
  useDeviceOrientationChange,
  useLockListener,
} from "react-native-orientation-locker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { SubCateGoryAction } from "../../redux/action";
import Video from "react-native-video";

const { width, height } = Dimensions.get("window");

const win = Dimensions.get("window");
const ratio = win.width / 535; //541 is actual image width

const url =
  "https://drive.google.com/uc?export=download&id=1YNLyUv43xyARciiuCTzmR8WoUut3oE4X";
const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${"pdf"}`;

const options = {
  fromUrl: url,
  toFile: localFile,
};

onDownloadImagePress = () => {
  RNFS.downloadFile(options)
    .promise.then(() => FileViewer.open(localFile))
    .then(() => {
      // success
    })
    .catch((error) => {
      // error
    });
};
const CommonCategory = () => {
  const route = useRoute();
  const source = require("../../assets/pdf/Simple.pdf"); // ios only
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfView, setPdfView] = useState(false);
  const [ApiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setLocked] = useState();
  const [CompairData, setCompairData] = useState([]);
  const [selectdata, setSelectData] = useState();
  const [id, setId] = useState(0);
  const [rouImage, setRouImage] = useState("");
  const [BGColor, setBGColor] = useState("");
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  function checkLocked() {
    const locked = Orientation.isLocked();
    if (locked !== isLocked) {
      setLocked(locked);
    }
  }
  useEffect(() => {
    checkLocked();

    if (modalVisible == false) {
      Orientation.lockToPortrait();
    }
  }, []);
  const [deviceOrientation, setDeviceOrientation] = useState();
  useDeviceOrientationChange((o) => {
    setDeviceOrientation(o);
  });

  function handleBackButtonClick() {
    // setModalVisible(false)
    navigation.goBack();
    return true;
  }

  const VideListHandle = (element, index) => {
    if (index < 2) {
      // setModalVisible(true);
      navigation.navigate("Topic", {
        element,
      });
      setSelectData(element);
      console.log("element", selectdata);
    } else {
      Alert.alert("You have to Purchase plan to have Full Access", "", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            navigation.goBack(),
              navigation.navigate("MainStack", {
                screen: "Purchase",
              });
          },
        },
      ]);
    }
  };

  // const onBuffer = (e) => {
  //   console.log("BufferError", e);
  // };
  // const videoError = (e) => {
  //   console.log("VideoError", e);
  // };

  const SubCategoryData = useSelector((state) => state.SubCategory);

  useEffect(() => {
    const Mainid = route.params.item.id;
    dispatch(SubCateGoryAction({ category_id: Mainid }));
    const RImage = route.params.item.background;
    const RColour = route.params.item.colour;
    setRouImage(RImage);
    setBGColor(RColour);
    return () => {
      dispatch(SubCateGoryAction());
    };
  }, []);

  useEffect(() => {
    if (SubCategoryData?.SubCategorySuccess) {
      if (SubCategoryData?.data) {
        const CommonData = SubCategoryData.data.data;
        setApiData(CommonData);
        setIsLoading(false);
      }
    }
  }, [SubCategoryData]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  const renderData = () => {
    if (ApiData == "") {
      null;
    } else {
      return ApiData?.map((element, index) => {
        const ShortText = element.description.substring(0, 83);
        const SText = ShortText.concat("...");
        return (
          <TouchableOpacity
            style={{
              // justifyContent: "space-around",
              backgroundColor: "rgb(238,238,238)",
              // height:'23%',
              height: RFPercentage(18),
              borderRadius: RFPercentage(1.5),
              marginVertical: RFPercentage(1),
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 2,
              shadowOpacity: 0.3,
              elevation: 3,
              justifyContent: "space-around",
            }}
            onPress={() => {
              VideListHandle(element, index);
            }}
          >
            <View
              style={[
                InnerStyle.VideoCard_SubContainer,
                { borderColor: "#CBCFE1" },
              ]}
            >
              {index < 2 ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: windowWidth / 2,
                        justifyContent: "space-around",
                      }}
                    >
                      <Text
                        style={[
                          InnerStyle.VC_TitileText,
                          { color: Colors.Black },
                        ]}
                        numberOfLines={2}
                      >
                        {element.name}
                      </Text>
                      <Text
                        numberOfLines={3}
                        style={{
                          paddingVertical: RFPercentage(1),
                          fontFamily: Fonts.Medium,
                          fontSize: RFValue(11),
                          color: Colors.Black,
                        }}
                      >
                        {SText}
                      </Text>
                    </View>
                    {/* <View>
                      <Text>{element.status}</Text>
                    </View> */}
                  </View>
                  <View>
                    <Image
                      source={
                        isLoading
                          ? IMAGE.DummyImage
                          : element.subcategory_thumb_img == null
                          ? IMAGE.DummyImage
                          : { uri: element?.subcategory_thumb_img }
                      }
                      style={InnerStyle.VC_Image}
                    />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <View
                      style={{
                        // backgroundColor: "red",
                        flexDirection: "column",
                        width: windowWidth / 2,
                      }}
                    >
                      <Text
                        style={[
                          InnerStyle.VC_TitileText,
                          { color: Colors.Black },
                        ]}
                        numberOfLines={2}
                      >
                        {element.name}
                      </Text>
                      <Text
                        numberOfLines={3}
                        style={{
                          paddingVertical: RFPercentage(1),
                          fontFamily: Fonts.Medium,
                          fontSize: RFValue(11),
                          color: Colors.Black,
                        }}
                      >
                        {SText}
                      </Text>
                    </View>
                    {/* <View>
                      <Text>{element.status}</Text>
                    </View> */}
                  </View>
                  <View>
                    <Image
                      source={
                        isLoading
                          ? IMAGE.DummyImage
                          : element.subcategory_thumb_img == null
                          ? IMAGE.DummyImage
                          : { uri: element?.subcategory_thumb_img }
                      }
                      style={InnerStyle.VC_Image}
                    />
                  </View>
                </View>
              )}
            </View>
            <View
              style={{
                // backgroundColor:'red',
                paddingBottom: RFPercentage(1),
                paddingHorizontal: RFValue(14),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    // alignSelf: "flex-start",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    // backgroundColor:'blue',
                    width: "30%",
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={index < 2 ? IMAGE.Play : IMAGE.LockVideoIcon}
                    style={[
                      InnerStyle.VC_PlayImage,
                      {
                        tintColor: Colors.Black,
                        height: RFValue(16),
                        width: RFValue(14),
                      },
                    ]}
                  />
                  <Text
                    style={{
                      color: Colors.Black,
                      fontFamily: Fonts.SemiBold,
                      fontSize: RFValue(12),
                    }}
                  >
                    10 minutes
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "30%",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: Colors.White,
                      height: RFValue(10),
                      width: RFValue(10),
                      borderRadius: RFValue(10),
                    }}
                  ></View>
                  <Text
                    style={{
                      color: Colors.Black,
                      fontFamily: Fonts.SemiBold,
                      fontSize: RFValue(11),
                    }}
                  >
                    Noura Al Ali
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    }
  };

  return (
    <>
      {/* <View style={{ flex: 1,}}>
        <Video
          repeat={true}
          source={require("../../assets/Video/Demo2.mp4")} // Can be a URL or a local file.
          ref={videoRef} // Store reference
          resizeMode="cover"
          onBuffer={onBuffer} // Callback when remote video is buffering
          onError={videoError} // Callback when video cannot be loaded
          style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
          // style={styles.backgroundVideo}
        />
      </View> */}
      <View
        style={[
          InnerStyle.RelationShipScreen_Header,
          // { position: "absolute", width: windowWidth, height: windowHeight },
        ]}
      >
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <ImageBackground
            resizeMode={Platform.OS == "android" ? "stretch" : "stretch"}
            source={{ uri: rouImage }}
            style={[
              InnerStyle.RelatatioShip_Background,
              {
                width: Platform.OS == "android" ? win.width : win.width,
                height: Platform.OS == "android" ? 260 * ratio : 290 * ratio,
                // position:"absolute",
              },
            ]}
          >
            {/* { */}
            {/* !this.state.video ? */}
            <View style={InnerStyle.HeaderMainStyle}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  resizeMode="contain"
                  source={IMAGE.LeftSideIcon}
                  style={InnerStyle.DrawerIconStyle}
                />
              </TouchableOpacity>

              {/* <View style={InnerStyle.BlankSpace}></View> */}
            </View>
            <View
              style={{
                flex: 0.8,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Text
                style={[InnerStyle.HeaderTitle, { textTransform: "uppercase" }]}
              >
                {route.params.item.name}
              </Text>
            </View>
            {/* <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onSwipeComplete={() => {
            Orientation.lockToPortrait();
            setModalVisible(false);
          }}
          onRequestClose={() => setModalVisible(false)}
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
          <View style={{ height: windowHeight ,}}>
            <ModalComponents data={selectdata} />
          </View>
        </Modal> */}
          </ImageBackground>
          <View
            style={[
              InnerStyle.VideoCard_MainContainer,
              { backgroundColor: BGColor, height: windowHeight },
            ]}
          >
            {ApiData == "" ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: BGColor,
                }}
              >
                <Text style={{ color: Colors.Black, fontFamily: Fonts.Bold }}>
                  No Data
                </Text>
              </View>
            ) : (
              <View>{isFocused ? renderData() : null}</View>
            )}
          </View>
        </ScrollView>
      </View>
      {/* </View> */}
      {isLoading ? (
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
            style={{
              position: "absolute",
              top: height / 1.8,
              left: width / 2.2,
            }}
            size={"large"}
          />
        </View>
      ) : undefined}
    </>
  );
};

export default CommonCategory;
