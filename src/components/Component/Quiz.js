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
  Button,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import Modal from "react-native-modal";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as IMAGE from "../../common/Image";
import { InnerStyle } from "./InnerStyle";
import * as Colors from "../../common/colors";
import * as Fonts from "../../common/Fonts";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { NotesStyle } from "../SubComponent/NotesStyle";

import QuizList from "./QuizList";
import { connect } from "react-redux";
import { BGImageAction } from "../../redux/action";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const { width, height } = Dimensions.get("window");
let PushData = [];

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isLoading: true,
      id: 0,
      value1: [],
      value1Index: [],
      value1_1: [],
      value1_1Index: [],
      Data: "",
      BG: "",
      page: 0,
      maxPage: 14,
      E: "",
      I: "",
      S: "",
      N: "",
      T: "",
      F: "",
      J: "",
      P: "",
    };
  }

  backAction = () => {
    this.props.navigation.goBack(null);
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.BGImage) {
      if (nextProps.BGImage.BGImageSuccess) {
        const BGI = nextProps.BGImage.data.data;
        const found = BGI.find((obj) => {
          return obj.name === "MyersQuiz";
        });
        this.setState({ BG: found });
        // console.log("nextPropsData", this.state.BG);
        this.setState({ isLoading: false });
      }
    }
  }

  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
    const ACToken = await AsyncStorage.getItem("AccessToken");
    this.props.BGImageAction(ACToken);
  }

  QuizShow = () => {
    return QuizList.map((element, i) => {
      if (this.state.page == element.page) {
        return element.data.map((e, index) => {
          return (
            <View>
              <View style={NotesStyle.HeaderFirstViewStyleView}>
                <View style={NotesStyle.HeaderSecondInnerViewStyle}>
                  <View
                    style={{
                      // alignItems: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: RFValue(5),
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.White,
                        fontSize: RFValue(15),
                        fontFamily: Fonts.SemiBold,
                      }}
                    >
                      {" "}
                      {e.index}.
                    </Text>
                    <Text
                      style={{
                        color: Colors.White,
                        fontSize: RFValue(15),
                        fontFamily: Fonts.SemiBold,
                        paddingLeft: RFValue(3),
                        width: RFPercentage(39),
                      }}
                    >
                      {e.Question}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <RadioForm
                      style={{ marginLeft: RFValue(3) }}
                      initial={-1}
                      buttonSize={10}
                      buttonOuterSize={17}
                      radio_props={e.Options}
                      buttonColor={Colors.White}
                      buttonStyle={{ top: 10 }}
                      formHorizontal={false}
                      // labelHorizontal={true}
                      animation={true}
                      labelStyle={{
                        color: Colors.White,
                        fontFamily: Fonts.SemiBold,
                        fontSize: RFValue(14),
                        marginLeft: RFValue(2),
                        alignSelf: "center",
                        // marginBottom: 5,
                        bottom: RFValue(2),
                        // ,                        paddingVertical: 1,
                      }}
                      onPress={(value, index) => {
                        const temp = e.Options.value;
                        const AddData = PushData.push(value);
                        this.setState({
                          value1_1: value,
                          value1_1Index: index,
                          Data: PushData,
                        });
                        {
                          console.log("DataPush", PushData);
                        }
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        });
      }
    });
  };

  Result = (visible) => {
    if (this.state.Data != "") {
      let e = [],
        i = [],
        s = [],
        n = [],
        t = [],
        f = [],
        j = [],
        p = [];
      const Values = this.state.Data;
      Values.forEach((element) => {
        if (element) {
          switch (element) {
            case "e":
              e++;
              break;
            case "i":
              i++;
              break;
            case "s":
              s++;
              break;
            case "n":
              n++;
              break;
            case "t":
              t++;
              break;
            case "f":
              f++;
              break;
            case "j":
              j++;
              break;
            case "p":
              p++;
              break;
            default:
              console.log("No Data found");
              break;
          }
        }
      });
      let E = Math.floor((e / 10) * 100);
      this.setState({ E: E });
      let I = Math.floor((i / 10) * 100);
      this.setState({ I: I });
      let S = Math.floor((s / 20) * 100);
      this.setState({ S: S });
      let N = Math.floor((n / 20) * 100);
      this.setState({ N: N });
      let T = Math.floor((t / 20) * 100);
      this.setState({ T: T });
      let F = Math.floor((f / 20) * 100);
      this.setState({ F: F });
      let J = Math.floor((j / 20) * 100);
      this.setState({ J: J });
      let P = Math.floor((p / 20) * 100);
      this.setState({ P: P });
      this.setState({ modalVisible: visible });
    }
    // else {
    //   alert("Please Select Options");
    // }
  };

  GoBackFuncation = () => {
    this.setState({ Data: "" });
    this.setState({ E: "", I: "", S: "", N: "", T: "", F: "", J: "", P: "" });
    this.props.navigation?.goBack();
  };

  Prev = () => {
    this.setState({ page: this.state.page - 1 });
  };
  Next = () => {
    this.setState({ page: this.state.page + 1 });
  };

  close = () => {
    this.setState({ modalVisible: false });
    this.setState({ Data: "" });
    this.setState({ E: "", I: "", S: "", N: "", T: "", F: "", J: "", P: "" });
  };

  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground
            //  resizeMode="contain"
            source={
              this.state.isLoading
                ? IMAGE.HomeImage
                : { uri: this.state.BG.image }
            }
            blurRadius={1}
            style={{ height: RFPercentage(130) }}
          >
            <StatusBar
              hidden={false}
              barStyle={"light-content"}
              translucent
              backgroundColor="transparent"
            />
            <View style={InnerStyle.HeaderMainStyle}>
              <TouchableOpacity onPress={this.GoBackFuncation}>
                <Image
                  resizeMode="contain"
                  source={IMAGE.LeftSideIcon}
                  style={InnerStyle.DrawerIconStyle}
                />
              </TouchableOpacity>
              <Text style={InnerStyle.HeaderTitle}>Myers Quiz</Text>
              <View style={InnerStyle.BlankSpace}></View>
            </View>
            <ScrollView style={{ paddingHorizontal: RFValue(14) }}>
              {this.QuizShow()}
              <View
                style={{
                  flex: 1,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "grey",
                  marginBottom: 10,
                }}
              >
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 12,
                    }}
                  >
                    {/* <Text
                    style={{ fontSize: 16, fontWeight: "400", color: "black" }}
                  >
                    page
                  </Text> */}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 12,
                    }}
                  >
                    {/* <Text
                    style={{ fontSize: 16, fontWeight: "400", color: "black" }}
                  >
                    sizeRatio
                  </Text> */}
                    {/* <Text
                    style={{ fontSize: 16, fontWeight: "600", color: "grey" }}
                  >
                    {this.state.sizeRatio}
                  </Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: RFValue(30),
                  }}
                >
                  <Button
                    title="Prev"
                    disabled={this.state.page == 0}
                    onPress={
                      () => {
                        // setPage(this.state.page - 1);
                        this.Prev();
                      }
                      // this.setState({page})
                    }
                  />
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      fontWeight: "600",
                      color: Colors.White,
                    }}
                  >
                    {this.state.page + 1} / {this.state.maxPage}
                  </Text>
                  <Button
                    title="Next"
                    disabled={this.state.page == 13}
                    onPress={() => {
                      this.Next();
                      // setPage(this.state.page + 1);
                      // this.setState({page})
                    }}
                  />
                </View>
              </View>
              {this.state.page == 13 ? (
                <TouchableOpacity
                  style={InnerStyle.BtnTouchStyle}
                  disabled={this.state.Data == ""}
                  onPress={() => {
                    this.Result();
                  }}
                >
                  <Text style={InnerStyle.BtnInnerStyle}>
                    Calculate Results
                  </Text>
                </TouchableOpacity>
              ) : null}
            </ScrollView>
            <Modal
              visible={this.state.modalVisible}
              transparent
              animationType="fade"
              // onSwipeComplete={this.close}
              onRequestClose={this.close}
              useNativeDriver={true}
              backdropColor={"transparent"}
              useNativeDriverForBackdrop
              swipeDirection={["down"]}
              style={
                {
                  // margin: 16,
                  // marginLeft: 1,
                }
              }
            >
              <View
                style={[
                  NotesStyle.ModalMainViewStyle,
                  { height: windowHeight / 2.5 },
                ]}
              >
                <View style={NotesStyle.ModalInnerMainstyle}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        height: RFPercentage(3.5),
                        width: RFPercentage(3.5),
                      }}
                    ></View>
                    <Text
                      style={{
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(15),
                        color: Colors.DarkBlue,
                        marginTop: RFValue(10),
                      }}
                    >
                      Result
                    </Text>
                    <TouchableOpacity
                      style={{
                        // alignSelf: "flex-end",

                        marginTop: RFValue(12),
                        marginRight: RFValue(5),
                      }}
                      onPress={() => this.close()}
                    >
                      <Image
                        source={IMAGE.CrossIcon}
                        style={[
                          NotesStyle.CommonIConStyle,
                          {
                            tintColor: Colors.DarkBlue,
                            right: RFPercentage(0.2),
                          },
                        ]}
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: RFValue(10),
                    }}
                  >
                    <View>
                      <CircularProgress
                        radius={40}
                        value={this.state.E}
                        valuePrefix={"E"}
                        activeStrokeColor={"#ff4040"}
                        inActiveStrokeColor={"#ff6961"}
                        inActiveStrokeOpacity={0.1}
                        progressValueColor={"#000000"}
                        valueSuffix={"%"}
                      />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <CircularProgress
                        radius={40}
                        value={this.state.I}
                        valuePrefix={"I"}
                        activeStrokeColor={"#ffb490"}
                        inActiveStrokeColor={"#ffb240"}
                        inActiveStrokeOpacity={0.1}
                        progressValueColor={"#000000"}
                        valueSuffix={"%"}
                      />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <CircularProgress
                        radius={40}
                        value={this.state.S}
                        valuePrefix={"S"}
                        activeStrokeColor={"#f8e20d"}
                        inActiveStrokeColor={"#f8f90a"}
                        inActiveStrokeOpacity={0.1}
                        progressValueColor={"#000000"}
                        valueSuffix={"%"}
                      />
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <CircularProgress
                        radius={40}
                        value={this.state.N}
                        valuePrefix={"N"}
                        activeStrokeColor={"#42d8a9"}
                        inActiveStrokeColor={"#11a1b0"}
                        inActiveStrokeOpacity={0.1}
                        progressValueColor={"#000000"}
                        valueSuffix={"%"}
                      />
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                      <CircularProgress
                        radius={40}
                        value={this.state.T}
                        valuePrefix={"T"}
                        activeStrokeColor={"#08aad1"}
                        inActiveStrokeColor={"#08dbd1"}
                        inActiveStrokeOpacity={0.1}
                        progressValueColor={"#000000"}
                        valueSuffix={"%"}
                      />
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                      <CircularProgress
                        radius={40}
                        value={this.state.F}
                        valuePrefix={"F"}
                        activeStrokeColor={"#59adf9"}
                        inActiveStrokeColor={"#59adc5"}
                        inActiveStrokeOpacity={0.1}
                        progressValueColor={"#000000"}
                        valueSuffix={"%"}
                      />
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                      <CircularProgress
                        radius={40}
                        value={this.state.J}
                        valuePrefix={"J"}
                        activeStrokeColor={"#9d94dd"}
                        inActiveStrokeColor={"#9d90aa"}
                        inActiveStrokeOpacity={0.1}
                        progressValueColor={"#000000"}
                        valueSuffix={"%"}
                      />
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                      <CircularProgress
                        radius={40}
                        value={this.state.P}
                        valuePrefix={"P"}
                        activeStrokeColor={"#c799a9"}
                        inActiveStrokeColor={"#c780e8"}
                        inActiveStrokeOpacity={0.1}
                        progressValueColor={"#000000"}
                        valueSuffix={"%"}
                      />
                    </View>
                  </View>
                  {/* <Text>I = {this.state.I} %</Text>
                  <Text>S = {this.state.S} %</Text>
                  <Text>N = {this.state.N} %</Text>
                  <Text>T = {this.state.T} %</Text>
                  <Text>F = {this.state.F} %</Text>
                  <Text>J = {this.state.J} %</Text>
                  <Text>P = {this.state.P} %</Text> */}
                </View>
              </View>
            </Modal>
          </ImageBackground>
        </SafeAreaView>
        {this.state.isLoading ? (
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
                top: height / 2,
                left: width / 2.2,
              }}
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
    BGImage: state.BGImage,
  };
};

