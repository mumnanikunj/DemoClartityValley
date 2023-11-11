import React, { Component } from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
// import { check, request, openSettings, PERMISSIONS, RESULTS } from "react-native-permissions"
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from "../../common/colors";
import * as Fonts from "../../common/Fonts";
import * as IMAGE from "../../common/Image";
import { InnerStyle } from "../Component/InnerStyle";
// import {
//   CheckPermissionsAudio,
//   checkMedia,
//   checkCamera,
// } from "./AppPermission";
import { NotesStyle } from "./NotesStyle";
import DateTimePicker from "react-native-modal-datetime-picker";
import { SwipeListView } from "react-native-swipe-list-view";
import Toast from "react-native-simple-toast";

import { connect } from "react-redux";
import {
  AddNoteAction,
  GetNotesAction,
  EditNotesAction,
  DeleteNoteAction,
  BGImageAction
} from "../../redux/action";

// import { Item } from "react-native-paper/lib/typescript/components/List/List";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const { width, height } = Dimensions.get("window");

const Today = new Date().getDate();
class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      displayedDate: moment(),
      modalVisible: false,
      Disc: "",
      // TodayDate: Today,
      randerData: [],
      AllData: [],
      entered: "",
      Title: "",
      // TodayData: [],
      // YesterDayData: [],
      // OtherDays: [],
      GetNotesData: false,
      DatepickerVisible: false,
      TimepickerVisible: false,
      SelectDate: moment().format("Y-M-D"),
      SelectTime: moment().format("h:m"),
      date: moment().format("Y-M-D"),
      time: moment().format("h:m"),
      tempData: null,
      isEdit: false,
      isLoading: true,
      BG : '',
      EditData: [],
      EditProps: false,
    };
  }
  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
      entered: "",
      // Title: "",
      // SelectDate: this.state.SelectDate,
      // SelectTime: this.state.SelectTime,
    });
  };
  close = async () => {
    this.setState({ modalVisible: false, isEdit: false });
    this.clearText()
  };
  setDates = (dates) => {
    this.setState({
      ...dates,
    });
  };

  backAction = () => {
    this.setState({ modalVisible: false });
    this.props.navigation.goBack(null);
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }

  CallAPi = async () => {
    const ACToken = await AsyncStorage.getItem("AccessToken");
    this.props.GetNotesAction(ACToken);
  };
  async componentDidMount() {
    console.log(this.state.AllData);
    this.props.navigation.addListener("focus", async () => {
      BackHandler.addEventListener("hardwareBackPress", this.backAction);
      this.setState({ GetNotesData: true });
      const ACToken = await AsyncStorage.getItem("AccessToken");
      this.props.GetNotesAction(ACToken);
      this.props.BGImageAction(ACToken);
    });
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
    this.setState({ GetNotesData: true });
    const ACToken = await AsyncStorage.getItem("AccessToken");
      this.props.GetNotesAction(ACToken);
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.AddNote.AddNoteSuccess) {
      this.setState({ isLoading: false }, () => {
        this.CallAPi;
      });
      // console.log('DataGetSucces',nextProps.AddNote.data)
    }
    if (nextProps.GetNotes) {
      this.setState({ isLoading: true });
      if (nextProps.GetNotes.GetNotesSuccess) {
        const temp = JSON.stringify(nextProps.GetNotes.data.data);
        const NotesData = JSON.parse(temp);
        this.setState({ AllData: NotesData }, () => {
          if (this.state.AllData.length > 0) {
            console.log("DataGetSuccess", this.state.AllData);
            this.setState({ isLoading: false }, () => {
              this.CallAPi;
            });
          } else {
            // this.setState({ isLoading: true });
          }
        });
        this.setState({ isLoading: false });
      }
    }
    if (nextProps.EditNotes) {
      if (nextProps.EditNotes.EditNotesSuccess) {
        // Toast.showWithGravity(nextProps.EditNotes.data.message, Toast.SHORT, Toast.BOTTOM);
        this.setState({ isLoading: true }, () => {
          this.CallAPi;
        });
      }
      if (nextProps.DeleteNote) {
        if (nextProps.DeleteNote.DeleteNoteSuccess) {
          this.setState({ isLoading: false }, () => {
            this.CallAPi;
          });
        }
      }
    }
    if (nextProps?.BGImage) {
      if (nextProps?.BGImage.BGImageSuccess) {
        const BGI = nextProps.BGImage.data.data;
        const found = BGI.find((obj) => {
          return obj.name === "CommonScreen";
        });
        this.setState({ BG: found });
        this.setState({ isLoading: false });
      }
    }
  }

  // sortingData(data) {
  //   let today = [];
  //   let yesterday = [];
  //   let other = [];
  //   data.filter((element) => {
  //     if (element.date == moment().format("DD MMM ,YYYY")) {
  //       today.push(element);
  //     } else if (
  //       element.date == moment().subtract(1, "days").format("DD MMM ,YYYY")
  //     ) {
  //       yesterday.push(element);
  //     } else {
  //       other.push(element);
  //     }
  //   });

  //   let first = [];
  //   let second = first.concat(today);
  //   let third = second.concat(yesterday);
  //   let final = third.concat(other);

  //   this.setState(
  //     {
  //       AllData: final,
  //       TodayData: today,
  //       YesterDayData: yesterday,
  //       OtherDays: other,
  //     },
  //     async () => {
  //       await AsyncStorage.setItem(
  //         "NotesArray",
  //         JSON.stringify(this.state.AllData)
  //       );
  //     }
  //   );
  // }

  deleteNote = async () => {
    const NoteID = this.state.EditData;
    this.props.DeleteNoteAction(NoteID.id);
    this.setState({ modalVisible: false }, () => {
      this.setState({ isLoading: true }, () => {
        this.CallAPi();
      });
    });
  };

  addElementToArray = async () => {
    let EditNoteData = this.state.EditData;
    const { isEdit, tempData, AllData } = this.state;
    if (isEdit) {
      this.setState({ id: EditNoteData.id });
      this.props.EditNotesAction({
        id: EditNoteData.id,
        title: this.state.Title,
        description: this.state.entered,
        time: this.state.time,
        date: this.state.date,
      });
      this.setState({
        modalVisible: false,
        isEdit: false,
        Title: "",
        entered: "",
        isLoading: true,
        Title: "",
        SelectDate: this.state.SelectDate,
        SelectTime: this.state.SelectTime,
      });
      this.CallAPi();
      AsyncStorage.setItem("NoteID", JSON.stringify(EditNoteData.id));
    } else {
      if (
        this.state.entered != "" &&
        this.state.Title != ""
      ) {
        // const NotesArray = await AsyncStorage.getItem("NotesArray");
        // let arr = [];
        // console.log("logingngnege", arr);
        // arr.push({
        //   key: new Date().getTime(),
        //   data: this.state.entered,
        //   date: this.state.SelectDate,
        //   Time: this.state.SelectTime,
        //   Title: this.state.Title,
        // });
        this.setState({ GetNotesData: false });
        this.props.AddNoteAction({
          title: this.state.Title,
          description: this.state.entered,
          date: this.state.SelectDate,
          time: this.state.SelectTime,
        });
        this.setState({ isLoading: true });
        this.setState(
          {
            modalVisible: false,
            isEdit: false,
            Title: "",
            entered: "",
            // isLoading : true,
            // Title: "",
            // SelectDate: this.state.SelectDate,
            // SelectTime: this.state.SelectTime,
          },
          () => {
            this.CallAPi();
          }
        );
        // console.log('update Data',this.state.AllData)
      }
    }
  };
  // get addElementToArray() {
  //   return this._addElementToArray;
  // }
  // set addElementToArray(value) {
  //   this._addElementToArray = value;
  // }

  clearText = () => {
    this.setState({ Title: "" });
    this.setState({ entered: "" });
  };

  NotesRanderData = () => {
    return this.state.AllData?.map((element, index) => {
      return (
        <TouchableOpacity
          style={styles.rowFront}
          onPress={async () => {
            this.setState({ tempData: element, isEdit: true }, () => {
              const { tempData } = this.state;
              console.log("Temp data ", tempData);
              this.setState({ EditData: tempData });
              this.setState({ modalVisible: true });
              AsyncStorage.setItem("NoteId", JSON.stringify(tempData.id));
              this.setState({
                Title: tempData.title,
                entered: tempData.description,
                SelectDate: tempData.date,
                SelectTime: tempData.time,
              });
              // closeRow(rowMap, data.item.key);
            });
          }}
        >
          <View style={NotesStyle.HeaderFirstViewStyleView}>
            <View style={NotesStyle.HeaderSecondInnerViewStyle}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: RFPercentage(1),
                  }}
                >
                  <View
                    style={{
                      height: 24,
                      width: 3,
                      borderRadius: RFPercentage(2),
                      marginRight: RFPercentage(1),
                      backgroundColor: Colors.White,
                    }}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: Colors.White,
                      fontSize: RFValue(16),
                      fontFamily: Fonts.SemiBold,
                      width: windowWidth / 2,
                    }}
                  >
                    {element.title}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text
                    style={{
                      color: Colors.White,
                      fontSize: RFValue(8),
                      fontFamily: Fonts.Medium,
                    }}
                  >
                    {element.date} {element.time}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={NotesStyle.innerContentTextStyle}>
                  {element.description}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  render() {
    const showDatepicker = () => {
      this.setState({ DatepickerVisible: true });
    };
    const hideDatePicker = () => {
      this.setState({ DatepickerVisible: false });
    };
    const handleConfirm = (date) => {
      console.log("A Date has been picked", date);
      hideDatePicker();
      this.setState({ SelectDate: moment(date).format("Y-M-D") }, () => {
        console.log("setdateinState :", this.state.SelectDate);
      });
    };

    const showTimePicker = () => {
      this.setState({ TimepickerVisible: true });
    };
    const hideTimePicker = () => {
      this.setState({ TimepickerVisible: false });
    };

    const TimehandleConfirm = (time) => {
      console.log("A Date has been picked", time);
      hideTimePicker();
      this.setState({ SelectTime: moment(time).format("h:m") }, () => {
        console.log("selectTime : ", this.state.SelectTime);
      });
    };

    const closeRow = async (rowMap, rowKey, visible, data) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
        this.setState({ modalVisible: visible });
      }
    };

    const deleteRow = async (rowKey) => {
      let Clean = JSON.parse(await AsyncStorage.getItem("NotesArray"));
      const newData = this.state.AllData;
      const prevIndex = this.state.AllData.findIndex(
        (item) => item.key === rowKey
      );
      console.log("newData:: ", newData);
      console.log("prevIndex:: ", prevIndex, rowKey);
      newData.splice(prevIndex, 1);
      this.setState({ AllData: newData });
      AsyncStorage.setItem("NotesArray", JSON.stringify(newData));
      console.log("newData", newData);
    };

    const { modalVisible } = this.state;
    const { startDate, endDate, displayedDate } = this.state;
    return (
      <>
        <View>
          <ImageBackground
            //  resizeMode="contain"
            source={this.state.isLoading ? IMAGE.HomeImage: {uri : this.state.BG.image}}
            style={{ height: windowHeight }}
          >
            <StatusBar
              hidden={false}
              barStyle={"light-content"}
              translucent
              backgroundColor="transparent"
            />
            <View style={[InnerStyle.HeaderMainStyle]}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  resizeMode="contain"
                  source={IMAGE.LeftSideIcon}
                  style={InnerStyle.DrawerIconStyle}
                />
              </TouchableOpacity>
              <Text style={InnerStyle.HeaderTitle}>Notes / Diary</Text>
              <View style={InnerStyle.BlankSpace}></View>
            </View>
            <View style={NotesStyle.NotesMaincontent}>
              <View style={NotesStyle.NotesChildcontent}>
                <View
                // style={{ height: RFPercentage(10) }}
                >
                  <View
                    // style={NotesStyle.CommonScrollSecationStyle}
                    
                  >
                    {this.state.AllData == "" ? (
                      <View
                        style={{
                          height: windowHeight / 1.2,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            alignSelf: "center",
                            color: Colors.White,
                            fontFamily: Fonts.SemiBold,
                          }}
                        >
                          No Note
                        </Text>
                      </View>
                    ) : (
                      <ScrollView 
                      contentContainerStyle={{    
                        // height: windowHeight / 1.1,
                        alignItems: "center",
                        // justifyContent: "center",
                      }}
                      showsVerticalScrollIndicator={false}
                      >{this.NotesRanderData()}</ScrollView  >
                    )}
                    {/* <SwipeListScrollView
                        showsVerticalScrollIndicator={false}
                        data={this.state.AllData}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        // leftOpenValue={75}
                        rightOpenValue={-100}
                        previewRowKey={"0"}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        onRowDidOpen={onRowDidOpen}
                      /> */}
                  </View>
                </View>
              </View>
              <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                // behavior={Platform.OS === 'android' ? 100 : 1}
              >
                <Modal
                  // animationType={'fade'}
                  visible={modalVisible}
                  transparent
                  animationType="fade"
                  onSwipeComplete={this.close}
                  useNativeDriver={true}
                  backdropColor={"transparent"}
                  useNativeDriverForBackdrop
                  swipeDirection={["down"]}
                  style={{
                    margin: 16,
                  }}
                >
                  <TouchableWithoutFeedback
                    accessible={false}
                    onPress={() => Keyboard.dismiss()}
                  >
                    <View style={NotesStyle.ModalMainViewStyle}>
                      <View style={NotesStyle.ModalInnerMainstyle}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <TouchableOpacity onPress={this.deleteNote}>
                            {this.state.isEdit === true ? (
                              <Image
                                source={IMAGE.DeleteIcon}
                                style={{
                                  height: RFPercentage(3.5),
                                  width: RFPercentage(3.5),
                                }}
                              />
                            ) : (
                              <View
                                style={{
                                  height: RFPercentage(3.5),
                                  width: RFPercentage(3.5),
                                }}
                              ></View>
                            )}
                          </TouchableOpacity>
                          <Text
                            style={{
                              fontFamily: Fonts.Bold,
                              fontSize: RFValue(15),
                              color: Colors.DarkBlue,
                            }}
                          >
                            Diary Entry
                          </Text>
                          <TouchableOpacity
                            style={{
                              // alignSelf: "flex-end",
                              marginVertical: RFPercentage(1),
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
                        <TextInput
                          onChangeText={(val) => this.setState({ Title: val })}
                          value={this.state.Title}
                          style={NotesStyle.TitleTextinputStyle}
                          placeholder={"Enter Title..."}
                          placeholderTextColor="grey"
                        />
                        <TextInput
                          onChangeText={(val) =>
                            this.setState({ entered: val })
                          }
                          value={this.state.entered}
                          style={NotesStyle.TextInputStyle}
                          multiline={true}
                          placeholder={
                            "Start typing or click on the microphone icon (left bottom) to convert speech into text..."
                          }
                          placeholderTextColor="grey"
                          // onChangeText={(V) => this.setState({ Disc: (V) })}
                        />
                        {this.state.isEdit ? null : (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginVertical: RFPercentage(1.5),
                              marginHorizontal: RFPercentage(5),
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
                              <Text
                                style={{
                                  color: Colors.Black,
                                  fontFamily: Fonts.Regular,
                                }}
                              >
                                {this.state.isEdit
                                  ? this.state.tempData.time
                                  : this.state.SelectTime.toString()}
                              </Text>
                            </TouchableOpacity>
                            <DateTimePicker
                              isVisible={this.state.TimepickerVisible}
                              mode="time"
                              format={"h:m"}
                              onConfirm={TimehandleConfirm}
                              onCancel={hideTimePicker}
                              // minimumDate={this.state.time}
                              value={this.state.time}
                              onChange={(time) => {
                                this.setState({ SelectTime: time });
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
                              <Text
                                style={{
                                  color: Colors.Black,
                                  fontFamily: Fonts.Regular,
                                }}
                              >
                                {this.state.isEdit
                                  ? this.state.tempData.date
                                  : this.state.SelectDate.toString()}
                              </Text>
                            </TouchableOpacity>
                            <DateTimePicker
                              isVisible={this.state.DatepickerVisible}
                              mode="date"
                              format={"Y-M-D"}
                              onConfirm={handleConfirm}
                              onCancel={hideDatePicker}
                              // minimumDate={this.state.date}
                              value={this.state.date}
                              onChange={(date) => {
                                this.setState({ SelectDate: date });
                              }}
                            />
                          </View>
                        )}

                        <View style={NotesStyle.BottomButtonView}>
                          <TouchableOpacity
                            style={NotesStyle.BottomButton}
                            onPress={() => this.clearText()}
                          >
                            <Text style={{ color: Colors.White }}>Clear</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            disabled={
                              this.state.entered == '' && this.state.Title.trim() == ''
                            }
                            onPress={() => {
                              this.addElementToArray();
                            }}
                            style={[
                              NotesStyle.BottomButton,
                              {
                                backgroundColor:
                                  this.state.entered == ""
                                    ? Colors.LigthBlue
                                    : Colors.ButtonBlue,
                              },
                            ]}
                          >
                            <Text style={{ color: Colors.White }}>Save</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
              </KeyboardAwareScrollView>
              <View style={NotesStyle.UIBottomButtonView}>
                <View>
                  <TouchableOpacity
                    style={NotesStyle.CommonIConViewStyle}
                    onPress={() =>
                      this.props.navigation.navigate("VoiceToText")
                    }
                  >
                    <Image
                      source={IMAGE.MicIcon}
                      style={NotesStyle.CommonIConStyle}
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={NotesStyle.CommonIConViewStyle}
                    onPress={() => this.setModalVisible(true)}
                  >
                    <Image
                      source={IMAGE.PlusIcon}
                      style={NotesStyle.CommonIConStyle}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    // backgroundColor: '#CCC',
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
    justifyContent: "center",
    // height: 70,
  },
  rowBack: {
    alignItems: "center",
    // backgroundColor: '#DDD',
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    // paddingLeft: 15,
    right: "20%",
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    // position: 'absolute',
    top: 0,
    left: 0,
    // width: 10,
  },
  backRightBtnLeft: {
    // backgroundColor: 'blue',
    left: 0,
  },
  backRightBtnRight: {
    // backgroundColor: 'red',
    right: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    AddNote: state.AddNote,
    GetNotes: state.GetNotes,
    EditNotes: state.EditNotes,
    DeleteNote: state.DeleteNote,
    BGImage: state.BGImage,
  };
};
export default connect(mapStateToProps, {
  AddNoteAction,
  GetNotesAction,
  EditNotesAction,
  DeleteNoteAction,
  BGImageAction,
})(Notes);
