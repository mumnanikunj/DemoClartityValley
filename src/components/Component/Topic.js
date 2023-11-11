import React, { useState, useEffect, useRef, useCallback } from "react";
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
  useWindowDimensions,
  BackHandler,
  Keyboard,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
} from "react-native";
import Slider from "react-native-slider";
import * as Colors from "../../common/colors";
import * as IMAGE from "../../common/Image";
import * as Fonts from "../../common/Fonts";
import { InnerStyle } from "./InnerStyle";
import Modal from "react-native-modal";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import ModalComponents from "./ModalComponents";
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import Voice from "@react-native-voice/voice";
import {
  FavMediaAction,
  LikeAction,
  RecoMediaAction,
  TherapistBookingAction,
  TrainerAction,
} from "../../redux/action";

import Orientation, {
  useOrientationChange,
  useDeviceOrientationChange,
  useLockListener,
  PORTRAIT,
  LANDSCAPE,
  LANDSCAPE_LEFT,
  LANDSCAPE_RIGHT,
} from "react-native-orientation-locker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  VideoAction,
  GetNotesAction,
  AddNoteAction,
  DeleteNoteAction,
} from "../../redux/action";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { VideoPlayerStyle } from "./VideoPlayerStyle";
import Videoplayer from "./VideoPlayer";
import { NotesStyle } from "../SubComponent/NotesStyle";
import moment from "moment";
import Video from "react-native-video";
import { tapHandlerName } from "react-native-gesture-handler/lib/typescript/handlers/TapGestureHandler";

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