export default connect(mapStateToProps, {
  BGImageAction,
})(Quiz);

// import React, { Component } from "react";
// import { AppRegistry, StyleSheet, ScrollView, Text, View } from "react-native";

// // import Button from 'react-native-button';

// import RadioForm, {
//   RadioButton,
//   RadioButtonInput,
//   RadioButtonLabel,
// } from "react-native-simple-radio-button";

// class Quiz extends Component {
//   constructor() {
//     super();
//     this.state = {
//       types1: [
//         { label: "param1", value: 0 },
//         { label: "param2", value: 1 },
//         { label: "param3", value: 0 },
//         { label: "param4", value: 1 },
//       ],
//       value1: 0,
//       value1Index: 0,
//       value1_1: 0,
//       value1_1Index: 0,
//       // types2: [{label: 'param1', value: 0}, {label: 'param2', value: 1}, {label: 'param3', value: 2},],
//       // value2: 0,
//       // value2Index: 0,
//       // types3: [{label: 'param1', value: 0}, {label: 'param2', value: 1}, {label: 'param3', value: 2},],
//       // value3: 0,
//       // value3Index: 0,
//     };
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView>
//           <Text style={styles.welcome}>
//             React Native Simple Radio Button Demo
//           </Text>

//           <View style={styles.component}>
//             <Text style={styles.welcome}>No initial set</Text>
//             <RadioForm
//               initial={-1}
//               radio_props={this.state.types1}
//               onPress={(value, index) => {
//                 console.log("ele", value);
//                 this.setState({
//                   value1_1: value,
//                   value1_1Index: index,
//                 });
//               }}
//             />
//           </View>
//         </ScrollView>
//       </View>
//     );
//   }
// }

// export default Quiz;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "#F5FCFF",
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: "center",
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   instructions: {
//     textAlign: "center",
//     color: "#333333",
//     marginBottom: 5,
//   },
//   component: {
//     alignItems: "center",
//     marginBottom: 50,
//   },
//   radioStyle: {
//     borderRightWidth: 1,
//     borderColor: "#2196f3",
//     paddingRight: 10,
//   },
//   radioButtonWrap: {
//     marginRight: 5,
//   },
// });
