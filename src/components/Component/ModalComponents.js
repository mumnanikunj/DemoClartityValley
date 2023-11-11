import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Animated,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StatusBar,
  Button,
  Pressable,
  Platform,
  BackHandler,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import Toast from "react-native-simple-toast";
import { Rating } from "react-native-ratings";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from "../../common/colors";
import * as IMAGE from "../../common/Image";
import * as Fonts from "../../common/Fonts";
import { AuthStyle } from "../Auth/AuthStyle";
import { InnerStyle } from "./InnerStyle";
import { NotesStyle } from "../SubComponent/NotesStyle";
import Orientation, {
  useOrientationChange,
  useDeviceOrientationChange,
  useLockListener,
  LANDSCAPE_RIGHT,
  PORTRAIT,
  PORTRAIT_UPSIDE_DOWN,
} from "react-native-orientation-locker";

import { VideoPlayerStyle } from "./VideoPlayerStyle";
import Videoplayer from "./VideoPlayer";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNoteAction,
  LikeAction,
  ReviewAction,
  VideoAction,
  ViewAction,
  RecoMediaAction,
} from "../../redux/action";
import { stat } from "fs";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;
const data = [
  {
    Name: "The Breathe",
    Disc: "Breathe Lorem ipsum Lorem ipsum Lorem",
    Time: "24",
    CoverImg: require("../../assets/images/icons/Vl_1.webp"),
    Video: require("../../assets/Video/MyMovie20.mov"),
    Type: "Relaxing",
  },
  {
    Name: "The WakeUp",
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
    CoverImg: require("../../assets/images/icons/Vl_1.webp"),
  },
  {
    Name: "Calm",
    Disc: "Relax Lorem ipsum Lorem ipsum Lorem",
    Time: "12",
    Type: "Calm",
    CoverImg: require("../../assets/images/icons/VL-3.jpeg"),
  },
];