const Topic = (props) => {
  const route = useRoute();
  const source = require("../../assets/pdf/Simple.pdf"); // ios only
  const [modalVisible, setModalVisible] = useState(false);
  const [WorksheetModal, setWorksheetModal] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [pdfView, setPdfView] = useState(false);
  const [VideoListData, setVideoListData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [notisLoading, setNotIsLoading] = useState(true);
  const [isLocked, setLocked] = useState();
  const [CompairData, setCompairData] = useState([]);
  const [selectdata, setSelectData] = useState("");
  const [datanotes, setDataNotes] = useState([]);
  const [id, setId] = useState(0);
  const [like, setLike] = useState(0);
  const [rouImage, setRouImage] = useState("");
  const [BGColor, setBGColor] = useState("");
  const [TopImage, setTopImage] = useState("");
  const [numLines, setNumLines] = useState(3);
  const [title, setTitle] = useState("NoteTitle");
  const [notes, setNotes] = React.useState("");
  const [date, setDate] = useState(moment().format("Y-M-D"));
  const [time, setTime] = useState(moment().format("h:m"));

  const [recognized, setRecognized] = useState("");
  const [volume, setVolume] = useState("");
  const [error, setError] = useState("");
  const [end, setEnd] = useState("");
  const [started, setStarted] = useState("");
  const [results, setResults] = useState("");
  const [partialResults, setPartialResults] = useState([]);
  const [RState, setRState] = useState(true);

  const dim = useWindowDimensions();

  const video = require("../../assets/Video/MyMovie20.mov");
  const [orientation, setOrientation] = useState("");
  const [mediaLink, setMediaLink] = useState([]);
  const [fullScreen, setfullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [LikeShow, setLikeShow] = useState();

  const [ChangeVideo, setChangeVideo] = useState([]);
  const [indexing, setIndexing] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [therapistBookingData, setTherapistBookingData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(4);
  const displayedData = therapistBookingData.slice(0, displayedItems);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("screen").height;

  const { width, height } = Dimensions.get("window");

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
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    console.log("onSpeechStart: ", e);
    setStarted("Start");
  };

  const onSpeechRecognized = (e) => {
    console.log("onSpeechRecognized: ", e);
    setRecognized("Recoding Start");
  };

  const onSpeechEnd = (e) => {
    // console.log('End : ', e);
    setEnd("√");
  };

  const onSpeechError = (e) => {
    // console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e) => {
    console.log("onSpeechResults: ", e.value);
    setNotes(...e.value);
    console.log("Data", ...e.value);
  };

  const onSpeechPartialResults = (e) => {
    // console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e) => {
    // console.log('onSpeechVolumeChanged: ', e);
    setVolume(e.value);
  };

  const startRecognizing = async () => {
    setRState(false);
    _clearState();
    try {
      await Voice.start("en-US");
      console.log("called start");
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async (e) => {
    setRState(true);
    try {
      await Voice.stop();
      // console.log('StopData',e)
    } catch (e) {
      console.error(e);
    }
  };

  const _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    _clearState();
  };

  const _clearState = () => {
    setRecognized("");
    setVolume("");
    setError("");
    setEnd("");
    setStarted("");
    setResults([]);
    setPartialResults([]);
  };

  useEffect(() => {
    checkLocked();

    if (modalVisible == false) {
      Orientation.lockToPortrait();
    }
  }, []);

  function handleBackButtonClick() {
    setVideoListData("");
    setChangeVideo("");
    // setModalVisible(false)
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    // navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
      // navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
    };
  }, []);

  // const RecommendedTopic = useSelector((state) => state.RecoMedia);
  // useEffect(() => {
  //   if (RecommendedTopic) {
  //     console.log("RecommendedTopic", RecommendedTopic);
  //     // if(RecommendedTopic.){

  //     // }
  //   }
  // }, []);

  useEffect(() => {
    dispatch(FavMediaAction());
  }, []);

  useEffect(() => {
    const compaireData = route.params.element.id;
    if (FavListData?.data?.length <= 0) {
      setLike(0);
      console.log("LikeStatus", like);
    } else {
      if (FavListData) {
        console.log("SubCateStatusDisLike", FavListData);
        if (FavListData.FavMediaListSuccess) {
          const likeData = FavListData.data.data;
          if (likeData.length <= 0) {
            setLike(0);
            console.log("DislikeStatus", like);
          } else if (likeData.length >= 0) {
            likeData.map((element, index) => {
              if (compaireData === element.id) {
                setLike(1);
                console.log("SubCateStatus", like);
              } else {
              }
            });
          }
        }
      }
    }
  }, [isFocused]);

  useEffect(() => {
    dispatch(GetNotesAction());
  }, []);

  const NotesApiData = useSelector((state) => state.GetNotes);
  // console.log("NoteDta", NotesApiData);
  useEffect(() => {
    if (NotesApiData) {
      if (NotesApiData.GetNotesSuccess) {
        const NApiData = NotesApiData.data.data;
        setDataNotes(NApiData);
        setNotIsLoading(false);
      }
    }
  }, [NotesApiData]);

  useEffect(() => {
    dispatch(TrainerAction());
  }, []);

  const TherapistData = useSelector((state) => state.Trainer);
  // console.log("bookimng", TherapistData);
  useEffect(() => {
    if (TherapistData) {
      if (TherapistData.TrainerSuccess) {
        const Bookingsession = TherapistData.data.data;
        setTherapistBookingData(Bookingsession);
      }
    }
  }, [TherapistData]);
  // console.log("namne", therapistBookingData);
  // console.log("datata+-+-+-", therapistBookingData);

  const VideoData = useSelector((state) => state.VideoList);
  useEffect(() => {
    const sub_id = route.params.element.id;
    dispatch(
      VideoAction({
        sub_category_id: sub_id,
      })
    );
    dispatch(RecoMediaAction());
    return () => {
      dispatch(VideoAction());
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (VideoData) {
      if (VideoData.VideoListSuccess) {
        const VData = VideoData.data.data;
        console.log("ApiVideoListData", VData);
        setVideoListData(VData);
        setMediaLink(VData);
        setIsLoading(false);
        if (VData.length == 0) {
          null;
        } else {
          let temp = [];
          VData.map((item, index) => {
            let ListData = item.media;
            temp.push(ListData);
            setChangeVideo(temp);
          });
        }
        // console.log('FirstData',VData[0].media)
      }
    }
  }, [VideoData]);

  useEffect(() => {
    const TImage = route.params.element.subcategory_thumb_img;
    setTopImage(TImage);
    setBGColor(route.params.element.colour);
  }, []);

  const modalhandle = (element) => {
    setModalVisible(true);
    setSelectData(element);
  };

  const highlights = useSelector((state) => state.Like);
  const FavListData = useSelector((state) => state.FavMedia);

  const LikeButton = () => {
    if (like == 0) {
      dispatch(
        LikeAction({
          subcategory_id: route.params.element.id,
          status: 1,
        })
      );
      setLike(1);
      console.log("Like", like);
    } else if (like == 1) {
      dispatch(
        LikeAction({
          subcategory_id: route.params.element.id,
          status: 0,
        })
      );
      setLike(0);
      console.log("DisLike", like);
    }
  };
  // const DiseLikeButton = () =>{
  //   // if(like === 0){
  //     dispatch(
  //       LikeAction({
  //         subcategory_id: route.params.element.id,
  //         status: 0,
  //       })
  //       );
  //       setLike(1);
  //       console.log("Like", like);
  //   // }else{
  //     // null
  //   // }

  // };

  const url =
    "https://drive.google.com/uc?export=download&id=1YNLyUv43xyARciiuCTzmR8WoUut3oE4X";
  const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${"pdf"}`;

  const options = {
    fromUrl: url,
    toFile: localFile,
  };

  onDownloadImagePress = () => {
    setIsLoading(true);
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        setIsLoading(false);
        // success
      })
      .catch((error) => {
        // error
      });
  };

  const SaveNotes = () => {
    if (notes != "") {
      dispatch(
        AddNoteAction({
          title: title,
          description: notes,
          date: date,
          time: time,
        })
      );
      // setIsLoading(true)
      // setTitle({ title: "" });
      setNotes({ notes: "" });
      setNotIsLoading(true);
      dispatch(GetNotesAction());
      // setModalVisible(!modalVisible);
      // Toast.showWithGravity(
      //   "notes addes successfully",
      //   Toast.LONG,
      //   Toast.BOTTOM
      // );
    }
  };

  const DeleteNote = (element) => {
    console.log("ele", element.id);
    const NoteID = element.id;
    Alert.alert("Are You Sure u Wanna Delete", "", [
      { text: "Cancel", onPress: () => null, style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          dispatch(DeleteNoteAction({ id: NoteID }));
          setNotIsLoading(true);
          dispatch(GetNotesAction());
        },
      },
    ]);

    // this.setState({ modalVisible: false }, () => {
    //   this.setState({ isLoading: true }, () => {
    //     this.CallAPi();
    //   });
    // });
  };

  function closeOrientation() {
    Orientation.lockToPortrait();
    // console.log('calll initial',orientation);
    // orientation === LANDSCAPE ? Orientation.lockToPortrait() : props?.navigation?.goBack()
    // return true;
  }

  const handelOraintation = (Orientation) => {
    // if(orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'){
    //   console.log('Orientation12',orientation)
    //   setfullScreen(true)
    // }else{
    //   console.log('Orientation11',orientation)
    //   setfullScreen(false)
    // }
  };

  const handleFullScreen = (orientation) => {
    // if(fullScreen){
    //   Orientation.unlockAllOrientations();
    // }else{
    //   Orientation.lockToLandscapeLeft()
    //   console.log('1',orientation)
    // }
    // Orientation.unlockAllOrientations();
    // if (fullScreen == true) {
    //     Orientation.lockToLandscapeLeft()
    //     setfullScreen(true);
    //    if (orientation === "LANDSCAPE_RIGHT") {
    //     Orientation.lockToLandscapeRight()
    //     setfullScreen(true);
    //   }
    // }
    //  else {
    //   Orientation.lockToLandscape();
    //   setfullScreen(false)
    // }
  };

  const handleSeekBack = () => {
    videoRef.current.seek(currentTime - 15);
  };

  const handleSeekForward = () => {
    videoRef.current.seek(currentTime + 15);
  };

  const handlePlayPause = () => {
    setPaused(!paused);
  };

  useDeviceOrientationChange((o) => {
    setOrientation(o);
  });
  useEffect(() => {
    return () => {
      BackHandler.addEventListener("hardwareBackPress", closeOrientation());
      BackHandler.removeEventListener("hardwareBackPress", closeOrientation());
    };
  }, []);

  const VideoChangeHandle = (element, index) => {
    // setChangeVideo([]);
    setChangeVideo(element.media);
    // setCurrentVideoIndex();
    setSelectedIndex(index);
    setIndexing(index);
  };

  const VideoListRender = () => {
    if (VideoListData == "") {
      null;
    } else {
      return VideoListData.map((element, index) => {
        return (
          <>
            <TouchableOpacity
              style={{
                backgroundColor:
                  selectedIndex == index ? "#b3b3b3" : "rgb(244,242,242)",
                // backgroundColor:"blue",
                // paddingVertical: RFPercentage(1),
                // borderWidth: 2,
                // borderColor: "rgb(229,235,250)",
                // borderRadius: RFPercentage(1.5),
                // marginVertical: RFPercentage(1),
                borderTopLeftRadius: index === 0 ? 20 : 0,
                borderTopRightRadius: index === 0 ? 20 : 0,
                borderBottomLeftRadius:
                  index === VideoListData.length - 1 ? 20 : 0,
                borderBottomRightRadius:
                  index === VideoListData.length - 1 ? 20 : 0,
              }}
              onPress={() => VideoChangeHandle(element, index)}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: RFPercentage(1),
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Image
                    source={{ uri: element.media_thumb_img }}
                    style={{
                      height: RFValue(73),
                      width: RFValue(73),
                      borderRadius: RFValue(10),
                    }}
                  />
                  <View style={{ width: "65%", justifyContent: "center" }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontFamily: Fonts.Regular,
                        fontSize: RFValue(13),
                        lineHeight: RFValue(20),
                        color: "#0C0B0B",
                      }}
                    >
                      {element.media_title}
                    </Text>
                    <Text
                      style={{
                        color: "#565656",
                        fontFamily: Fonts.Regular,
                        fontSize: RFValue(10),
                        lineHeight: RFValue(18),
                      }}
                    >
                      4 min 25 sec
                    </Text>
                  </View>
                </View>
                <Image
                  source={selectedIndex == index ? IMAGE.Pause : IMAGE.Play}
                  style={{
                    height: RFValue(20),
                    width: RFValue(20),
                    tintColor: "#1C5E87",
                  }}
                />
              </View>
            </TouchableOpacity>
            {index != VideoListData.length - 1 && (
              <View
                style={{ height: 1, width: "100%", backgroundColor: "#A6B7DB" }}
              />
            )}
          </>
        );
      });
    }
  };

  const NotesData = () => {
    return datanotes?.map((element, index) => {
      return (
        <>
          <TouchableOpacity
            activeOpacity={1}
            style={{ marginVertical: RFPercentage(1) }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#F6F4F4",
                justifyContent: "space-evenly",
                alignItems: "center",
                borderRadius: RFValue(20),
              }}
            >
              <View style={{ width: "75%", paddingVertical: RFPercentage(1) }}>
                <Text
                  style={{
                    color: Colors.Black,
                    fontFamily: Fonts.Regular,
                    fontSize: RFValue(12),
                  }}
                >
                  {element.date}
                </Text>
                <Text
                  style={{
                    color: Colors.Black,
                    fontFamily: Fonts.Regular,
                    fontSize: RFValue(12),
                  }}
                >
                  {element.description}
                </Text>
              </View>
              <TouchableOpacity onPress={() => DeleteNote(element)}>
                <Image
                  source={IMAGE.DeleteIcon}
                  style={{ height: RFPercentage(3), width: RFPercentage(3) }}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </>
      );
    });
  };

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 2); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  const NoteModalClose = ({ modalVisible }) => {
    console.log("Close Modal");
    setModalVisible(!modalVisible);
  };

  const [deviceOrientation, setDeviceOrientation] = useState("PORTRAIT");
  useDeviceOrientationChange((o) => {
    // setDeviceOrientation(o);
    setOrientation(o);
    // console.log('Oraintation',o)
  });

  useEffect(() => {
    // const PORTRAIT = 'PORTRAIT'
    // const LANDSCAPE_LEFT = 'LANDSCAPE-LEFT';
    // const LANDSCAPE_RIGHT = 'LANDSCAPE-RIGHT';
    // if(orientation){
    //   console.log('orientation123',orientation)
    //   if(orientation === 'PORTRAIT'){
    //     Orientation.lockToPortrait()
    //     setOrientation('PORTRAIT')
    //   }
    //   else if (orientation === 'LANDSCAPE_LEFT'){
    //     Orientation.lockToLandscapeLeft()
    //     setOrientation('LANDSCAPE_LEFT')
    //   }
    //   else if (orientation === 'LANDSCAPE_RIGHT'){
    //     Orientation.lockToLandscapeRight()
    //     setOrientation('LANDSCAPE_RIGHT')
    //   }
    //   else {
    //     Orientation.lockToPortrait()
    //     setOrientation('PORTRAIT')
    //   }
    // }
    switch (orientation) {
      case "PORTRAIT":
        Orientation.lockToPortrait();
        navigation
          .getParent()
          ?.setOptions({ tabBarStyle: { display: "flex" } });
        console.log("Oraintation1", orientation);
        break;
      case "LANDSCAPE-LEFT":
        navigation
          .getParent()
          ?.setOptions({ tabBarStyle: { display: "none" } });
        Orientation.lockToLandscapeLeft();
        console.log("Oraintation2", orientation);
        break;
      case "LANDSCAPE-RIGHT":
        Orientation.lockToLandscapeRight();
        navigation
          .getParent()
          ?.setOptions({ tabBarStyle: { display: "none" } });
        console.log("Oraintation3", orientation);
        break;
      case "UNKNOWN":
        Orientation.lockToPortrait();
        navigation
          .getParent()
          ?.setOptions({ tabBarStyle: { display: "flex" } });
        console.log("Oraintation4", orientation);
        break;
      case "FACE-UP":
        Orientation.lockToPortrait();
        navigation
          .getParent()
          ?.setOptions({ tabBarStyle: { display: "flex" } });
        console.log("Oraintation4", orientation);
        break;
      case "PORTRAIT-UPSIDEDOWN":
        Orientation.lockToPortrait();
        navigation
          .getParent()
          ?.setOptions({ tabBarStyle: { display: "flex" } });
        console.log("Oraintation4", orientation);
        break;
      default:
        Orientation.lockToPortrait();
        navigation
          .getParent()
          ?.setOptions({ tabBarStyle: { display: "flex" } });
        console.log("Oraintation5", orientation);
        break;
    }
  }, [orientation]);

  const NoteScrollable = useRef(null);
  const WorkScrollable = useRef(null);

  return (
    <>
      <ImageBackground
        source={{ uri: TopImage }}
        style={{
          height:
            Platform.OS === "ios"
              ? orientation == "PORTRAIT"
                ? windowHeight / 3
                : orientation == "FACE-UP"
                ? windowHeight / 3
                : orientation == "PORTRAIT-UPSIDEDOWN"
                ? windowHeight / 3
                : windowHeight
              : orientation == "PORTRAIT"
              ? windowHeight / 3
              : orientation == "UNKNOWN"
              ? windowHeight / 3
              : orientation == "PORTRAIT-UPSIDEDOWN"
              ? windowHeight / 3
              : windowHeight,
          width:
            Platform.OS === "ios"
              ? orientation == "PORTRAIT"
                ? windowWidth
                : orientation == "FACE-UP"
                ? windowWidth
                : orientation == "PORTRAIT-UPSIDEDOWN"
                ? windowWidth
                : windowWidth
              : orientation == "PORTRAIT"
              ? windowWidth
              : orientation == "UNKNOWN"
              ? windowWidth
              : orientation == "PORTRAIT-UPSIDEDOWN"
              ? windowWidth
              : windowWidth,
        }}
        imageStyle={{
          borderBottomLeftRadius:
            Platform.OS === "ios"
              ? orientation == "PORTRAIT"
                ? RFPercentage(2)
                : orientation == "FACE-UP"
                ? RFPercentage(2)
                : orientation == "PORTRAIT-UPSIDEDOWN"
                ? RFPercentage(0)
                : RFPercentage(0)
              : orientation == "PORTRAIT"
              ? RFPercentage(2)
              : orientation == "UNKNOWN"
              ? RFPercentage(2)
              : orientation == "PORTRAIT-UPSIDEDOWN"
              ? RFPercentage(0)
              : RFPercentage(0),
          borderBottomRightRadius:
            Platform.OS === "ios"
              ? orientation == "PORTRAIT"
                ? RFPercentage(2)
                : orientation == "FACE-UP"
                ? RFPercentage(2)
                : orientation == "PORTRAIT-UPSIDEDOWN"
                ? RFPercentage(0)
                : RFPercentage(0)
              : orientation == "PORTRAIT"
              ? RFPercentage(2)
              : orientation == "UNKNOWN"
              ? RFPercentage(2)
              : orientation == "PORTRAIT-UPSIDEDOWN"
              ? RFPercentage(0)
              : RFPercentage(0),
        }}
      >
        {/* {
            orientation == 'PORTRAIT' ?
          
          <View
            style={[InnerStyle.HeaderMainStyle, { marginTop: RFPercentage(6) }]}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                resizeMode="contain"
                source={IMAGE.LeftSideIcon}
                style={InnerStyle.DrawerIconStyle}
              />
            </TouchableOpacity>
          </View>
          :
          null
} */}

        <View
          style={{
            height:
              Platform.OS === "ios"
                ? orientation == "PORTRAIT"
                  ? windowHeight / 3
                  : orientation == "FACE-UP"
                  ? windowHeight / 3
                  : orientation == "PORTRAIT-UPSIDEDOWN"
                  ? windowHeight / 3
                  : windowHeight
                : orientation == "PORTRAIT"
                ? windowHeight / 3
                : orientation == "UNKNOWN"
                ? windowHeight / 3
                : orientation == "PORTRAIT-UPSIDEDOWN"
                ? windowHeight / 3
                : windowHeight,
            width:
              Platform.OS === "ios"
                ? orientation == "PORTRAIT"
                  ? windowWidth
                  : orientation == "FACE-UP"
                  ? windowWidth
                  : orientation == "PORTRAIT-UPSIDEDOWN"
                  ? windowWidth
                  : windowWidth
                : orientation == "PORTRAIT"
                ? windowWidth
                : orientation == "UNKNOWN"
                ? windowWidth
                : orientation == "PORTRAIT-UPSIDEDOWN"
                ? windowWidth
                : windowWidth,
            flex:
              Platform.OS === "ios"
                ? orientation === "PORTRAIT"
                  ? 1
                  : orientation == "FACE-UP"
                  ? 1
                  : orientation == "PORTRAIT-UPSIDEDOWN"
                  ? 1
                  : 1
                : orientation === "PORTRAIT"
                ? 1
                : orientation == "UNKNOWN"
                ? 1
                : orientation == "PORTRAIT-UPSIDEDOWN"
                ? 1
                : 1,
          }}
        >
          <Videoplayer
            data={ChangeVideo}
            dataindex={indexing}
            setIndexing={(val) => setSelectedIndex(val)}
          />
        </View>
      </ImageBackground>
      {orientation == "PORTRAIT" || "PORTRAIT-UPSIDEDOWN" ? (
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: BGColor,
            // top:40
          }}
        >
          <View style={{}}>
            <View style={{ marginHorizontal: RFValue(14) }}>
              <View
                style={{
                  // backgroundColor:'blue',
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: RFPercentage(2),
                }}
              >
                <Text
                  style={{
                    textAlignVertical: "top",
                    color: "#0C0B0B",
                    fontFamily: Fonts.Medium,
                    fontSize: 20,
                    lineHeight: RFValue(24),
                    // backgroundColor:"blue",
                    width: "90%",
                  }}
                >
                  {route.params.element.name}
                </Text>
                <TouchableOpacity
                  style={{ alignSelf: "flex-start" }}
                  onPress={() => LikeButton()}
                >
                  <Image
                    source={
                      like == 0 ? IMAGE.lHeart_Icon : IMAGE.lHeart_Icon_fill
                    }
                    style={[
                      VideoPlayerStyle.LikeIcon,
                      like == 0
                        ? { tintColor: Colors.Black }
                        : { tintColor: "red" },
                      { height: RFPercentage(3.2), width: RFPercentage(3.2) },
                    ]}
                  />
                </TouchableOpacity>
                {
                  // like === 0 ?
                  //   :
                  //   <TouchableOpacity
                  //   style={{ alignSelf: "flex-start" }}
                  //   onPress={() => DiseLikeButton()}
                  // >
                  //   <Image
                  //     source={
                  //       // like === 0 ?
                  //        IMAGE.lHeart_Icon_fill
                  //       //  :
                  //       //  IMAGE.lHeart_Icon
                  //     }
                  //     style={[
                  //       VideoPlayerStyle.LikeIcon,
                  //       // like === 0
                  //       // ?
                  //       { tintColor: "red" }
                  //       // :
                  //       // { tintColor: Colors.Black }
                  //       ,
                  //       { height: RFPercentage(3.2), width: RFPercentage(3.2) },
                  //     ]}
                  //   />
                  // </TouchableOpacity>
                }
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    paddingRight: RFValue(2),
                    color: "#565656",
                    fontFamily: Fonts.Medium,
                    fontSize: RFValue(14),
                  }}
                >
                  by
                </Text>
                <Text
                  style={{
                    paddingRight: RFValue(2),
                    color: "#565656",
                    fontFamily: Fonts.Bold,
                    fontSize: RFValue(15),
                  }}
                >
                  Noura
                </Text>
              </View>
              <View>
                <Text
                  onTextLayout={onTextLayout}
                  numberOfLines={textShown ? undefined : 2}
                  multiline={true}
                  style={{
                    lineHeight: 20,
                    color: "#565656",
                    fontFamily: Fonts.SemiBold,
                    fontSize: RFValue(12),
                  }}
                  ellipsizeMode="tail"
                >
                  {route.params.element.description}
                </Text>

                {lengthMore ? (
                  <Text
                    onPress={toggleNumberOfLines}
                    style={{
                      lineHeight: 20,
                      color: "#A6B7DB",
                      fontFamily: Fonts.SemiBold,
                      fontSize: RFValue(12),
                      alignSelf: "flex-start",
                    }}
                  >
                    {textShown ? "Read less" : "Read more"}
                  </Text>
                ) : null}
              </View>
            </View>
            <View style={{ marginVertical: RFPercentage(1) }}>
              <View>{VideoListRender()}</View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => NoteScrollable.current.open()}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "97%",
                  borderTopRightRadius: RFValue(20),
                  borderBottomRightRadius: RFValue(20),
                  backgroundColor: "rgba(164, 182, 212, 0.54)",
                  marginVertical: RFPercentage(2),
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgb(244,242,242)",
                    width: "84%",
                    borderTopRightRadius: RFValue(20),
                    borderBottomRightRadius: RFValue(20),
                  }}
                >
                  <View
                    style={{
                      marginHorizontal: RFValue(14),
                      paddingVertical: RFPercentage(1),
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                        paddingVertical: RFPercentage(0.5),
                      }}
                    >
                      Self Notes
                    </Text>
                    <Text
                      style={{ width: "95%", paddingVertical: RFPercentage(1) }}
                    >
                      Leave session notes to yourself here, These Notes are
                      private and can only be seen by you.
                    </Text>
                  </View>
                </View>
                <View
                  style={{ alignSelf: "center", right: "10%" }}
                  // onPress={() => NoteScrollable.current.open()}
                >
                  <Image
                    resizeMode="contain"
                    source={IMAGE.NoteOpenIcon}
                    style={{ height: RFValue(30), width: RFValue(30) }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => WorkScrollable.current.open()}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "97%",
                  borderTopRightRadius: RFValue(20),
                  borderBottomRightRadius: RFValue(20),
                  backgroundColor: "rgba(164, 182, 212, 0.54)",
                  marginVertical: RFPercentage(2),
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgb(244,242,242)",
                    width: "84%",
                    borderTopRightRadius: RFValue(20),
                    borderBottomRightRadius: RFValue(20),
                  }}
                >
                  <View
                    style={{
                      marginHorizontal: RFValue(14),
                      paddingVertical: RFPercentage(1),
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                        paddingVertical: RFPercentage(0.5),
                      }}
                    >
                      Downloadable Worksheets
                    </Text>
                    <Text
                      style={{ width: "95%", paddingVertical: RFPercentage(1) }}
                    >
                      Some text about the sheet goes here, this will be common
                      text that will be shared with all workshops
                    </Text>
                  </View>
                </View>
                <View style={{ alignSelf: "center", right: "10%" }}>
                  <Image
                    resizeMode="contain"
                    source={IMAGE.DownloadIcon}
                    style={{
                      height: RFValue(30),
                      width: RFValue(30),
                      tintColor: Colors.Black,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: "flex-start",
                  marginVertical: RFPercentage(2),
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgb(244,242,242)",
                    paddingHorizontal: RFValue(14),
                    borderTopRightRadius: RFPercentage(5),
                    borderBottomRightRadius: RFPercentage(5),
                  }}
                >
                  <Text
                    style={{
                      color: Colors.Black,
                      fontFamily: Fonts.Bold,
                      fontSize: RFValue(14),
                      paddingVertical: RFPercentage(1.5),
                    }}
                  >
                    Book 1-1 session
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={displayedData}
                numColumns={4}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        paddingHorizontal: RFValue(10),
                        alignSelf: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Explore")}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            height: RFPercentage(9),
                            width: RFPercentage(9),
                            borderRadius: RFPercentage(9),
                            alignSelf: "center",
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: Colors.Black,
                          fontFamily: Fonts.Bold,
                          fontSize: RFValue(10),
                          alignSelf: "center",
                          marginBottom: RFValue(10),
                          marginTop: RFValue(5),
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  );
                }}
              />

              {/* <View style={{ marginHorizontal: RFPercentage(2) }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={{ uri: therapistBookingData.image }}
                      style={{
                        height: RFPercentage(10),
                        width: RFPercentage(10),
                        borderRadius: RFPercentage(10),
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                      }}
                    >
                      {therapistBookingData.name}
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={IMAGE.Meditation}
                      style={{
                        height: RFPercentage(10),
                        width: RFPercentage(10),
                        borderRadius: RFPercentage(10),
                      }}
                    />
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                      }}
                    >
                      Ahmed
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={IMAGE.Meditation}
                      style={{
                        height: RFPercentage(10),
                        width: RFPercentage(10),
                        borderRadius: RFPercentage(10),
                      }}
                    />
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                      }}
                    >
                      Mark
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={IMAGE.Meditation}
                      style={{
                        height: RFPercentage(10),
                        width: RFPercentage(10),
                        borderRadius: RFPercentage(10),
                      }}
                    />
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                      }}
                    >
                      Steph
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                ></View>
              </View> */}

              {displayedItems < therapistBookingData.length && (
                <View
                  style={{
                    marginHorizontal: RFPercentage(2),
                    marginVertical: RFPercentage(1),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setDisplayedItems((prevItems) => prevItems + 4);
                    }}
                    style={{
                      backgroundColor: "rgb(244,242,242)",
                      paddingHorizontal: RFValue(14),
                      borderRadius: RFPercentage(5),
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                        paddingVertical: RFPercentage(1),
                      }}
                    >
                      View All
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      ) : Platform.OS === "ios" ? (
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: BGColor,
            // top:40
          }}
        >
          <View style={{}}>
            <View style={{ marginHorizontal: RFValue(14) }}>
              <View
                style={{
                  // backgroundColor:'blue',
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: RFPercentage(1),
                }}
              >
                <Text
                  style={{
                    textAlignVertical: "top",
                    color: "#0C0B0B",
                    fontFamily: Fonts.Medium,
                    fontSize: 20,
                    lineHeight: RFValue(24),
                    // backgroundColor:"blue",
                    width: "90%",
                  }}
                >
                  {route.params.element.name}
                </Text>
                <TouchableOpacity
                  style={{ alignSelf: "flex-start" }}
                  onPress={() => LikeButton()}
                >
                  <Image
                    source={
                      like == 0 ? IMAGE.lHeart_Icon : IMAGE.lHeart_Icon_fill
                    }
                    style={[
                      VideoPlayerStyle.LikeIcon,
                      like == 0
                        ? { tintColor: Colors.Black }
                        : { tintColor: "red" },
                      { height: RFPercentage(3.2), width: RFPercentage(3.2) },
                    ]}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    paddingRight: RFValue(2),
                    color: "#565656",
                    fontFamily: Fonts.Medium,
                    fontSize: RFValue(14),
                  }}
                >
                  by
                </Text>
                <Text
                  style={{
                    paddingRight: RFValue(2),
                    color: "#565656",
                    fontFamily: Fonts.Bold,
                    fontSize: RFValue(15),
                  }}
                >
                  Noura
                </Text>
              </View>
              <View>
                <Text
                  onTextLayout={onTextLayout}
                  numberOfLines={textShown ? undefined : 2}
                  multiline={true}
                  style={{
                    lineHeight: 20,
                    color: "#565656",
                    fontFamily: Fonts.SemiBold,
                    fontSize: RFValue(12),
                  }}
                  ellipsizeMode="tail"
                >
                  {route.params.element.description}
                </Text>

                {lengthMore ? (
                  <Text
                    onPress={toggleNumberOfLines}
                    style={{
                      lineHeight: 20,
                      color: "#A6B7DB",
                      fontFamily: Fonts.SemiBold,
                      fontSize: RFValue(12),
                      alignSelf: "flex-start",
                    }}
                  >
                    {textShown ? "Read less" : "Read more"}
                  </Text>
                ) : null}
              </View>
            </View>
            <View style={{ marginVertical: RFPercentage(1) }}>
              <View>{VideoListRender()}</View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => NoteScrollable.current.open()}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "97%",
                  borderTopRightRadius: RFValue(20),
                  borderBottomRightRadius: RFValue(20),
                  backgroundColor: "rgba(164, 182, 212, 0.54)",
                  marginVertical: RFPercentage(2),
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgb(244,242,242)",
                    width: "84%",
                    borderTopRightRadius: RFValue(20),
                    borderBottomRightRadius: RFValue(20),
                  }}
                >
                  <View
                    style={{
                      marginHorizontal: RFValue(14),
                      paddingVertical: RFPercentage(1),
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                        paddingVertical: RFPercentage(0.5),
                      }}
                    >
                      Self Notes
                    </Text>
                    <Text
                      style={{ width: "95%", paddingVertical: RFPercentage(1) }}
                    >
                      Leave session notes to yourself here, These Notes are
                      private and can only be seen by you.
                    </Text>
                  </View>
                </View>
                <View
                  style={{ alignSelf: "center", right: "10%" }}
                  // onPress={() => NoteScrollable.current.open()}
                >
                  <Image
                    resizeMode="contain"
                    source={IMAGE.NoteOpenIcon}
                    style={{ height: RFValue(30), width: RFValue(30) }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => WorkScrollable.current.open()}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "97%",
                  borderTopRightRadius: RFValue(20),
                  borderBottomRightRadius: RFValue(20),
                  backgroundColor: "rgba(164, 182, 212, 0.54)",
                  marginVertical: RFPercentage(2),
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgb(244,242,242)",
                    width: "84%",
                    borderTopRightRadius: RFValue(20),
                    borderBottomRightRadius: RFValue(20),
                  }}
                >
                  <View
                    style={{
                      marginHorizontal: RFValue(14),
                      paddingVertical: RFPercentage(1),
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                        paddingVertical: RFPercentage(0.5),
                      }}
                    >
                      Downloadable Worksheets
                    </Text>
                    <Text
                      style={{ width: "95%", paddingVertical: RFPercentage(1) }}
                    >
                      Some text about the sheet goes here, this will be common
                      text that will be shared with all workshops
                    </Text>
                  </View>
                </View>
                <View style={{ alignSelf: "center", right: "10%" }}>
                  <Image
                    resizeMode="contain"
                    source={IMAGE.DownloadIcon}
                    style={{
                      height: RFValue(30),
                      width: RFValue(30),
                      tintColor: Colors.Black,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: "flex-start",
                  marginVertical: RFPercentage(2),
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgb(244,242,242)",
                    paddingHorizontal: RFValue(14),
                    borderTopRightRadius: RFPercentage(5),
                    borderBottomRightRadius: RFPercentage(5),
                  }}
                >
                  <Text
                    style={{
                      color: Colors.Black,
                      fontFamily: Fonts.Bold,
                      fontSize: RFValue(14),
                      paddingVertical: RFPercentage(1.5),
                    }}
                  >
                    Book 1-1 session
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={displayedData}
                numColumns={4}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        paddingHorizontal: RFValue(10),
                        alignSelf: "center",
                      }}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={{
                          height: RFPercentage(8),
                          width: RFPercentage(8),
                          borderRadius: RFPercentage(8),
                          alignSelf: "center",
                        }}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          color: Colors.Black,
                          fontFamily: Fonts.Bold,
                          fontSize: RFValue(10),
                          alignSelf: "center",
                          marginTop: RFValue(5),
                          marginBottom: RFValue(10),
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  );
                }}
              />

              {/* <View style={{ marginHorizontal: RFPercentage(2) }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={IMAGE.Meditation}
                      style={{
                        height: RFPercentage(10),
                        width: RFPercentage(10),
                        borderRadius: RFPercentage(10),
                      }}
                    />
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                      }}
                    >
                      {book.data.data[0].name}
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={IMAGE.Meditation}
                      style={{
                        height: RFPercentage(10),
                        width: RFPercentage(10),
                        borderRadius: RFPercentage(10),
                      }}
                    />
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                      }}
                    >
                      Ahmed
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={IMAGE.Meditation}
                      style={{
                        height: RFPercentage(10),
                        width: RFPercentage(10),
                        borderRadius: RFPercentage(10),
                      }}
                    />
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                      }}
                    >
                      Mark
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={IMAGE.Meditation}
                      style={{
                        height: RFPercentage(10),
                        width: RFPercentage(10),
                        borderRadius: RFPercentage(10),
                      }}
                    />
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                      }}
                    >
                      Steph
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                ></View>
              </View> */}
              <View
                style={{
                  marginHorizontal: RFPercentage(2),
                  marginVertical: RFPercentage(1),
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgb(244,242,242)",
                    paddingHorizontal: RFValue(14),
                    borderRadius: RFPercentage(5),
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Colors.Black,
                      fontFamily: Fonts.Bold,
                      fontSize: RFValue(14),
                      paddingVertical: RFPercentage(1),
                    }}
                  >
                    View All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : orientation == "UNKNOWN" ? (
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: BGColor,
            // top:40
          }}
        >
          <View style={{}}>
            <View style={{ marginHorizontal: RFValue(14) }}>
              <View
                style={{
                  // backgroundColor:'blue',
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: RFPercentage(1),
                }}
              >
                <Text
                  style={{
                    textAlignVertical: "top",
                    color: "#0C0B0B",
                    fontFamily: Fonts.Medium,
                    fontSize: 20,
                    lineHeight: RFValue(24),
                    // backgroundColor:"blue",
                    width: "90%",
                  }}
                >
                  {route.params.element.name}
                </Text>
                <TouchableOpacity
                  style={{ alignSelf: "flex-start" }}
                  onPress={() => LikeButton()}
                >
                  <Image
                    source={
                      like == 0 ? IMAGE.lHeart_Icon : IMAGE.lHeart_Icon_fill
                    }
                    style={[
                      VideoPlayerStyle.LikeIcon,
                      like == 0
                        ? { tintColor: Colors.Black }
                        : { tintColor: "red" },
                      { height: RFPercentage(3.2), width: RFPercentage(3.2) },
                    ]}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    paddingRight: RFValue(2),
                    color: "#565656",
                    fontFamily: Fonts.Medium,
                    fontSize: RFValue(14),
                  }}
                >
                  by
                </Text>
                <Text
                  style={{
                    paddingRight: RFValue(2),
                    color: "#565656",
                    fontFamily: Fonts.Bold,
                    fontSize: RFValue(15),
                  }}
                >
                  Noura
                </Text>
              </View>
              <View>
                <Text
                  onTextLayout={onTextLayout}
                  numberOfLines={textShown ? undefined : 2}
                  multiline={true}
                  style={{
                    lineHeight: 20,
                    color: "#565656",
                    fontFamily: Fonts.SemiBold,
                    fontSize: RFValue(12),
                  }}
                  ellipsizeMode="tail"
                >
                  {route.params.element.description}
                </Text>

                {lengthMore ? (
                  <Text
                    onPress={toggleNumberOfLines}
                    style={{
                      lineHeight: 20,
                      color: "#A6B7DB",
                      fontFamily: Fonts.SemiBold,
                      fontSize: RFValue(12),
                      alignSelf: "flex-start",
                    }}
                  >
                    {textShown ? "Read less" : "Read more"}
                  </Text>
                ) : null}
              </View>
            </View>
            <View style={{ marginVertical: RFPercentage(1) }}>
              <View>{VideoListRender()}</View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => NoteScrollable.current.open()}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "97%",
                  borderTopRightRadius: RFValue(20),
                  borderBottomRightRadius: RFValue(20),
                  backgroundColor: "rgba(164, 182, 212, 0.54)",
                  marginVertical: RFPercentage(2),
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgb(244,242,242)",
                    width: "84%",
                    borderTopRightRadius: RFValue(20),
                    borderBottomRightRadius: RFValue(20),
                  }}
                >
                  <View
                    style={{
                      marginHorizontal: RFValue(14),
                      paddingVertical: RFPercentage(1),
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                        paddingVertical: RFPercentage(0.5),
                      }}
                    >
                      Self Notes
                    </Text>
                    <Text
                      style={{ width: "95%", paddingVertical: RFPercentage(1) }}
                    >
                      Leave session notes to yourself here, These Notes are
                      private and can only be seen by you.
                    </Text>
                  </View>
                </View>
                <View
                  style={{ alignSelf: "center", right: "10%" }}
                  // onPress={() => NoteScrollable.current.open()}
                >
                  <Image
                    resizeMode="contain"
                    source={IMAGE.NoteOpenIcon}
                    style={{ height: RFValue(30), width: RFValue(30) }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => WorkScrollable.current.open()}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "97%",
                  borderTopRightRadius: RFValue(20),
                  borderBottomRightRadius: RFValue(20),
                  backgroundColor: "rgba(164, 182, 212, 0.54)",
                  marginVertical: RFPercentage(2),
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgb(244,242,242)",
                    width: "84%",
                    borderTopRightRadius: RFValue(20),
                    borderBottomRightRadius: RFValue(20),
                  }}
                >
                  <View
                    style={{
                      marginHorizontal: RFValue(14),
                      paddingVertical: RFPercentage(1),
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                        paddingVertical: RFPercentage(0.5),
                      }}
                    >
                      Downloadable Worksheets
                    </Text>
                    <Text
                      style={{ width: "95%", paddingVertical: RFPercentage(1) }}
                    >
                      Some text about the sheet goes here, this will be common
                      text that will be shared with all workshops
                    </Text>
                  </View>
                </View>
                <View style={{ alignSelf: "center", right: "10%" }}>
                  <Image
                    resizeMode="contain"
                    source={IMAGE.DownloadIcon}
                    style={{
                      height: RFValue(30),
                      width: RFValue(30),
                      tintColor: Colors.Black,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: "flex-start",
                  marginVertical: RFPercentage(2),
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgb(244,242,242)",
                    paddingHorizontal: RFValue(14),
                    borderTopRightRadius: RFPercentage(5),
                    borderBottomRightRadius: RFPercentage(5),
                  }}
                >
                  <Text
                    style={{
                      color: Colors.Black,
                      fontFamily: Fonts.Bold,
                      fontSize: RFValue(14),
                      paddingVertical: RFPercentage(1.5),
                    }}
                  >
                    Book 1-1 session
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={displayedData}
                numColumns={4}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        paddingHorizontal: RFValue(10),
                        alignSelf: "center",
                      }}
                    >
                      <TouchableOpacity
                      // onPress={() =>{      this.props.navigation.navigate("Login");}
                      //   this.props.navigation.navigate("Explore")
                      // }
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            height: RFPercentage(8),
                            width: RFPercentage(8),
                            borderRadius: RFPercentage(8),
                            alignSelf: "center",
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: Colors.Black,
                          fontFamily: Fonts.Bold,
                          fontSize: RFValue(10),
                          alignSelf: "center",
                          marginTop: RFValue(5),
                          marginBottom: RFValue(10),
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  );
                }}
              />

              {/* <View style={{ marginHorizontal: RFPercentage(2) }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={IMAGE.Meditation}
                      style={{
                        height: RFPercentage(10),
                        width: RFPercentage(10),
                        borderRadius: RFPercentage(10),
                      }}
                    />
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                      }}
                    >
                      Noura
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={IMAGE.Meditation}
                      style={{
                        height: RFPercentage(10),
                        width: RFPercentage(10),
                        borderRadius: RFPercentage(10),
                      }}
                    />
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                      }}
                    >
                      Ahmed
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={IMAGE.Meditation}
                      style={{
                        height: RFPercentage(10),
                        width: RFPercentage(10),
                        borderRadius: RFPercentage(10),
                      }}
                    />
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                      }}
                    >
                      Mark
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={IMAGE.Meditation}
                      style={{
                        height: RFPercentage(10),
                        width: RFPercentage(10),
                        borderRadius: RFPercentage(10),
                      }}
                    />
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(14),
                      }}
                    >
                      Steph
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                ></View>
              </View> */}
              <View
                style={{
                  marginHorizontal: RFPercentage(2),
                  marginVertical: RFPercentage(1),
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgb(244,242,242)",
                    paddingHorizontal: RFValue(14),
                    borderRadius: RFPercentage(5),
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Colors.Black,
                      fontFamily: Fonts.Bold,
                      fontSize: RFValue(14),
                      paddingVertical: RFPercentage(1),
                    }}
                  >
                    View All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : null}
      {/* <Modal
        // animationType={'fade'}
        visible={modalVisible}
        // transparent
        animationType="slide"
        onSwipeComplete={() => setModalVisible(false)}        
        onRequestClose={() => {
          setModalVisible(false)
        }}
        useNativeDriver={true}
        backdropColor={"transparent"}
        useNativeDriverForBackdrop
        swipeDirection={["down"]}
        swipeThreshold={10}
        style={{
          margin: 2,
          marginTop: RFPercentage(12),
        }}

      > */}
      <RBSheet
        animationType="slide"
        openDuration={200}
        closeDuration={100}
        ref={NoteScrollable}
        backdropColor={"white"}
        closeOnDragDown={true}
        customStyles={{
          container: {
            borderWidth: 1,
            borderColor: "#625959",
            borderTopLeftRadius: RFValue(15),
            borderTopRightRadius: RFValue(15),
            height: windowHeight / 1.1,
            // flex:1,
          },
        }}
      >
        {/* <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: RFPercentage(2),
          }}
        >
          <View
            style={{ backgroundColor: "#000000", width: "50%", height: 1 }}
          />
        </View> */}
        {/* <ScrollView 
        bounces={false}
        contentContainerStyle={{
          // flexGrow:1,
          // flex:1,
          marginBottom:RFPercentage(10)       
        }}
        showsVerticalScrollIndicator={false}
        > */}
        <TouchableWithoutFeedback
          accessible={false}
          onPress={() => Keyboard.dismiss()}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                marginVertical: RFPercentage(2),
                height: RFPercentage(20),
              }}
            >
              <TextInput
                onChangeText={(val) => setNotes(val)}
                multiline={true}
                value={notes}
                placeholder={
                  "We know typing can be challenging, press the microphone to start and press stop to quit recording"
                }
                // placeholderStyle={{ fontFamily: "HankenGrotesk-italic" }}
                placeholderTextColor={Colors.Black}
                style={[
                  NotesStyle.TextInputStyle,
                  {
                    marginHorizontal: RFPercentage(3),
                    height: "100%",
                    borderColor: Colors.Black,
                  },
                ]}
              />
            </View>
            <View
              style={{
                marginHorizontal: RFPercentage(3),
                flexDirection: "row",
                justifyContent: "space-between",
                // alignItems: "flex-end",
                // flexDirection:'row',
              }}
            >
              <View style={{ flexDirection: "row" }}>
                {RState == false ? (
                  <TouchableOpacity
                    onPress={() => stopRecognizing()}
                    style={{ marginHorizontal: RFPercentage(1) }}
                  >
                    <Image style={[styles.button, {}]} source={IMAGE.StopBtn} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => startRecognizing()}
                    style={{
                      marginHorizontal: RFPercentage(1),
                      // backgroundColor: "black",
                      borderRadius: RFPercentage(5),
                    }}
                  >
                    <Image
                      style={[styles.button, { tintColor: Colors.Black }]}
                      source={IMAGE.MicIcon}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                style={{
                  paddingHorizontal: RFPercentage(5),
                  paddingVertical: RFPercentage(1.3),
                  borderRadius: RFPercentage(1),
                  backgroundColor: notes == "" ? Colors.LigthBlue : "#1C5E87",
                }}
                disabled={notes == ""}
                onPress={() => SaveNotes()}
              >
                <Text
                  style={{
                    color: Colors.White,
                    fontFamily: Fonts.Regular,
                    fontSize: RFValue(13),
                  }}
                >
                  SAVE
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginHorizontal: RFPercentage(3),
                marginTop: RFPercentage(1.5),
                flexGrow: 1,
                flex: 1,
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  marginBottom: Platform.OS === "ios" ? RFPercentage(2) : 0,
                }}
              >
                {NotesData()}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/* </ScrollView> */}
        {notisLoading ? (
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
                // justifyContent:'center',
                // alignItems:'center',
                top: height / 2,
                left: width / 2.2,
              }}
              size={"large"}
            />
          </View>
        ) : undefined}
      </RBSheet>
      {/* </Modal> */}

      {/* <Modal
        // animationType={'fade'}
        visible={WorksheetModal}
        // transparent
        animationType="slide"
        onSwipeComplete={() => setWorksheetModal(false)}
        onRequestClose={() => {
          setWorksheetModal(false)
        }}
        useNativeDriver={true}
        backdropColor={"transparent"}
        useNativeDriverForBackdrop
        swipeDirection={["down"]}
        style={{
          margin: 2,
          marginTop: "80%",
        }}
      > */}
      <RBSheet
        animationType="slide"
        openDuration={200}
        closeDuration={100}
        ref={WorkScrollable}
        backdropColor={"white"}
        closeOnDragDown={true}
        customStyles={{
          container: {
            borderWidth: 1,
            borderColor: "#625959",
            borderTopLeftRadius: RFValue(15),
            borderTopRightRadius: RFValue(15),
            // height: windowHeight / 1.1,
            flex: 1,
          },
        }}
      >
        {/* <View
          style={{
            flex: 1,
            //  height:windowHeight/2,
            backgroundColor: Colors.White,
            borderWidth: 1,
            borderTopColor: "#625959",
            borderLeftColor: "#625959",
            borderRightColor: "#625959",
            borderBottomColor: "white",
            borderTopLeftRadius: RFPercentage(4),
            borderTopRightRadius: RFPercentage(4),
            // justifyContent: 'center',
          }}
        > */}
        {/* <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: RFPercentage(2),
            }}
          >
            <View
              style={{ backgroundColor: "#000000", width: "50%", height: 1 }}
            />
          </View> */}
        <View style={{ marginTop: "10%" }}>
          <View style={{ marginHorizontal: RFPercentage(4) }}>
            <Text
              style={{
                paddingVertical: RFPercentage(1),
                color: Colors.Black,
                fontFamily: Fonts.Bold,
                fontSize: RFValue(16),
              }}
            >
              Downloadable Worksheets
            </Text>
            <Text
              style={{
                paddingVertical: RFPercentage(1),
                color: Colors.Black,
                fontFamily: Fonts.Regular,
                fontSize: RFValue(13),
              }}
            >
              Some text about the sheet goes here, this will be common text that
              will be shared with all workshops.
            </Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: RFPercentage(5),
            marginHorizontal: RFPercentage(2),
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#F6F4F4",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingVertical: RFPercentage(1.5),
              borderRadius: RFValue(25),
            }}
            onPress={() => onDownloadImagePress()}
          >
            <Text
              style={{
                color: Colors.Black,
                fontFamily: Fonts.Regular,
                fontSize: RFValue(13),
              }}
            >
              Master Worksheet - Stalking
            </Text>
            <Image
              source={IMAGE.DownloadIcon}
              style={{
                height: RFValue(25),
                width: RFValue(25),
                tintColor: Colors.Black,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: RFPercentage(5),
            marginVertical: RFPercentage(3),
          }}
        >
          <Text
            style={{
              color: Colors.Black,
              fontFamily: Fonts.Regular,
              fontSize: RFValue(13),
            }}
          >
            Disclaimer: Some text about the sheet goes here, this will be common
            text that will be shared with all workshops
          </Text>
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
                height: windowHeight / 2,
                left: width / 2.2,
              }}
              size={"large"}
            />
          </View>
        ) : undefined}
      </RBSheet>
      {/* </Modal> */}
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

const styles = StyleSheet.create({
  button: {
    width: RFPercentage(4),
    height: RFPercentage(4),
  },
  // container: {
  //   // flex: 1,
  //   // justifyContent: 'center',
  //   marginVertical: RFPercentage(2),
  //   alignItems: "center",
  //   height: windowHeight / 1.2,
  //   borderRadius: RFPercentage(1.5),
  //   marginHorizontal: RFValue(16),
  //   backgroundColor: "#F5FCFF",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 0 },
  //   shadowRadius: 4,
  //   shadowOpacity: 0.2,
  //   elevation: 3,
  // },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  action: {
    textAlign: "center",
    color: "#0000FF",
    marginVertical: 5,
    fontWeight: "bold",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  stat: {
    textAlign: "center",
    color: "#B0171F",
    marginBottom: 1,
  },
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fullVideoScreen: {
    flex: 1,
    borderRadius: RFPercentage(0),
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  normalvideo: {
    borderRadius: RFPercentage(2),
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // height: windowHeight,
    // width: windowWidth,
  },
  controlsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  seekButton: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  playPauseButton: {
    fontSize: 20,
    marginHorizontal: 20,
  },
});

export default Topic;
