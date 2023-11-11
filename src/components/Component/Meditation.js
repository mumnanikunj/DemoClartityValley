import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  BackHandler,
  FlatList,
  Animated,
  ImageBackground,
  ActivityIndicator,
} from "react-native";

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import InnerStyle from "./InnerStyle";
import * as IMAGE from "../../common/Image";
import * as Fonts from "../../common/Fonts";
import * as Colors from "../../common/colors";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { AudioAction } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import songs from "./MusicPlayer/data";
import { stat } from "fs";

const { width, height } = Dimensions.get("window");
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
    });
    await TrackPlayer.add(songs);
    console.log("mediaLink", songs);
  } catch (error) {
    console.log("StateError", error);
  }
};

const togglePlayBack = async (playBackState) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  console.log("logerror", currentTrack, playBackState, State.Playing);
  if (currentTrack != null) {
    if (playBackState == State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const Meditation = () => {
  const playBackState = usePlaybackState();
  const progress = useProgress();
  //   custom states
  const [songIndex, setsongIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState("off");
  const [trackTitle, setTrackTitle] = useState();
  const [isSeeking, setIsSeeking] = useState(false);
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();
  const [AudioAPiData, setAudioAPiData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  // custom referecnces
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  //   changing the track on complete
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title, artwork, artist } = track;
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });

  // const repeatIcon = () => {
  //     if (repeatMode == 'off') {
  //         return 'repeat-off';
  //     }

  //     if (repeatMode == 'track') {
  //         return 'repeat-once';
  //     }

  //     if (repeatMode == 'repeat') {
  //         return 'repeat';
  //     }
  // };

  // const changeRepeatMode = () => {
  //     if (repeatMode == 'off') {
  //         TrackPlayer.setRepeatMode(RepeatMode.Track);
  //         setRepeatMode('track');
  //     }

  //     if (repeatMode == 'track') {
  //         TrackPlayer.setRepeatMode(RepeatMode.Queue);
  //         setRepeatMode('repeat');
  //     }

  //     if (repeatMode == 'repeat') {
  //         TrackPlayer.setRepeatMode(RepeatMode.Off);
  //         setRepeatMode('off');
  //     }
  // };

  const skipTo = async (trackId) => {
    await TrackPlayer.skip(trackId);
  };

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  useEffect(() => {
    dispatch(AudioAction());
  }, []);
  const AudioData = useSelector((state) => state.Audio);

  useEffect(() => {
    if (AudioData) {
      setIsLoading(true);
      if (AudioData.AudioSuccess) {
        const AAPiData = AudioData.data.data;
        setAudioAPiData(AAPiData);
        // console.log('AudioApiData',AAPiData)
        setIsLoading(false);
      }
    }
  }, [AudioData]);

  useEffect(() => {
    setupPlayer();

    scrollX.addListener(({ value }) => {
      //   console.log(`ScrollX : ${value} | Device Width : ${width} `);

      const index = Math.round(value / width);
      skipTo(index);
      setsongIndex(index);

      //   console.log(`Index : ${index}`);
    });

    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.destroy();
    };
  }, []);

  const formatTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const renderSongs = ({ item, index }) => {
    return (
      <View>
        <Animated.View style={style.mainWrapper}>
          <View style={[style.imageWrapper, style.elevation]}>
            <Image
              //   source={item.artwork}
              source={require('../../assets/images/ImageTest3.jpeg')}
              style={style.musicImage}
            />
          </View>
        </Animated.View>
        <View style={{flex:1,justifyContent:"space-between",alignItems:'center'}}>
        <Text style={{color:Colors.White,fontFamily:Fonts.SemiBold,fontSize:RFValue(14)}}>{item.media_title}</Text>
        <Text style={{color:Colors.White,fontFamily:Fonts.SemiBold,fontSize:RFValue(14)}}>{item.id}</Text>
        </View>
      </View>
    );
  };
  const navigation = useNavigation();

  return (
    <>
      <View style={style.container}>
        <StatusBar
          hidden={false}
          barStyle={"light-content"}
          translucent
          backgroundColor="transparent"
        />

        <ImageBackground
          source={IMAGE.Meditation}
          style={{ display: "flex", height: height / 2.2, width: width }}
        >
          <View
            // style={InnerStyle.HeaderMainStyle}
            style={{
              marginTop: RFPercentage(7),
              paddingHorizontal: RFValue(14),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                TrackPlayer.reset() && navigation.goBack();
              }}
            >
              <Image
                resizeMode="contain"
                source={IMAGE.LeftSideIcon}
                // style={InnerStyle.DrawerIconStyle}
                style={{
                  height: RFPercentage(3),
                  width: RFPercentage(3),
                }}
              />
            </TouchableOpacity>
            <Text
              // style={InnerStyle.HeaderTitle}
              style={{
                justifyContent: "center",
                fontFamily: Fonts.Bold,
                color: Colors.White,
                fontSize: RFValue(17),
              }}
            >
              Meditation
            </Text>
            <View
              // style={InnerStyle.BlankSpace}
              style={{
                height: RFPercentage(3),
                width: RFPercentage(3),
              }}
            ></View>
          </View>

          <View
            // style={InnerStyle.Medi_headerContainer}
            style={{
              padding: RFValue(14),
              paddingTop: RFPercentage(2),
            }}
          >
            <Text
              // style={InnerStyle.Medi_headerSubText}
              style={{
                color: Colors.White,
                fontSize: RFValue(25),
                fontFamily: Fonts.Regular,
                marginTop: RFValue(10),
              }}
            >
              Your Meditation{" "}
            </Text>
            <Text
              // style={InnerStyle.Medi_headerText}
              style={{
                color: Colors.White,
                fontSize: RFValue(35),
                fontFamily: Fonts.Bold,
              }}
            >
              Journey
            </Text>
          </View>
        </ImageBackground>
        <View
          // style={InnerStyle.SessionCard}
          style={{
            display: "flex",
            height: height / 1.3,
            backgroundColor: Colors.DarkBlue,
            alignItems: "center",
            marginTop: -RFPercentage(20),
            borderRadius: RFValue(50),
            paddingVertical: RFValue(25),
          }}
        >
          {AudioAPiData != "" ? (
            <View style={{ height: height / 2 }}>
              <Animated.FlatList
                ref={songSlider}
                renderItem={renderSongs}
                data={songs}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                  [
                    {
                      nativeEvent: {
                        contentOffset: { x: scrollX },
                      },
                    },
                  ],
                  { useNativeDriver: true }
                )}
              />

              {/* Title & Artist Name */}
              <View style={{ alignItems: "center" }}>
                <View>
                  <Text style={[style.songContent, style.songTitle]}>
                    {
                      /* {songs[songIndex].title} */
                      // AudioAPiData[0]?.media_title
                    }
                  </Text>
                  <Text style={[style.songContent, style.songArtist]}>
                    {
                      /* {songs[songIndex].artist} */
                      // AudioAPiData[0].review[0].get_user.name
                    }
                  </Text>
                </View>

                <View style={{ alignItems: "center" }}>
                  <Slider
                    style={style.progressBar}
                    value={progress.position}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    thumbTintColor="#FFD369"
                    minimumTrackTintColor="#FFD369"
                    maximumTrackTintColor="#fff"
                    onSlidingComplete={async (value) => {
                      await TrackPlayer.seekTo(value);
                    }}
                  />

                  {/* Progress Durations */}
                  <View style={style.progressLevelDuraiton}>
                    <Text style={style.progressLabelText}>
                      {/* {new Date(progress.position * 1000)
                                        .toLocaleTimeString()
                                        .substring(3)} */}
                      {formatTime(isSeeking ? seek : progress.position)}
                    </Text>
                    <Text style={style.progressLabelText}>
                      {/* {new Date((progress.duration - progress.position) * 1000)
                                        .toLocaleTimeString()
                                        .substring(3)} */}
                      {formatTime(progress.duration)}
                    </Text>
                  </View>
                </View>
                <View style={style.musicControlsContainer}>
                  <TouchableOpacity onPress={skipToPrevious}>
                    <Ionicons
                      name="play-skip-back-outline"
                      size={35}
                      color="#FFD369"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => togglePlayBack(playBackState)}
                  >
                    <Ionicons
                      name={
                        playBackState === State.Playing
                          ? "ios-pause-circle"
                          : "ios-play-circle"
                      }
                      size={75}
                      color="#FFD369"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={skipToNext}>
                    <Ionicons
                      name="play-skip-forward-outline"
                      size={35}
                      color="#FFD369"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* <SliderComp /> */}

              {/* <Controller onNext={goNext} onPrv={goPrv} /> */}
            </View>
          ) : (
            <View style={{ height: windowHeight / 2 }}>
              <Text
                style={{
                  color: Colors.White,
                  fontSize: RFValue(14),
                  fontFamily: Fonts.SemiBold,
                }}
              >
                No Songs
              </Text>
            </View>
          )}
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
          color={"white"}
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
};
export default Meditation;