export default function ModalComponents(props) {
  const [title, setTitle] = useState();
  const [notes, setNotes] = React.useState("");
  const [ratings, setRatings] = useState(0);
  const [date, setDate] = useState(moment().format("Y-M-D"));
  const [isLoading, setIsLoading] = useState(true);
  const [VideoData, setVideoData] = useState([]);
  // const [dateStore , setDateStore] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [Review, setReview] = useState(false);
  const [like, setLike] = useState(false);
  const [up, setUp] = useState(false);
  const [isLocked, setLocked] = useState();
  const [orientation, setOrientation] = useState();
  const [deviceOrientation, setDeviceOrientation] = useState();
  const [time, setTime] = useState(moment().format("h:m"));
  const [selectTime, setSelectTime] = useState(moment().format("h:m"));
  const [selectDate, setSelectDate] = useState(moment().format("Y-M-D"));
  const [TimepickerVisible, setTimepickerVisible] = useState(false);
  const [DatepickerVisible, setDatepickerVisible] = useState(false);
  const [changestate, setChangeState] = useState(false);
  const [ChangeVideo, setChangeVideo] = useState();
  const [recodata , setRecoData] = useState('');
  const [comment, setComment] = useState("");
  const [reviewData, setReviewData] = useState("");
  const [commonData , setCommonData] = useState('');
  const dispatch = useDispatch();
  const [id, setId] = useState();
  useOrientationChange((o) => {
    setOrientation(o);
  });

  useDeviceOrientationChange((o) => {
    setDeviceOrientation(o);
  });

  function checkLocked() {
    const locked = Orientation.isLocked();
    if (locked !== isLocked) {
      setLocked(locked);
    }
  }

  const closeOrientation = () => {
    Orientation.lockToPortrait();
    const initial = Orientation.getInitialOrientation();
    console.log("inital oreintation=>", initial);
    setReview(!Review);
  };
  useEffect(() => {
    Orientation.unlockAllOrientations();
    checkLocked();
    setId(props.id);
    return () => {
      BackHandler.addEventListener("hardwareBackPress", closeOrientation());
      BackHandler.removeEventListener("hardwareBackPress", closeOrientation());
    };
  }, []);
  const close = () => {
    setReview(!Review);
  };

  useEffect(()=>{
    dispatch(RecoMediaAction())
  },[])
  const RecoData = useSelector((state) => state.RecoMedia)

  useState(()=>{
    if(RecoData){
      if(RecoData.RecommendedSuccess){
        const RData = RecoData.data.data
        setRecoData(RData)
        setIsLoading(false);
      }
    }
  },[])

  useEffect(() => {
    dispatch(VideoAction());
  }, []);

  const VideoListGetData = useSelector((state) => state.VideoList);

  useEffect(() => {
    if (VideoListGetData) {
      if (VideoListGetData.VideoListSuccess) {
        const VData = VideoListGetData.data.data;
        setVideoData(VData);
        setIsLoading(false);
        setReviewData(VData[0].review);
        // console.log("VideoDateList", reviewData);
      }
    }
  }, [VideoListGetData]);

  useEffect(() => {
    if (props.fData) {
      setCommonData(props.fData)
    } else if (props.data) {
      const IdStore = props.data.id;
      setCommonData(props.data)
      // console.log("PropsData", props.data);
    }
    else if(props.ExploreData){
        setCommonData(props.ExploreData)
    }
    else if(props.HData){
        setCommonData(props.HData)
    }
    else if (props.MostView){
      setCommonData(props.MostView)
      // console.log('DATA',props.MostView.media)
    }
  });


  const PostReview = () => {
    console.log("RatingApi", ratings);
    dispatch(
      ReviewAction({
        media_id: ChangeVideo.id,
        rating: ratings,
        review: comment,
      })
    );
    setComment("");
  };

  const ReviewGetData = useSelector((state) => state.Review);

  useEffect(() => {
    // console.log("ReviewGet", ReviewGetData);
  }, [ReviewGetData]);

  const SaveData = async () => {
    if (notes != "" && title != "") {
      dispatch(
        AddNoteAction({
          title: title,
          description: notes,
          date: date,
          time: time,
        })
      );
      // setIsLoading(true)
      setTitle({ title: "" });
      setNotes({ notes: "" });
      setModalVisible(!modalVisible);
      Toast.showWithGravity(
        "notes addes successfully",
        Toast.LONG,
        Toast.BOTTOM
      );
    }
  };

  const ChangeVideohandle = (item, index) => {
    setChangeVideo(item);
    setChangeState(true);
    setId(index);
    CounterVideo(item)
  };

  const CounterVideo = async(item) =>{
  let AccessT = await AsyncStorage.getItem('AccessToken')
  let VDId = item.id
  dispatch(ViewAction({
    user_id : AccessT ,
    media_id : VDId, 
    }))

  }

  // const counterData = useSelector((state)=>state.View)
  // useEffect(()=>{
  //   console.log('ChangeVideoData',counterData)
  // })

  const V = id;
  const navigation = useNavigation();

  function NextVideoList_V() {
    const navigation = useNavigation();
    const renderItem = ({ item, index }) => (
      <View>
        {index < 2 ? (
          <View style={{ flexDirection: "row" }}>
            <View
              style={[
                InnerStyle.NextvideoList,
                index == id ? { display: "none" } : null,
              ]}
            >
              <Image
                source={{ uri: item.media_thumb_img }}
                style={InnerStyle.NextvideoImage}
              />
            </View>
            <View
              style={[
                InnerStyle.NextvideoDetails,
                index == id ? { display: "none" } : null,
              ]}
            >
              <View style={InnerStyle.NvView}>
                <TouchableOpacity>
                  <Text style={InnerStyle.NvV_Text} numberOfLines={2}>{item.media_title}</Text>
                  <Text style={[InnerStyle.NvV_Type,{color:Colors.Black}]}>
                    Type:{item.media_type}
                  </Text>

                  <View style={InnerStyle.NvDetails}>
                    <Image
                      source={IMAGE.ClockIcon}
                      style={[VideoPlayerStyle.ClockIcon,{tintColor : Colors.Black}]}
                    />

                    <Text style={[InnerStyle.NvV_Clock,{color:Colors.Black}]}>{item.Time} Min</Text>
                  </View>
                  <View style={InnerStyle.NvDetails}>
                    <Image
                      source={IMAGE.star}
                      style={VideoPlayerStyle.RateIcon}
                    />

                    <Text style={[InnerStyle.NvV_Rate,{color:Colors.Black}]}>{item.avg_rating}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={InnerStyle.NvPlayView}>
                <TouchableOpacity
                  onPress={() => {
                    ChangeVideohandle(item, index);
                  }}
                >
                  <View style={InnerStyle.NvPlayBtn}>
                    <Text style={InnerStyle.NvV_Play}>Play</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <View style={InnerStyle.NextvideoList}>
              <TouchableOpacity>
                <Image
                  source={item.CoverImg}
                  style={InnerStyle.NextvideoImage}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                InnerStyle.NextvideoDetails,
                index == id ? { display: "none" } : null,
              ]}
            >
              <View style={InnerStyle.NVViewL}>
                <TouchableOpacity>
                  <Text style={InnerStyle.NvV_Text}>{item.Name}</Text>
                  <Text style={InnerStyle.NvV_Type}>Type:{item.Type}</Text>

                  <View style={InnerStyle.NvDetails}>
                    <Image
                      source={IMAGE.ClockIcon}
                      style={VideoPlayerStyle.ClockIcon}
                    />

                    <Text style={InnerStyle.NvV_Clock}>{item.Time} Min</Text>
                  </View>
                  <View style={InnerStyle.NvDetails}>
                    <Image
                      source={IMAGE.star}
                      style={VideoPlayerStyle.RateIcon}
                    />

                    <Text style={InnerStyle.NvV_Rate}>3.5</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={InnerStyle.NVPlayLock}>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "You have to Purchase plan to have Full Access",
                      "",
                      [
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
                      ]
                    )
                  }
                >
                  <View style={InnerStyle.NPlayLock}>
                    <View style={InnerStyle.NvTview}>
                      <Text style={InnerStyle.NvV_Play}>Play</Text>
                    </View>
                    <View style={InnerStyle.NvTview}>
                      <Image
                        source={IMAGE.lock}
                        style={InnerStyle.NextvideoImage_lock}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    );

    return (
      <View style={InnerStyle.NextVideo}>
        {VideoData != "" ? (
          <FlatList
            data={VideoData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : null}
      </View>
    );
  }
  function NextVideoList_H() {
    const navigation = useNavigation();
    const renderItem2 = ({ item, index }) => (
      <View>
        {index < 2 ? (
          <View >
            <View
              style={[
                InnerStyle.NextvideoList2,
                index == id ? { display: "none" } : null,
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  setId(index);
                }}
              >
                <Image
                    source={{ uri: item.media_thumb_img }}
                  style={InnerStyle.NextvideoImage2}
                />
              </TouchableOpacity>

              <View style={{ justifyContent: "center", alignItems: "center"}}>
                <Text style={InnerStyle.NvV_Text2} numberOfLines={1} >{item.media_title}</Text>
              </View>
            </View>
            {/* <View style={[InnerStyle.NextvideoDetails2, index == id ? { display: 'none' } : null]}>

                            <Pressable>

                            </Pressable>

                        </View> */}
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "You have to Purchase plan to have Full Access",
                  "",
                  [
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
                  ]
                )
              }
            >
              <View
                style={[
                  InnerStyle.NextvideoList2,
                  index == id ? { display: "none" } : null,
                ]}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setId(index);
                    }}
                  >
                    <Image
                      source={item.CoverImg}
                      style={InnerStyle.NextvideoImage2}
                    />
                  </TouchableOpacity>

                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={InnerStyle.NvV_Text2}>{item.Name}</Text>
                  </View>

                  <Image
                    source={IMAGE.lock}
                    style={InnerStyle.NextvideoImage_lock2}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );

    return (
      <View style={InnerStyle.NextVideo}>
        {VideoData != "" ? (
          <FlatList
            data={recodata}
            horizontal={true}
            renderItem={renderItem2}
            keyExtractor={(item) => item.id}
          />
        ) : null}
      </View>
    );
  }

  const showTimePicker = () => {
    setTimepickerVisible(true);
  };
  const hideTimePicker = () => {
    setTimepickerVisible(false);
    hideDatePicker();
  };
  const TimehandleConfirm = (time) => {
    hideTimePicker();
    setSelectTime(moment(time).format("h:mm a"));
  };

  const showDatepicker = () => {
    setDatepickerVisible(true);
  };
  const hideDatePicker = () => {
    setDatepickerVisible(false);
  };
  // const handleConfirm = (date) => {
  //     // setSelectDate({ selectDate: moment(date).format('DD/MM/YYYY') })
  //     hideDatePicker();
  // }
  const handleConfirm = (date) => {
    setSelectDate(moment(date).format("DD MMM,YY"));
    hideDatePicker();
  };

  const LikeButton = () => {
    setLike(!like);
    if (changestate == "") {
    } else {
      dispatch(
        LikeAction({
          media_id: ChangeVideo.id,
          status: 1,
        })
      );
    }
  };

  const PostRating = (rating) => {
    var RateVideo = rating;
    setRatings(RateVideo);
  };

  // const VideoListGetData = useSelector((state)=> state.VideoList)

  const ReviewRander = () => {
    if (reviewData == "") {
    } else {
      return reviewData.map((element, index) => {
        return (
          <View
            style={{
              backgroundColor: Colors.DarkBlueish,
              padding: RFPercentage(2),
              borderRadius: RFPercentage(2),
            }}
          >
            <Text
              style={{
                color: Colors.White,
                fontFamilye: Fonts.SemiBold,
                fontSize: RFValue(12),
              }}
            >
              {element.media_id}
            </Text>
            <Text
              style={{
                color: Colors.White,
                fontFamilye: Fonts.SemiBold,
                fontSize: RFValue(12),
              }}
            >
              {element.review}
            </Text>
          </View>
        );
      });
    }
  };

  return (
    <>

      <View style={InnerStyle.MC_MainContainer}>
        <StatusBar
          hidden={true}
          barStyle={"light-content"}
          translucent
          backgroundColor="transparent"
        />
        <View style={[InnerStyle.VideoPlayerContainer,{flex:0.5,}]}>
          <Videoplayer Videodata={commonData} />
        </View>
        {orientation === PORTRAIT ? (
          <View style={{ flex: 1.4 }}>
            <View style={VideoPlayerStyle.Video_DetailsView}>
              <View style={AuthStyle.VideoHeaderViewStyle}>
                <Text style={[AuthStyle.VideoTitleTextStyle,{color:Colors.Black}]}>{changestate == true ? ChangeVideo.media_title  : props.data ? props.data.media_title : props.ExploreData ? props.ExploreData.name : props.HData ? props.HData.get_media.media_title : commonData.media_title}</Text>
                <TouchableOpacity onPress={() => setUp(!up)} 
                  style={{alignSelf:"flex-start"}}
                >
                  {up ? (
                    <Image
                      source={IMAGE.arrow_Up}
                      style={[AuthStyle.LikeBtnStyle,{tintColor : Colors.Black}]}
                    />
                  ) : (
                    <Image
                      source={IMAGE.arrow_Down}
                      style={[AuthStyle.LikeBtnStyle,{tintColor : Colors.Black}]}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={[InnerStyle.HoursText,{color: Colors.Black}]}>
                {" "}
                <Image
                  source={IMAGE.Play}
                  style={{
                    height: 10,
                    width: 10,
                    borderWidth: 2,
                    borderColor: "#929395",
                    borderRadius: 2,
                    tintColor : Colors.Black,
                  }}
                />{" "}
                Meditate : 1 Hour 45 Minute
              </Text>
              <View style={VideoPlayerStyle.V_TitleView}>
                <Rating
                  startingValue={0}
                  minValue={1}
                  defaultRating={1}
                  type="custom"
                  ratingColor="orange"
                  ratingBackgroundColor="grey"
                  tintColor={Colors.White}
                  ratingCount={5}
                  imageSize={RFValue(20)}
                  onFinishRating={PostRating}
                  style={VideoPlayerStyle.V_Rating}
                />

                {/* <TouchableOpacity
                                    onPress={() => setReview(true)}
                                >
                                    <Image
                                        source={IMAGE.CommentIcon}
                                        style={VideoPlayerStyle.CommentIcon}
                                    />
                                </TouchableOpacity> */}
                <Modal
                  visible={Review}
                  transparent
                  animationType="slide"
                  useNativeDriver={true}
                  backdropColor={"transparent"}
                  onSwipeComplete={close}
                  useNativeDriverForBackdrop
                  swipeDirection={["down"]}
                  onRequestClose={() => {
                    setReview(!Review);
                  }}
                  style={{
                    margin: 0,
                  }}
                >
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" && "padding"}
                    style={{ flex: 1 }}
                  >
                    <View style={VideoPlayerStyle.MainReviewContainer}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TouchableOpacity
                          style={{}}
                          onPress={() => setReview(!Review)}
                        >
                          <Image
                            source={IMAGE.ArrowDown}
                            style={VideoPlayerStyle.ArrowDown}
                          />
                        </TouchableOpacity>
                        <Text style={VideoPlayerStyle.ReviewText}>Review</Text>
                        <View
                          style={[
                            VideoPlayerStyle.BlankSpace,
                            { marginRight: RFPercentage(2), marginTop: 0 },
                          ]}
                        ></View>
                      </View>
                      <View style={VideoPlayerStyle.ReviewTextInput}>
                        <View style={{}}>
                          <ScrollView style={{ height: windowHeight / 1.26 }}>
                            <View
                              style={{
                                backgroundColor: "Red",
                                marginHorizontal: RFPercentage(2),
                              }}
                            >
                              {ReviewRander()}
                            </View>
                          </ScrollView>
                        </View>
                      </View>
                    </View>
                    <View style={VideoPlayerStyle.ReviewTextInputModal}>
                      <TextInput
                        value={comment}
                        onChangeText={(val) => setComment(val)}
                        style={VideoPlayerStyle.R_Modal_Text}
                        placeholderTextColor={"white"}
                        keyboardType={"default"}
                        // multiline
                      />
                      <TouchableOpacity onPress={() => PostReview()}>
                        <Image
                          source={IMAGE.SendIcon}
                          style={VideoPlayerStyle.SendIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </KeyboardAvoidingView>
                </Modal>
              </View>

              <View style={VideoPlayerStyle.menuBar}>
                <TouchableOpacity
                  style={[VideoPlayerStyle.menuBarBtn2,{borderWidth:2,borderColor : 'rgb(230,227,224)'}]}
                  onPress={() => LikeButton()}
                >
                  <Image
                    source={!like ? IMAGE.lHeart_Icon : IMAGE.lHeart_Icon_fill}
                    style={[
                      VideoPlayerStyle.LikeIcon,
                      like ? { tintColor: "red" } : {tintColor : Colors.Black},
                      
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[VideoPlayerStyle.menuBarBtn2,{borderWidth:2,borderColor : 'rgb(230,227,224)'}]}
                  onPress={() => setReview(true)}
                >
                  <Image
                    source={IMAGE.CommentIcon}
                    style={[VideoPlayerStyle.ReviewIcon,{tintColor : Colors.Black}]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[VideoPlayerStyle.menuBarBtn2,{borderWidth:2,borderColor : 'rgb(230,227,224)'}]}
                  onPress={() => setModalVisible(true)}
                >
                  <Image
                    source={IMAGE.NotesImage}
                    style={[VideoPlayerStyle.NotesIcon,{tintColor : Colors.Black}]}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity style={VideoPlayerStyle.menuBarBtn2}
                                    onPress={() => setModalVisible(true)}
                                >
                                    <Image
                                        source={IMAGE.download_icon}
                                        style={VideoPlayerStyle.DownloadIcon}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={VideoPlayerStyle.menuBarBtn2}
                                    onPress={() => setModalVisible(true)}
                                >
                                    <Image
                                        source={IMAGE.share}
                                        style={VideoPlayerStyle.ShareIcon}
                                    />
                                </TouchableOpacity> */}

                <Modal
                  visible={modalVisible}
                  transparent
                  animationType="fade"
                  useNativeDriver={true}
                  backdropColor={"transparent"}
                  useNativeDriverForBackdrop
                  swipeDirection={["fade"]}
                  onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <TouchableWithoutFeedback
                    accessible={false}
                    onPress={() => Keyboard.dismiss()}
                  >
                    <View style={NotesStyle.ModalMainViewStyle}>
                      <View style={NotesStyle.ModalInnerMainstyle}>
                        <TouchableOpacity
                          style={VideoPlayerStyle.CrossImgContainer}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Image
                            source={IMAGE.CrossIcon}
                            style={[
                              NotesStyle.CommonIConStyle,
                              { tintColor: Colors.Black },
                            ]}
                          />
                        </TouchableOpacity>
                        <TextInput
                          value={title}
                          onChangeText={(text) => setTitle(text)}
                          style={NotesStyle.TitleTextinputStyle}
                          placeholder={"EnterTitle..."}
                          placeholderTextColor="grey"
                          keyboardType={"default"}
                        />

                        <TextInput
                          style={NotesStyle.TextInputStyle}
                          multiline={true}
                          placeholder={"Start typing"}
                          placeholderTextColor="grey"
                          value={notes}
                          onChangeText={(notes) => setNotes(notes)}
                        />

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            marginVertical: RFPercentage(1),
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              borderColor: Colors.LigthBlue,
                              borderWidth: 1,
                              padding: RFPercentage(1),
                              borderRadius: RFPercentage(1),
                            }}
                            onPress={showTimePicker}
                          >
                            <Text>{selectTime.toString()}</Text>
                          </TouchableOpacity>
                          <DateTimePickerModal
                            isVisible={TimepickerVisible}
                            mode="time"
                            format={"h:mm a"}
                            onConfirm={TimehandleConfirm}
                            onCancel={hideTimePicker}
                            // minimumDate={this.state.time}
                            value={time}
                            onChange={(time) => {
                              setSelectTime(time);
                            }}
                          />
                          <TouchableOpacity
                            onPress={showDatepicker}
                            style={{
                              borderColor: Colors.LigthBlue,
                              borderWidth: 1,
                              padding: RFPercentage(1),
                              borderRadius: RFPercentage(1),
                            }}
                          >
                            <Text>{selectDate.toString()}</Text>
                          </TouchableOpacity>
                          <DateTimePickerModal
                            isVisible={DatepickerVisible}
                            mode="date"
                            format={"DD MMM,YY"}
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            // minimumDate={this.state.date}
                            value={date.toString()}
                            onChange={(date) => {
                              setSelectDate(date);
                            }}
                          />
                        </View>

                        <View style={NotesStyle.BottomButtonView}>
                          <TouchableOpacity
                            style={NotesStyle.BottomButton}
                            onPress={() => setNotes("")}
                          >
                            <Text style={VideoPlayerStyle.notesBtn}>Clear</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            disabled={notes == ""}
                            onPress={() => SaveData()}
                            style={[
                              NotesStyle.BottomButton,
                              {
                                backgroundColor:
                                  notes == ""
                                    ? Colors.LigthBlue
                                    : Colors.ButtonBlue,
                              },
                            ]}
                          >
                            <Text style={VideoPlayerStyle.notesBtn}>Save</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
              </View>
            </View>
            {up ? (
              <ScrollView>
                <View style={{ paddingHorizontal:RFValue(14), paddingTop: 0 }}>
                  <View style={VideoPlayerStyle.modalDescription}>
                    <Text style={[VideoPlayerStyle.modalDescriptionText,{color:Colors.Black}]}>
                      {/* <Text style={InnerStyle.VC_DescriptionText}>{data[V].Disc},
                                    </Text> */}
                      is dummy text used in laying out print, graphic or web
                      designs. The passage is attributed to an unknown
                      typesetter in the 15th century who is thought to have
                      scrambled parts of Cicero's De Finibus Bonorum et Malorum
                      for use in a type specimen book. It usually begins with
                    </Text>
                  </View>
                  <View>
                    {/* <View style={InnerStyle.innerBottomButtonViewStyle}>
                      <TouchableOpacity
                        style={InnerStyle.ButtnViewCommonStyle2}
                      >
                        <Image
                          source={IMAGE.TimeCircleIcon}
                          style={InnerStyle.CommonImageStyle}
                        />
                        <Text style={InnerStyle.CommonButtonTextStyle}>
                          Book A 1-1 Session
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={InnerStyle.ButtnViewCommonStyle}
                        onPress={() => {
                          onDownloadImagePress();
                        }}
                      >
                        <Image
                          source={IMAGE.DownloadIcon}
                          style={InnerStyle.CommonImageStyle}
                        />
                        <Text style={InnerStyle.CommonButtonTextStyle}>
                          Downloadable info
                        </Text>
                      </TouchableOpacity>
                    </View> */}
                  </View>
                  <View>
                    <View style={InnerStyle.NextvideoContainer}>
                      <Text style={[InnerStyle.NvC_Text,{paddingHorizontal: RFValue(0),}]}>Up Next</Text>
                      <Image source={IMAGE.Play} style={InnerStyle.NextImg} />
                    </View>
                  </View>
                </View>
                <NextVideoList_H />
              </ScrollView>
            ) : null}

            {!up ? (
              <View>
                <View style={InnerStyle.NextvideoContainer}>
                  <Text style={InnerStyle.NvC_Text}>Up Next</Text>
                  <Image source={IMAGE.Play} style={InnerStyle.NextImg} />
                </View>
              </View>
            ) : null}
            {!up ? <NextVideoList_V /> : null}
          </View>
        ) : null}
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
}
const styles = StyleSheet.create({
  // NotesModal: {
  //     height: windowHeight / 2,
  //     backgroundColor: 'white',
  //     borderRadius: RFPercentage(3),
  // },
  // NotesModalContainer: {
  //     justifyContent: "center",
  //     marginHorizontal: RFPercentage(2),
  // },
  NotesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: RFPercentage(3),
  },
  NotesBtnContainer: {
    paddingVertical: RFPercentage(1.5),
    paddingHorizontal: RFPercentage(3),
    backgroundColor: Colors.LigthBlue,
    borderRadius: RFPercentage(2),
  },

  N_SaveBtn: {
    paddingVertical: RFPercentage(1.5),
    paddingHorizontal: RFPercentage(3),
    backgroundColor: "green",
    borderRadius: RFPercentage(2),
  },
});
