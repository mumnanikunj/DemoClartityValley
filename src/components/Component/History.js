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
  ActivityIndicator,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from "../../common/colors";
import * as IMAGE from "../../common/Image";
import { InnerStyle } from "./InnerStyle";
import Modal from "react-native-modal";
import ModalComponents from "./ModalComponents";
import Orientation, {
  useOrientationChange,
  useDeviceOrientationChange,
  useLockListener,
  LANDSCAPE_RIGHT,
  PORTRAIT,
  PORTRAIT_UPSIDE_DOWN,
} from "react-native-orientation-locker";
import { connect } from "react-redux";
import { HistoryAction, BGImageAction ,} from "../../redux/action";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { global } from "../../../global";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const { width, height } = Dimensions.get("window");

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      id: 0,
      isLoading: true,
      BG: "",
      HistoryApiData: [],
      SelectedData: [],
      DownloadData: [
        {
          Name: "Breathe",
          Disc: "Meditation ",
          Time: "55:32",
          Image: require("../../assets/images/StaticIcon/Breathe.jpeg"),
          Image1: require("../../assets/images/PlayIcon.png"),
        },
        {
          Name: "Wake Up",
          Disc: "Meditation ",
          Time: "1:10:10",
          Image: require("../../assets/images/StaticIcon/Relax.jpeg"),
          Image1: require("../../assets/images/PlayIcon.png"),
        },
        {
          Name: "Relax",
          Disc: "Meditation ",
          Time: "1:20:12",
          Image: require("../../assets/images/StaticIcon/WakeUp.jpeg"),
          Image1: require("../../assets/images/PlayIcon.png"),
        },
        {
          Name: "Anxiety",
          Disc: "Meditation ",
          Time: "1:01:32",
          Image: require("../../assets/images/StaticIcon/Anxiety.jpeg"),
          Image1: require("../../assets/images/PlayIcon.png"),
        },
        {
          Name: "Gratitude",
          Disc: "Meditation ",
          Time: "30:29",
          Image: require("../../assets/images/StaticIcon/Gratitude.jpeg"),
          Image1: require("../../assets/images/PlayIcon.png"),
        },
        {
          Name: "Breathe",
          Disc: "Meditation ",
          Time: "55:32",
          Image: require("../../assets/images/StaticIcon/Breathe.jpeg"),
          Image1: require("../../assets/images/PlayIcon.png"),
        },
        {
          Name: "Wake Up",
          Disc: "Meditation ",
          Time: "1:10:10",
          Image: require("../../assets/images/StaticIcon/Relax.jpeg"),
          Image1: require("../../assets/images/PlayIcon.png"),
        },
        {
          Name: "Relax",
          Disc: "Meditation ",
          Time: "1:20:12",
          Image: require("../../assets/images/StaticIcon/WakeUp.jpeg"),
          Image1: require("../../assets/images/PlayIcon.png"),
        },
        {
          Name: "Anxiety",
          Disc: "Meditation ",
          Time: "1:01:32",
          Image: require("../../assets/images/StaticIcon/Anxiety.jpeg"),
          Image1: require("../../assets/images/PlayIcon.png"),
        },
        {
          Name: "Gratitude",
          Disc: "Meditation ",
          Time: "30:29",
          Image: require("../../assets/images/StaticIcon/Gratitude.jpeg"),
          Image1: require("../../assets/images/PlayIcon.png"),
        },
      ],
    };
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps?.History) {
      if (nextProps?.History?.HistorySuccess) {
        if (nextProps?.History?.data) {
          let HistoryData = nextProps.History.data.data;
          this.setState({ HistoryApiData: HistoryData });
          this.setState({ isLoading: false });
        }
      }
    }
    if (nextProps.BGImage) {
      if (nextProps.BGImage.BGImageSuccess) {
        const BGI = nextProps.BGImage.data.data;
        const found = BGI.find((obj) => {
          return obj.name === "History";
        });
        console.log("nextPropsData", found);
        this.setState({ BG: found });
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
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
    const ACToken = await AsyncStorage.getItem("AccessToken");
    this.props.HistoryAction(ACToken);
    this.props.BGImageAction(ACToken);
  }

  openHVideo = (element) => {
    this.setState({ modalVisible: true });
    this.setState({ SelectedData: element });
    // console.log('ApiData',this.state.SelectedData)
  };

  RenderData = () => {
    return this.state.HistoryApiData.map((element, index) => {
      if (element.get_media == null) {
        return null;
      }
      return (
        <View style={InnerStyle.mainScrollViewStyle}>
          <TouchableOpacity onPress={() => this.openHVideo(element)}>
            <View style={InnerStyle.MainChildViewStyle}>
              <ImageBackground
                // resizeMode="contain"
                imageStyle={{
                  borderBottomLeftRadius: RFPercentage(1),
                  borderTopLeftRadius: RFPercentage(1),
                }}
                source={{ uri: element.get_media.media_thumb_img }}
                style={InnerStyle.FirstImageStyle}
              >
                {/* <Text style={{ alignSelf: "flex-end", color: Colors.White, backgroundColor: "#454545" }}>{element.Time}</Text> */}
              </ImageBackground>
              <View style={InnerStyle.TextSectionStyle}>
                <Text style={InnerStyle.FistTextStyle}>
                  {element.get_media.media_title}
                </Text>
                <Text style={InnerStyle.SecoundTextStyle}>
                  {element.get_media.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  };

  render() {
    const closeHVideo = () => {
      this.setState({ modalVisible: false });
    };
    return (
      <>
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
            <View style={InnerStyle.HeaderMainStyle}>
              <TouchableOpacity onPress={() => this.props.navigation?.goBack()}>
                <Image
                  resizeMode="contain"
                  source={IMAGE.LeftSideIcon}
                  style={InnerStyle.DrawerIconStyle}
                />
              </TouchableOpacity>
              <Text style={InnerStyle.HeaderTitle}>History</Text>
              <View style={InnerStyle.BlankSpace}></View>
            </View>
            <Modal
              visible={this.state.modalVisible}
              transparent
              animationType="slide"
              onSwipeComplete={() => closeHVideo(false)}
              // onSwipeComplete={() => setModalVisible(false)}
              onRequestClose={() => closeHVideo(false)}
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
              <View style={{ height: windowHeight }}>
                <ModalComponents HData={this.state.SelectedData} />
              </View>
            </Modal>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                // style={{ paddingVertical: RFPercentage(5) }}
                style={{ marginBottom: RFPercentage(6) }}
              >
                {this.RenderData()}
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
        {this.state.isLoading ? (
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
            style={{ position: "absolute", top: height / 2, left: width / 2.2 }}
            size={"large"}
          />
          </View>
        ) : undefined}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    History: state.History,
    BGImage: state.BGImage,
  };
};

export default connect(mapStateToProps, { HistoryAction, BGImageAction })(
  History
);