const style = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: "center",
    // fontWeight: '600',
    textTransform: "capitalize",
    color: "#ffffff",
  },
  artist: {
    fontSize: 18,
    textAlign: "center",
    color: "#ffffff",
    textTransform: "capitalize",
  },
  container: {
    // flex: 1,
    backgroundColor: "#222831",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSection: {
    borderTopColor: "#393E46",
    borderWidth: 1,
    width: width,
    alignItems: "center",
    paddingVertical: 15,
  },

  bottomIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  mainWrapper: {
    height: height / 4,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  imageWrapper: {
    width: RFPercentage(20),
    height: RFPercentage(20),
    // marginBottom: 10,
  },
  musicImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  elevation: {
    elevation: 5,

    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songContent: {
    textAlign: "center",
    color: "#EEEEEE",
  },
  songTitle: {
    fontSize: 18,
    // fontWeight: '600',
  },

  songArtist: {
    fontSize: 16,
    // fontWeight: '300',
  },

  progressBar: {
    width: 350,
    height: 40,
    // marginTop: 25,
    flexDirection: "row",
  },
  progressLevelDuraiton: {
    width: 340,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelText: {
    color: "#FFF",
  },

  musicControlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: width / 1.5,
    // marginTop: 15,
    // backgroundColor:"red",
    // width: '50%',
  },
  // container: {
  //     // justifyContent: 'space-evenly',
  //     // alignItems: 'center',
  //     // height: height,
  //     // maxHeight: 600,
  // },
});
