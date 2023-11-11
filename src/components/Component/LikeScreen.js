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
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import * as Colors from "../../common/colors";
import { color, Easing, Keyframe, set } from "react-native-reanimated";
import * as IMAGE from "../../common/Image";
import * as Fonts from "../../common/Fonts";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { InnerStyle } from "./InnerStyle";
import Share from "react-native-share";

import Modal from "react-native-modal";
import { AuthStyle } from "../Auth/AuthStyle";
import { useNavigation } from "@react-navigation/native";
import Videoplayer from "./VideoPlayer";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import ModalComponents from "./ModalComponents";
import { connect } from "react-redux";
import { FavMediaAction, BGImageAction } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { setEnvironmentData } from "worker_threads";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const win = Dimensions.get("window");
const ratio = win.width / 535; //541 is actual image width

export default function LikeScreen() {
  const [data, setData] = useState();
  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [onfocus, setOnfocus] = useState(0);
  const [Vid, setViD] = useState(0);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectfavData, setSelectfavData] = useState("");
  const [favApiData, setFavApiData] = useState("");
  const [like, setLike] = useState(false);
  const [BgImage, setBGImage] = useState("");
  const dispatch = useDispatch();

  const LikeVideoData = [
    {
      Name: "Breathe",
      Disc: "Breathe Lorem ipsum Lorem ipsum Lorem",
      Time: "24",
      CoverImg: require("../../assets/images/icons/Vl_1.webp"),
      Video: require("../../assets/Video/MyMovie20.mov"),
      Type: "Relaxing",
    },
    {
      Name: "Wake Up",
      Disc: "Wake Up Lorem ipsum Lorem ipsum Lorem",
      Time: "5",
      CoverImg: require("../../assets/images/icons/VL_2.jpeg"),
      Type: "Yoga",
      Video: require("../../assets/Video/MyMovie20.mov"),
    },
    {
      Name: "Relax",
      Disc: "Relax Lorem ipsum Lorem ipsum Lorem",
      Time: "12",
      Type: "Calm",
      CoverImg: require("../../assets/images/icons/VL-3.jpeg"),
    },
    {
      Name: "Anxiety",
      Disc: " Anxiety Lorem ipsum Lorem ipsum Lorem",
      Time: "5",
      Type: "Meditation",
      CoverImg: require("../../assets/images/icons/VL_5.jpeg"),
    },
    {
      Name: "Gratitude",
      Disc: "Gratitude Lorem ipsum Lorem ipsum Lorem",
      Time: "10",
      Type: "Relationship",
      CoverImg: require("../../assets/images/PlayIcon.png"),
    },
    {
      Name: "Calm",
      Disc: "Relax Lorem ipsum Lorem ipsum Lorem",
      Time: "12",
      Type: "Calm",
      CoverImg: require("../../assets/images/icons/VL-3.jpeg"),
    },
  ];

  useEffect(() => {
    dispatch(BGImageAction());
  }, []);
  const BGImage = useSelector((state) => state.BGImage);
  useEffect(() => {
    if (BGImage) {
      if (BGImage.BGImageSuccess) {
        const BG = BGImage.data.data;
        const found = BG.find((obj) => {
          return obj.name === "Favourites";
        });
        console.log("BGImage", found);
        setBGImage(found);
      }
    }
  }, [BGImage]);

   React.useEffect(() => {
     const unsubscribe = navigation.addListener('focus',() =>{
      setIsLoading(true)
      dispatch(FavMediaAction());
    })
      return unsubscribe;
    
  }, [navigation]);
  const FavListData = useSelector((state) => state.FavMedia);

  useEffect(() => {
    if (FavListData) {
      if (FavListData.FavMediaListSuccess) {
        favData = FavListData.data.data;        
        setFavApiData(favData);
        setIsLoading(false);
      }
    }
  }, [FavListData]);

  const modalhandle = (element) => {
    setModalVisible(true);
    setSelectfavData(element);
    console.log("FavSelectData", element);
  };

  const VideListHandle = (element) =>{
    navigation.navigate('Topic',{
      element
    })
  }


  // const renderQuotesItem = ({ item, index }) => {
  //     return (
  //         <ImageBackground
  //             source={IMAGE.QuotesCard}
  //             style={InnerStyle.QuotesCardContainer}
  //             imageStyle={InnerStyle.QutoesBorder}
  //         >
  //             <View style={InnerStyle.QuotesCard}>
  //                 <View style={InnerStyle.QuotesView}>
  //                     <Text style={InnerStyle.QuotesText}>{item.quote}</Text>
  //                 </View>
  //                 <View style={InnerStyle.QuotesWriterView}>
  //                     <Text style={InnerStyle.QuotesWriter}>{item.writer}</Text>
  //                 </View>

  //                 <View style={InnerStyle.QShareContainer}>
  //                     <View style={InnerStyle.QShareView}>
  //                         <TouchableOpacity onPress={() => setLike(console.log('index', index))}>
  //                             <Image
  //                                 source={
  //                                     item.Like == true ? IMAGE.lHeart_Icon_fill : IMAGE.lHeart_Icon
  //                                 }
  //                                 style={[
  //                                     InnerStyle.Share_Img,
  //                                     item.Like ? { tintColor: "red" } : null,
  //                                 ]}
  //                             />
  //                         </TouchableOpacity>
  //                         <TouchableOpacity>
  //                             <Image source={IMAGE.Comment_i} style={InnerStyle.Share_Img} />
  //                         </TouchableOpacity>
  //                         <TouchableOpacity>
  //                             <Image source={IMAGE.bookmark} style={InnerStyle.Share_Img} />
  //                         </TouchableOpacity>
  //                         <TouchableOpacity
  //                             onPressIn={() => setId(index)}
  //                             onPress={async () => {
  //                                 onShare();
  //                             }}
  //                         >
  //                             <Image source={IMAGE.share} style={InnerStyle.Share_Img} />
  //                         </TouchableOpacity>
  //                     </View>
  //                 </View>
  //             </View>
  //         </ImageBackground>
  //     )
  // }

  const renderVideoItem = () => {

    if (favApiData == "") {
    } else {
      return favApiData.map((element, index) => {
        const ShortText = element.description.substring(0,83)
        const  SText = ShortText.concat('...')
        return (
          <TouchableOpacity
            style={{
              // justifyContent: "space-around",
              backgroundColor: "rgb(238,238,238)",
              // height:'23%',
              height:RFPercentage(18),
              borderRadius: RFPercentage(1.5),
              marginVertical: RFPercentage(1),              
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 2,
              shadowOpacity: 0.3,
              elevation: 3,
              justifyContent:"space-around",
            }}
            onPress={() => {
              VideListHandle(element, index);
            }}
          >
            <View style={[InnerStyle.VideoCard_SubContainer,{borderColor:'#CBCFE1'}]}>
              {index < 2 ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems:'center',
                  }}
                >
                  <View>
                    <View
                      style={{                        
                        flexDirection: "column",
                        width: windowWidth / 2,       
                        justifyContent:'space-around',                       
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
                    alignItems:'center',
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
      <ImageBackground
        // resizeMode="contain"
        source={isLoading ? IMAGE.HomeImage : { uri: BgImage.image }}
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
        {/* { */}
        {/* !this.state.video ? */}

        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onSwipeComplete={() => setModalVisible(false)}
          onRequestClose={() => setModalVisible(false)}
          useNativeDriver={true}
          backdropColor={"transparent"}
          useNativeDriverForBackdrop
          swipeDirection={"down"}
          propagateSwipe={true}
          style={{
            margin: 0,
          }}
        >
          <ModalComponents fData={selectfavData} />
        </Modal>
      </ImageBackground>
      <View style={{ flex: 2, backgroundColor: BgImage.colour }}>
        <View
          style={{
            flex: 1,
            position: "relative",
            marginTop:
              Platform.OS === "ios" ? -RFPercentage(30) : -RFPercentage(32),
            height: windowHeight,
          }}
        >
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          {/* <View style={InnerStyle.TrendingQuotes}>
                        <Text style={[InnerStyle.TQ_Titile, { fontFamily: Fonts.Bold }]}>Like Quotes :</Text>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={QuoteLikeData}
                            renderItem={renderQuotesItem}
                            keyExtractor={(index) => {
                                index.toString(index);
                            }}
                        />
                    </View> */}
          <View
            style={[
              InnerStyle.TrendingQuotes,
              { height: windowHeight / 1.45, width: windowWidth },
            ]}
          >
            {/* <Text style={[InnerStyle.TQ_Titile, { fontFamily: Fonts.Bold }]}>
              Like Videos :
            </Text> */}

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <View
                style={[
                  InnerStyle.HeaderMainStyle,
                  {
                    marginTop: RFPercentage(1.6),
                    paddingHorizontal: RFValue(0),
                  },
                ]}
              >
                <TouchableOpacity onPress={() => navigation?.openDrawer()}>
                  <Image
                    resizeMode="contain"
                    source={IMAGE.DrawerIcon}
                    style={InnerStyle.DrawerIconStyle}
                  />
                </TouchableOpacity>
                <Text style={InnerStyle.HeaderTitle}>Favourites</Text>
                <View style={InnerStyle.BlankSpace}></View>
              </View>
              {favApiData != "" ? (
                <View
                  style={{
                    // bottom: RFPercentage(2),
                    // flexWrap: "wrap",
                    // flexDirection: "row",
                    // width: windowWidth / 1.1,
                    marginTop:RFPercentage(2),
                    justifyContent: "space-around",

                  }}
                >
                  {renderVideoItem()}
                </View>
              ) : (
                // </ScrollView>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Colors.Black,
                      fontFamily: Fonts.SemiBold,
                      fontSize: RFValue(14),
                    }}
                  >
                    No Data
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
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
          style={{
            position: "absolute",
            top: windowHeight / 2,
            left: windowWidth / 2.2,
          }}
          size={"large"}
        />
        </View>
      ) : undefined}
    </>
  );
}
