import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  BackHandler,
  StatusBar,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Button,
  Platform,
} from "react-native";
import Slider from "react-native-slider";
import Video from "react-native-video";
import * as IMAGE from "../../common/Image";
import { VideoPlayerStyle } from "./VideoPlayerStyle";
import { useNavigation } from "@react-navigation/native";
import Topic from './Topic';

import {
  ScreenContainer,
  YoutubePlayer,
  FacebookPlayer,
  connectOrientationLib,
  connectUseInsets,
} from "react-native-video-extension";
import Orientation, {
  useOrientationChange,
  useDeviceOrientationChange,
  useLockListener,
  PORTRAIT,
  LANDSCAPE,
  LANDSCAPE_LEFT,
  LANDSCAPE_RIGHT,
} from "react-native-orientation-locker";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { VideoAction } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { ColorSpace } from "react-native-reanimated";
import { InnerStyle } from "./InnerStyle";
// import Slider from '@react-native-community/slider';
// import { Button } from "react-native-share";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const Videoplayer = (props) => {
  const dim = useWindowDimensions();  

  const [isLoading, setIsLoading] = useState(true);
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
  const navigation = useNavigation();

  const videoRef = useRef(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   Orientation.addOrientationListener(handelOraintation);
  //   // var initial = Orientation.getInitialOrientation();
  //   // setfullScreen(initial);
  //   // console.log('videoRef',videoRef.current?.props)
  // }, []);

  function closeOrientation() {
    Orientation.lockToPortrait();
    // console.log('calll initial',orientation);
    // orientation === LANDSCAPE ? Orientation.lockToPortrait() : props?.navigation?.goBack()
    // return true;
  }

  // useEffect(() => {
  //   dispatch(VideoAction());
  // }, []);

  // const VideoListGetData = useSelector((state) => state.VideoList);

  useEffect(() => {
    const dataaaa = currentVideoIndex
   props.setIndexing(
        dataaaa
     )
    // if (VideoListGetData) {
    //   if (VideoListGetData.VideoListSuccess) {
    //     // console.log('Data',VideoListGetData.data)
    //   }
    // }
  });

  useEffect(() => {
    if (props.data == '') {
      setIsLoading(true)
    }
    // else if (props){
    //   console.log('propsAllData',props)
    // }
    else {
      setIsLoading(true)
      const VideoDetail = props.data;
      const VDLink = VideoDetail;
      const VideoIndex = props.dataindex;
      if(VideoIndex == undefined){
      setMediaLink(VDLink);
      setIsLoading(false)
      }else{
        // console.log('VideoLength',VideoIndex)
        setCurrentVideoIndex(VideoIndex)
        props.setIndexing(VideoIndex)
        
      }
    }
  }, [props.data]);

  // useEffect(()=>{
  //     console.log('mediaLink',mediaLink)
  // },[mediaLink])

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

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds.toFixed(0)}`;
  };
  const handleSeek = (value) => {
    setCurrentTime(value);
    videoRef.current.seek(value);
  };

  const handleSeeking = () => {
    setSeeking(true);
  };

  const handleSeeked = () => {
    setSeeking(false);
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

  const FullscreenToggle = () => {
    if (orientation == PORTRAIT) {
      Orientation.lockToLandscape();
      console.log("10:", orientation);
    } else if (orientation == PORTRAIT) {
      Orientation.lockToPortrait();

      console.log("11:", orientation);
    }
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  const AutoChangeVideo = () =>{
    // Topic.VideoChangeHandle()
    
    console.log('indexing',currentVideoIndex)
    if (currentVideoIndex < mediaLink.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      videoRef.current.seek(0);
      setIsLoading(false)
      // videoRef.current.play();
      
    }
  }

  
  return (
    <>
      {/* <StatusBar
        hidden={true}
        barStyle={"dark-content"}
        translucent
        backgroundColor="transparent"
      /> */}
      
      <View
        style={[
          VideoPlayerStyle.MVContainer,
          {
            // justifyContent: "center",
            // alignItems: "center",
            flex: orientation === "PORTRAIT" ? 1 : 1,
            // borderColor:'red',
            // borderWidth:2,
            // alignContent:"center",
            // borderRadius: RFPercentage(2),
            // height: "90%",
            // backgroundColor:'red',
            // justifyContent:"center",
            // alignContent:"center",
            // overflow: "hidden",
            // justifyContent:"center",
            // backgroundColor:'yellow',
            // borderRadius:RFPercentage(6),
            // backgroundColor:"red",
          },
        ]}
      >
        {/* {console.log('MediaLIst',mediaLink[currentVideoIndex]?.ListData)} */}
        <Video
          source={{ uri: mediaLink[currentVideoIndex] }}          
          // source={{uri : 'https://s3.ap-southeast-1.amazonaws.com/aurora.edupops.com/new-video/599934591661153147.mp4'}}
          // source={{uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",}}
          // source={require("../../assets/Video/MyMovie20.mov")}
          // muted={true}
          // repeat={true}
          ref={videoRef}          
          // isMuted={isMuted}
          // resizeMode={'stretch'}
          resizeMode={orientation === "PORTRAIT" ? "stretch" : "stretch"}
          onProgress={({ currentTime }) => setCurrentTime(currentTime)}
          // onEnd={() => setPaused(true)}
          onEnd ={() => AutoChangeVideo()}
          onLoad={({ duration }) => setDuration(duration)}
          paused={paused}
          fullscreenAutorotate={true}
          // fullscreenOrientation={'all'}
          style={{
            // fullScreen == true ? styles.fullVideoScreen : styles.normalvideo
            // }
            borderRadius:
              orientation === "PORTRAIT" ? RFPercentage(2) : RFPercentage(0),
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
        {/* <TouchableOpacity 
          style={{backgroundColor:'blue'}}
        > */}
        
        {showControls && (
          <TouchableOpacity
            onPress={toggleControls}
            style={{
              flex: 1,
              // height:'50%',
              width: "100%",
              // alignItems:'center',
              position: "relative",              
              // top:RFPercentage(5),
              marginTop:RFPercentage(6),
              justifyContent:
                fullScreen == true ? "space-evenly" : "space-between",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()} 
              style={{marginHorizontal:RFValue(14)}}
            >
              <Image
                resizeMode="contain"
                source={IMAGE.LeftSideIcon}
                style={InnerStyle.DrawerIconStyle}
              />
            </TouchableOpacity>
              {/* {
              orientation === 'PORTRAIT' ?
              null :
              <TouchableOpacity 
                onPress={() =>Orientation.lockToPortrait()}
              >
                <Image 
                   resizeMode="contain"
                   source={IMAGE.LeftSideIcon}
                   style={InnerStyle.DrawerIconStyle}
                />
              </TouchableOpacity>
            } */}
            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "60%",
              }}
            >
              <TouchableWithoutFeedback onPress={handleSeekBack}>
                <Image
                  source={IMAGE.Reverse}
                  style={{ height: RFPercentage(6), width: RFPercentage(6) }}
                />
              </TouchableWithoutFeedback>
              <View
                style={{
                  height: RFPercentage(6),
                  width: RFPercentage(6),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {paused ? (
                  <TouchableWithoutFeedback onPress={handlePlayPause}>
                    <Image
                      source={IMAGE.VideoPlayIcon}
                      style={{
                        tintColor: "white",
                        height: RFPercentage(6),
                        width: RFPercentage(6),
                      }}
                    />
                  </TouchableWithoutFeedback>
                ) : (
                  <TouchableWithoutFeedback
                    onPress={handlePlayPause}
                    style={{}}
                  >
                    <Image
                      source={IMAGE.Pause}
                      style={{
                        tintColor: "white",
                        height: RFPercentage(5),
                        width: RFPercentage(5),
                      }}
                    />
                  </TouchableWithoutFeedback>
                )}
              </View>
              <TouchableWithoutFeedback onPress={handleSeekForward} style={{}}>
                <Image
                  source={IMAGE.Forward}
                  style={{ height: RFPercentage(6), width: RFPercentage(6) }}
                />
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "75%",
                  // justifyContent:"space-evenly",
                  // backgroundColor:'blue',
                }}
              >
                {!seeking && (
                  <Text style={{ color: "white" }}>
                    {formatTime(currentTime)}
                  </Text>
                )}
                <Slider
                  thumbStyle={{ height: 15, width: 15 }}
                  thumbTouchSize={{ height: 20, width: 20 }}
                  minimumTrackTintColor={"red"}
                  thumbTintColor={"red"}
                  maximumTrackTintColor={"white"}
                  minimumValue={0}
                  maximumValue={duration}
                  value={currentTime}
                  onValueChange={handleSeek}
                  style={{ width: "70%", alignContent: "flex-end" }}
                />
                {!seeking && (
                  <Text style={{ color: "white" }}>{formatTime(duration)}</Text>
                )}
              </View>
              <View style={{}}>
                {fullScreen == true ? (
                  <TouchableOpacity
                    onPress={() => Orientation.lockToLandscapeLeft()}
                  >
                    <Image
                      source={IMAGE.Fullscreen_exit}
                      style={{ width: 15, height: 15, tintColor: "white" }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => Orientation.lockToPortrait()}
                  >
                    <Image
                      source={IMAGE.Fullscreen_icon}
                      style={{
                        width: 15,
                        height: 15,
                        tintColor: "white",
                        right: RFValue(10),
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        {!showControls && (
          <TouchableOpacity
            onPress={toggleControls}
            style={{
              flex: 1,
              width: "100%",
              position: "relative",
              // backgroundColor:'red',
              justifyContent:
                fullScreen == true ? "space-around" : "space-between",
            }}
          ></TouchableOpacity>
        )}
        {/* </TouchableOpacity> */}
        {/* <FacebookPlayer
        mode="contain"
        initialPaused={paused}
        source={{uri : mediaLink}}
        style={{ aspectRatio:  16 / 9 }}
        customIcon={{
          fullscreenIcon: (
            <TouchableOpacity
              hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
              onPress={() => Orientation.lockToLandscape()}
            >
              <Image
                source={IMAGE.Fullscreen_icon}
                style={{ width: 15, height: 15, tintColor: "white" }}
              />
            </TouchableOpacity>
          ),
          exitFullscreenIcon: (
            <TouchableOpacity onPress={() => Orientation.lockToPortrait()}>
              <Image
                source={IMAGE.Fullscreen_exit}
                style={{ width: 15, height: 15, tintColor: "white" }}
              />
            </TouchableOpacity>
          ),        
          playIcon: (
            <View style={{height:RFPercentage(6),width:RFPercentage(6),alignItems:"center",justifyContent:"center"}}>

            <Image
              resizeMode="contain"
              source={IMAGE.VideoPlayIcon}
              style={{
                width: RFPercentage(6),
                height: RFPercentage(6),
                tintColor: "white",
              }}
              />
              </View>
          ),
          pauseIcon: (
            <View style={{height:RFPercentage(6),width:RFPercentage(6),alignItems:"center",justifyContent:"center"}}>
            <Image
              resizeMode="contain"
              source={IMAGE.Pause}
              style={{
                width: RFPercentage(5),
                height: RFPercentage(5),
                tintColor: "white",
              }}
            />
            </View>
          ),
          // replayIcon,
          // forwardIcon,
          // refreshIcon,
          // volumeOffIcon,
          // volumeUpIcon,
        }}
      /> */}
              {/* {isLoading ? (
        <ActivityIndicator
          color={"black"}
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}
          size={"large"}
        />
      ) : undefined} */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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

export default Videoplayer;
