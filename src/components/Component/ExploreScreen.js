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

import Orientation, {
  useOrientationChange,
  useDeviceOrientationChange,
  useLockListener,
} from "react-native-orientation-locker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const win = Dimensions.get("window");
const ratio = win.width / 535; //541 is actual image width

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { ExploreAction } from "../../redux/action";

const { width, height } = Dimensions.get("window");

const ExploreScreen = () => {
  const route = useRoute();
  const source = require("../../assets/pdf/Simple.pdf"); // ios only
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfView, setPdfView] = useState(false);
  const [ApiData, setApiData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setLocked] = useState();
  const [subData, setSubData] = useState([]);
  const [backgroundImage, setBackGroundImage] = useState("");
  const [backgroundColor, setBackGroundColor] = useState("");
  const [eleid, setEleID] = useState(0);
  const [mediaAPidata, setMediaAPiData] = useState([]);
  const [id, setId] = useState(0);
  const [selectExploreData, setSelectExploreData] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  function checkLocked() {
    const locked = Orientation.isLocked();
    if (locked !== isLocked) {
      setLocked(locked);
    }
  }

  useEffect(() => {
    const BGImage = route.params.element.background;
    const BGColor = route.params.element.colour;
    const ID = route.params.element.id;
    setEleID(ID);
    setBackGroundImage(BGImage);
    setBackGroundColor(BGColor);
  });

  const modalhandle = (element , index) => {
    if(index < 2){
      setSelectExploreData(element);
      console.log("SelectedElementData", element);
      setModalVisible(true);
    }else{
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

  const ExploreData = useSelector((state) => state.ExploreTopic);

  useEffect(() => {
    dispatch(ExploreAction());
  }, []);
  useEffect(() => {
    if (ExploreData.ExploreTopicSuccess) {
      if (ExploreData?.data) {
        if (ExploreData?.data?.data?.subcategory) {
          const SubAPiData = ExploreData?.data?.data?.subcategory;
          setSubData(SubAPiData);
          setIsLoading(false);
        }
      }
      if (ExploreData?.data?.data) {
        if (ExploreData?.data?.data?.media) {
          const mediaData = ExploreData?.data?.data.media;
          setMediaAPiData(mediaData);
          // mediaData.map((element , index)=>{
          //   console.log('SubId',)
          //   setMedia(element)
          // })
        }
      }
    }
  });

  const renderData = () => {
    return subData?.map((element, index) => {
      if (element?.category_id == eleid) {
        return (
          <TouchableOpacity
              style={InnerStyle.VideoCard_SubContainer}
              onPress={() => {
                modalhandle(element, index);
              }}
            >
              {index < 2 ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        width: windowWidth / 2.5,
                      }}
                    >
                      <Text
                        numberOfLines={3}
                        style={{ justifyContent: "flex-start" }}
                      >
                        <Image
                          source={IMAGE.Play_1}
                          style={[
                            InnerStyle.VC_PlayImage,
                            {
                              tintColor: Colors.Black,
                              alignSelf: "center",
                            },
                          ]}
                        />
                        <Text
                          style={[
                            InnerStyle.VC_TitileText,
                            { color: Colors.Black },
                          ]}
                        >
                          {element.name}
                        </Text>
                      </Text>
                    </View>
                    {/* <View>
                      <Text>{element.status}</Text>
                    </View> */}
                  </View>

                  <View>
                    <Image
                      source={element.subcategory_thumb_img == null ? IMAGE.DummyImage : { uri: element?.subcategory_thumb_img }}
                      style={InnerStyle.VC_Image}
                    />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <View>
                    <View
                      style={{
                        // backgroundColor: "red",
                        flexDirection: "row",
                        width: windowWidth / 2.5,
                      }}
                    >
                      <Text numberOfLines={4}>
                        <Image
                          source={IMAGE.lock}
                          style={[
                            InnerStyle.VC_PlayImage,
                            {
                              tintColor: Colors.Black,
                              height: RFPercentage(2),
                              width: RFPercentage(2),
                            },
                          ]}
                        />
                        <Text
                          style={[
                            InnerStyle.VC_TitileText,
                            { color: Colors.Black },
                          ]}
                        >
                          {element.name}
                        </Text>
                      </Text>
                    </View>
                    {/* <View>
                      <Text>{element.status}</Text>
                    </View> */}
                  </View>
                  <View>
                    <Image
                      source={element.subcategory_thumb_img == null ? IMAGE.DummyImage : { uri: element?.subcategory_thumb_img }}
                      style={InnerStyle.VC_Image}
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
        );
      }
    });
  };

  return (
    <>
      <View style={InnerStyle.RelationShipScreen_Header}>
        <ImageBackground
          resizeMode={Platform.OS == "android" ? "stretch" : "stretch"}
          source={{ uri: backgroundImage }}
          style={[
            InnerStyle.RelatatioShip_Background,
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
          {/* { */}
          {/* !this.state.video ? */}
          <View style={InnerStyle.HeaderMainStyle}>
            <TouchableOpacity onPress={() => navigation.navigate("Explore")}>
              <Image
                resizeMode="contain"
                source={IMAGE.LeftSideIcon}
                style={InnerStyle.DrawerIconStyle}
              />
            </TouchableOpacity>
            <Text style={InnerStyle.HeaderTitle}>
              {route.params.element.name}
            </Text>
            <View style={InnerStyle.BlankSpace}></View>
          </View>
          {/* <View style={InnerStyle.HeaderViewStyle}>
            <TouchableOpacity >
              <Image
                resizeMode="contain"
                source={IMAGE.LeftSideIcon}
                style={InnerStyle.DrawerIconStyle}
              />
            </TouchableOpacity>
            <View style={InnerStyle.TextViewStyle}>
              <Text
                style={[InnerStyle.HeaderTextStyle, { fontSize: RFValue(18) }]}
              >
                {route.params.element.name}
              </Text>
            </View>
          </View> */}
          <Modal
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
            <View style={{ height: windowHeight / 1 }}>
              <ModalComponents ExploreData={selectExploreData} />
            </View>
          </Modal>
        </ImageBackground>

        <ScrollView
          style={[
            InnerStyle.VideoCard_MainContainer,
            { backgroundColor: backgroundColor },
          ]}
        >
          {subData.length != 0 ? renderData() : null}
        </ScrollView>
      </View>
      {isLoading ? (
        <View style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}>
        <ActivityIndicator
          color={"black"}
          style={{ position: "absolute", top: height / 2, left: width / 2.2 }}
          size={"large"}
        />
        </View>
      ) : undefined}
    </>
  );
};

export default ExploreScreen;
