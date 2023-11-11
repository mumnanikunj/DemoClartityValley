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
  StyleSheet,
  ActivityIndicator,
  Alert,
  FlatList,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from "../../common/colors";
import * as IMAGE from "../../common/Image";
import * as Fonts from "../../common/Fonts";
import { InnerStyle } from "./InnerStyle";
import { connect } from "react-redux";
import {
  BookingStatusAction,
  SelectDurationAction,
  RescheduleAppoinmentAction,
  CancelApooinmentAction,
  VideoCallAction,
} from "../../redux/action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RBSheet from "react-native-raw-bottom-sheet";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { Dropdown } from "react-native-element-dropdown";

import Api from "../../common/Api";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const { width, height } = Dimensions.get("window");

class BookingStatusScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      BG: "",
      SelectButton: true,
      TrainerBoookingList: "",
      PageChangeindex: 0,
      SelectTimeSlotBook: "",
      TherapistDurationData: "",
      SelectID: "",
      Rescheduleid: "",
      SelectDurationParams: null,
      SelectedDate: "",
      showMessage: "",
      CancelMessage: "",
      markedDates: "",
      ApiCheckStatus: true,
      Token: "",
      RoomName: "",
      nodata: "No data",
      showNoDataFound: true,
      filteredList: "",
      TimeData: [
        { label: "30 minutes", value: "1", Duration: 30 },
        { label: "60 minutes", value: "2", Duration: 60 },
      ],
    };
  }

  backAction = () => {
    this.props.navigation.goBack(null);
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }

  // async componentDidUpdate(){
  //   if(this.state.PageChangeindex == 1){
  //     if(this.state.ApiCheckStatus){
  //       this.props.BookingStatusAction(ACToken)
  //       const ACToken = await AsyncStorage.getItem("AccessToken");
  //       this.setState({ ApiCheckStatus: false });
  //     }
  //   }
  // }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.BookingStatus) {
      if (nextProps.BookingStatus.BookingStatusSuccess) {
        console.log("nextPropa", nextProps.BookingStatus.data.data);
        const TherapistBookingListData = nextProps.BookingStatus.data.data;
        this.setState({ TrainerBoookingList: TherapistBookingListData });
        // console.log("TrainerBookingList", TrainerBoookingList);
        this.setState({ isLoading: false });
      } else {
        this.setState({ isLoading: true });
        this.setState({ noData: true });
      }
    } else {
      this.setState({ isLoading: true });
    }
    if (nextProps.SelectDuration) {
      if (nextProps.SelectDuration.SelectDurationSuccess) {
        const DurationRes = nextProps.SelectDuration.data.data;
        console.log("SelectDurationResponce", DurationRes);
        this.setState({ TherapistDurationData: DurationRes });
        this.setState({ isLoader: false });
      } else {
        this.setState({ isLoader: false });
      }
    } else {
      this.setState({ isLoader: true });
    }
    if (nextProps.RescheduleAppoinment) {
      console.log(
        "RescheduleAppoinment",
        nextProps.RescheduleAppoinment.message
      );
      if (nextProps.RescheduleAppoinment.RescheduleAppoinmentSuccess) {
        this.setState({ isLoader: true });
        const ShowMessage = nextProps.RescheduleAppoinment.data.message;
        this.setState({ showMessage: ShowMessage });
        this.setState({ isLoader: false });
      }
    }
    if (nextProps.CancelAppoinment) {
      console.log("CancelProps", nextProps.CancelAppoinment);
      this.setState({ isLoader: true });
      if (nextProps.CancelAppoinment.CancelAppointmnetSuccess) {
        const CancelMessage = nextProps.CancelAppoinment.data.message;
        this.setState({ CancelMessage: CancelMessage });
        this.setState({ isLoader: false });
      }
    }
    // if (nextProps.BGImage) {
    //   if (nextProps.BGImage.BGImageSuccess) {
    //     const BGI = nextProps.BGImage.data.data;
    //     const found = BGI.find((obj) => {
    //       return obj.name === "BookingStatus";
    //     });
    //     console.log("nextPropsData", found);
    //     this.setState({ BG: found });
    //     this.setState({ isLoading: false });
    //   }
    // }
  }

  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
    const ACToken = await AsyncStorage.getItem("AccessToken");
    // this.props.BGImageAction(ACToken);
    this.props.BookingStatusAction(ACToken);
    this.props.RescheduleAppoinmentAction(ACToken);
  }

  CancelAppoinments = async (item) => {
    const ACToken = await AsyncStorage.getItem("AccessToken");
    console.log("CancelApooinments", item);
    this.props.CancelApooinmentAction({
      id: item.id,
    });
    if (this.state.CancelMessage.length != 0) {
      Alert.alert(this.state.CancelMessage);
      this.props.BookingStatusAction(ACToken);
    }
  };

  RescheduleAppoinments = (item) => {
    console.log("ItemSelect", item);
    this.setState({ SelectID: item.trainer_id });
    this.setState({ PageChangeindex: this.state.PageChangeindex + 1 });
    this.RescheduleAppointmentDetail.open();
    console.log("RescheduleAppointmens", item.trainer_id);
    this.setState({ Rescheduleid: item.id });
    this.setState({ TherapistDurationData: "" });
  };

  CloseSheet = async () => {
    const ACToken = await AsyncStorage.getItem("AccessToken");
    if (this.state.showMessage.length != 0) {
      console.log("Log", this.state.showMessage);
      Alert.alert(this.state.showMessage);
      this.props.BookingStatusAction(ACToken);
    } else if (this.state.showMessage.length == 0) {
      null;
    }
    // console.log('CloseSheet')
    // this.setState({ApiCheckStatus : true})
    this.setState({ PageChangeindex: this.state.PageChangeindex - 1 });
    this.setState({
      PageChangeindex: 0,
      SelectTimeSlotBook: -1,
      // TherapistNote: "",
      // ApiCheckStatus: true,
      SelectTimeSection: "",
      SelectedData: "",
      markedDates: "",
      isLoader: false,
      noData: false,
    });
  };

  async onDatePress(dates) {
    // this.setState({ selectedDate: moment(dates).format('YYYY-MM-DD'), subParent: 0 }, () => {
    //     this.DataFormat()
    // })
    this.setState({ SelectedDate: dates.dateString });
    let mark = { [dates.dateString]: { selected: true, marked: true } };
    this.setState({
      SelectedData: dates.dateString,
      markedDates: mark,
      TherapistDurationData: "",
    });
  }

  RescheduleBookSchedule = async () => {
    this.props.RescheduleAppoinmentAction({
      id: this.state.Rescheduleid,
      date: this.state.SelectedDate,
      time: this.state.SelectTimeSlotBook,
      duration: this.state.SelectDurationParams,
    });
    this.RescheduleAppointmentDetail.close();
  };

  onChangeDuration = (item) => {
    {
      this.setState({
        SelectTimeSection: this.state.TimeData.item,
      });
      this.setState({ SelectDurationParams: item.Duration }, () => {
        console.log("SelectDurationParams", this.state.SelectDurationParams);
      });
      // if (this.state.SelectedDate == "") {
      //   this.props.SelectDurationAction({
      //     trainer: this.state.SelectID,
      //     duration: item.Duration,
      //     date: this.state.TodayDate,
      //   });
      // } else {
      this.props.SelectDurationAction({
        trainer: this.state.SelectID, //1,//this.state.SelectedData.id,
        duration: item.Duration,
        date: this.state.SelectedDate,
      });
      // }

      this.setState({ DropDownFocus: false });
      this.setState({ isLoader: true });
    }
    // if(!this.state.SelectTimeSection == ""){

    // }
  };

  RanderTimeSlot = () => {
    if (this.state.TherapistDurationData.length == 0) {
      null;
    } else {
      return this.state.TherapistDurationData?.map((element, index) => {
        return (
          <TouchableOpacity
            onPress={() =>
              this.setState({ SelectTimeSlotBook: element }, () => {
                console.log("itemSelect", this.state.SelectTimeSlotBook);
              })
            }
            style={{
              backgroundColor:
                (element == this.state.SelectTimeSlotBook) != ""
                  ? "rgb(51 ,70, 90 )"
                  : "white",
              // flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
              borderWidth: 2,
              borderRadius: RFPercentage(3),
              borderColor:
                element == this.state.SelectTimeSlotBook
                  ? "rgb(51 ,70, 90 )"
                  : "rgb(73,97,237)",
              marginHorizontal: RFPercentage(1),
              marginVertical: RFPercentage(1),
              // maxWidth: windowWidth / 3.1,
              width: windowWidth / 3.8,
            }}
          >
            <Text
              style={{
                paddingVertical: RFPercentage(1),
                color:
                  element == this.state.SelectTimeSlotBook
                    ? Colors.White
                    : "rgb(73,97,237)",
                fontFamily: Fonts.Bold,
                fontSize: RFValue(14),
              }}
            >
              {moment(element, "h:mm:ss").format("h:mm A")}
            </Text>
          </TouchableOpacity>
        );
      });
    }
  };

  ScheduleSelectPage = () => {
    return (
      <>
        {this.state.PageChangeindex == 1 ? (
          <>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: Colors.Black,
                    fontFamily: Fonts.Bold,
                    fontSize: RFValue(14),
                  }}
                >
                  Select Date
                </Text>
              </View>
              <View style={{ marginVertical: RFPercentage(2) }}>
                <Calendar
                  current={new Date()}
                  minDate={new Date()}
                  date={this.state.SelectedData}
                  style={{
                    paddingBottom: 20,
                    backgroundColor: "rgb(237,242,253)",
                    borderRadius: RFPercentage(2),
                  }}
                  onDayPress={(day) => {
                    console.log("selected day", day);
                    this.onDatePress(day);
                  }}
                  markedDates={this.state.markedDates}
                  onPressArrowLeft={(subtractMonth) => subtractMonth()}
                  onPressArrowRight={(addMonth) => addMonth()}
                  hideExtraDays={true}
                  monthFormat={"MMMM yyyy"}
                  // Disable right arrow. Default = false
                  disableArrowLeft={false}
                  disableArrowRight={false}
                  // renderArrow={(direction) =>
                  //   direction == "right" ? (
                  //     <View style={{ flexDirection: "row" }}>
                  //       <TouchableOpacity
                  //         onPressArrowLeft={(subtractMonth) => subtractMonth()}
                  //       >
                  //         <Image
                  //           // style={dashboardstyles.arrow}
                  //           style={{
                  //             height: RFPercentage(3),
                  //             width: RFPercentage(3),
                  //             tintColor: "rgb(147,147,147)",
                  //           }}
                  //           source={require("../../assets/images/icons/CLeftIcon.png")}
                  //         />
                  //       </TouchableOpacity>
                  //       <TouchableOpacity
                  //         onPressArrowRight={(addMonth) => addMonth()}
                  //       >
                  //         <Image
                  //           style={{
                  //             height: RFPercentage(3),
                  //             width: RFPercentage(3),
                  //             tintColor: "rgb(66,88,237)",
                  //           }}
                  //           // style={dashboardstyles.arrow}
                  //           source={require("../../assets/images/icons/CRigthicon.png")}
                  //         />
                  //       </TouchableOpacity>
                  //     </View>
                  //   ) : null
                  // }
                  disableMonthChange={false}
                  firstDay={1}
                  showWeekNumbers={false}
                  enableSwipeMonths={true}
                  // markedDates={this.state.mark}
                  markingType={"custom"}
                  theme={{
                    // 'stylesheet.calendar.header': {

                    //     week: {
                    //         marginTop: 5,
                    //         flexDirection: 'row',
                    //         justifyContent: 'space-between',

                    //       }
                    // },
                    calendarBackground: "rgb(237,242,253)",
                    todayTextColor: "white",
                    todayBackgroundColor: "rgb(51,70,90)",
                    dayTextColor: "#222222",
                    textDisabledColor: "#d9e1e8",
                    monthTextColor: "black",
                    arrowColor: "#57B9BB",
                    textDayFontWeight: "400",
                    textDayHeaderFontWeight: "500",
                    textDayFontSize: RFValue(12),
                    textMonthFontSize: RFValue(16),
                    selectedDayBackgroundColor: "#57B9BB",
                    // selectedDayTextColor: "white",
                    textDayHeaderFontSize: RFValue(10),
                  }}
                />
                <View style={{ marginTop: RFPercentage(3) }}>
                  <Text
                    style={{
                      color: Colors.Black,
                      fontSize: RFValue(15),
                      fontFamily: Fonts.Bold,
                    }}
                  >
                    Select Duration
                  </Text>
                  <View style={{ marginVertical: RFPercentage(3) }}>
                    <Dropdown
                      style={[styles.dropdown]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      // iconStyle={styles.iconStyle}
                      data={this.state.TimeData}
                      // search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={"Select Duration"}
                      searchPlaceholder="Search..."
                      value={this.state.TimeData.value}
                      onFocus={() => this.setState({ DropDownFocus: true })}
                      // onBlur={() => setIsFocus(false)}
                      onChange={(item) =>
                        //   {
                        //   console.log('SelectTime',this.state.SelectTimeSection)

                        // }
                        this.onChangeDuration(item)
                      }
                      renderLeftIcon={() => (
                        <Image
                          source={IMAGE.SortClockIcon}
                          style={{
                            height: RFPercentage(2.5),
                            width: RFPercentage(2.5),
                            marginHorizontal: RFPercentage(1.5),
                          }}
                        />
                      )}
                      renderRightIcon={() => (
                        <Image
                          source={IMAGE.SortDownIcon}
                          style={{
                            height: RFPercentage(4),
                            width: RFPercentage(4),
                          }}
                        />
                      )}
                      // renderLeftIcon={() => (
                      //   <AntDesign
                      //     style={styles.icon}
                      //     color={isFocus ? 'blue' : 'black'}
                      //     name="Safety"
                      //     size={20}
                      //   />
                      // )}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    color: Colors.Black,
                    marginVertical: RFPercentage(2),
                    fontFamily: Fonts.Bold,
                    fontSize: RFValue(14),
                  }}
                >
                  Select Hour
                </Text>
                {this.state.TherapistDurationData.length == 0 ? (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text>No Slot Available</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexWrap: "wrap",
                      flexDirection: "row",
                      flexGrow: 1,
                    }}
                  >
                    {
                      // this.PageChangeindex == 1 ?
                      this.RanderTimeSlot()
                      // : null
                    }
                  </View>
                )}
                <TouchableOpacity
                  disabled={
                    this.state.SelectTimeSection ||
                    this.state.TherapistDurationData == ""
                  }
                  onPress={this.RescheduleBookSchedule}
                  style={{
                    backgroundColor:
                      this.state.SelectTimeSection != "" &&
                      this.state.TherapistDurationData != ""
                        ? "rgb(51,70,90)"
                        : "grey",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: RFPercentage(3),
                    marginTop: RFPercentage(2),
                  }}
                >
                  <Text
                    style={{
                      color: Colors.White,
                      paddingVertical: RFPercentage(1.6),
                    }}
                  >
                    Reschedule
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {this.state.isLoader ? (
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
                  color={"rgb(52,70,90)"}
                  style={{
                    position: "absolute",
                    top: height / 2.5,
                    left: width / 2.5,
                  }}
                  size={"large"}
                />
              </View>
            ) : undefined}
          </>
        ) : null}
      </>
    );
  };

  componentDidUpdate() {}

  MakeVideoCall = async (item) => {
    console.log("asdFGHJKL");
    // const ACToken = await AsyncStorage.getItem("AccessToken");
    // await this.props.VideoCallAction({ id: item.id });
    const data = await Api.VideoCall(item);
    console.log("FunctionTokenLog ", data);
    if (data.success && data.data.accesstoken && data.data.roomname) {
      this.props.navigation.navigate("VideoCall", {
        accesstoken: data.data.accesstoken,
        roomname: data.data.roomname,
      });
    } else {
      Alert.alert("Your Appointment Status is pending");
    }
    // this.setState({ Token: this.VideoCall.accesstoken });
    // this.props.navigation.navigate("VideoCall");
  };

  AppointmentsList = ({ item, index }) => {
    // var isUpcoming = moment(item.date).isSameOrAfter(
    //   moment().format("YYYY-MM-DD")
    // );
    // console.log("--------", this.state.SelectButton, "----", isUpcoming);
    // if (this.state.SelectButton && item.date <= moment().format("YYYY-MM-DD")) {
    //   return (
    //     <View>
    //       <Text>hi</Text>
    //     </View>
    //   );
    // } else {
    //   if (
    //     this.state.SelectButton &&
    //     item.date >= moment().format("YYYY-MM-DD")
    //   ) {
    //     return (
    //       <View>
    //         <Text>no data</Text>
    //       </View>
    //     );
    //   } else {
    //     return (

    //       <View>{
    //         item.length === 'null' ? <Text>Mo data</Text> : }

    //       </View>
    //     );
    //   }
    // }

    if (this.state.SelectButton) {
      if (moment(item.date).isBefore(moment().format("YYYY-MM-DD"))) {
        return (
          <View
            style={{
              borderRadius: RFPercentage(2),
              marginVertical: RFPercentage(1.8),
              backgroundColor: "white",
              width: windowWidth / 1.1,
              height: windowHeight / 3.1,
              paddingHorizontal: RFValue(14),
              shadowColor: "#000",
              shadowOffset: { height: 2 },
              shadowRadius: 3,
              shadowOpacity: 0.2,
              elevation: 2,
            }}
          >
            <View style={{ paddingHorizontal: RFValue(3) }}>
              <View
                style={{
                  paddingVertical: RFPercentage(2),
                  flexDirection: "row",
                  marginTop: RFPercentage(1),
                }}
              >
                <Image
                  source={{ uri: item.trainer.image }}
                  style={{
                    height: RFPercentage(10),
                    width: RFPercentage(10),
                    borderRadius: RFPercentage(10),
                  }}
                />
                <View
                  style={{
                    paddingHorizontal: RFPercentage(1),
                    justifyContent: "space-between",
                    width: windowWidth / 2,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.Black,
                      fontSize: RFValue(16),
                      color: Colors.Black,
                    }}
                  >
                    {item.trainer.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.Bold,
                      color: Colors.Gray2,
                      fontSize: RFValue(14),
                    }}
                  >
                    Therapist
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={IMAGE.StarIcon}
                      style={{
                        height: RFPercentage(2),
                        width: RFPercentage(2),
                        tintColor: "rgb(52,70,90)",
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(12),
                        color: Colors.Black,
                        paddingHorizontal: RFPercentage(1),
                      }}
                    >
                      {item.trainer.rating}
                    </Text>
                  </View>
                </View>
                {item.isVideoCall == 1 ? (
                  <View style={{}}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "rgb(52,70,90)",
                        height: RFPercentage(6),
                        width: RFPercentage(6),
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: RFPercentage(6),
                      }}
                      onPress={() => this.MakeVideoCall(item)}
                    >
                      <Image
                        source={IMAGE.JoinVideoCall}
                        style={{
                          height: RFPercentage(4),
                          width: RFPercentage(4),
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              {/* <View style={{ marginVertical: RFPercentage(3) }}> */}
              <View
                style={{
                  marginVertical: RFPercentage(3),
                  height: 1.5,
                  width: "100%",
                  backgroundColor: "rgb(240,240,240)",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "35%",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={IMAGE.calendarIcon}
                    style={{
                      height: RFPercentage(3),
                      width: RFPercentage(3),
                      tintColor: Colors.Gray2,
                    }}
                  />
                  <Text
                    style={{
                      paddingHorizontal: RFPercentage(1),
                      fontFamily: Fonts.SemiBold,
                      color: Colors.Gray2,
                      fontSize: RFValue(12),
                    }}
                  >
                    {item.date}
                    {/* {moment(item.date).format('D MMM YYYY')} */}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "32%",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={IMAGE.ClockIcon}
                    style={{
                      height: RFPercentage(3),
                      width: RFPercentage(3),
                      tintColor: Colors.Gray2,
                    }}
                  />
                  <Text
                    style={{
                      paddingHorizontal: RFPercentage(1),
                      fontFamily: Fonts.SemiBold,
                      color: Colors.Gray2,
                      fontSize: RFValue(12),
                    }}
                  >
                    {item.time}
                    {/* {moment(item.time , 'h:mm:ss').format('h:mm a')} */}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "32%",
                    justifyContent: "center",
                    // backgroundColor: "red",
                  }}
                >
                  <View
                    style={{
                      height: RFPercentage(1),
                      width: RFPercentage(1),
                      borderRadius: RFPercentage(1),
                      backgroundColor:
                        item.status == "pending"
                          ? "yellow"
                          : item.status == "confirmed"
                          ? "green"
                          : item.status == "reject"
                          ? "red"
                          : "grey",
                    }}
                  ></View>
                  <Text
                    style={{
                      paddingHorizontal: RFPercentage(1),
                      fontFamily: Fonts.SemiBold,
                      color: Colors.Gray2,
                      fontSize: RFValue(12),
                      textTransform: "capitalize",
                    }}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginVertical: RFPercentage(3),
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.CancelAppoinments(item);
                  }}
                  style={{
                    borderWidth: 1,
                    borderColor: "rgb(52,70,90)",
                    borderRadius: RFValue(14),
                    width: "48%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "rgb(52,70,90)",
                      fontSize: RFValue(14),
                      fontFamily: Fonts.Bold,
                      paddingVertical: RFPercentage(1.5),
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.RescheduleAppoinments(item);
                  }}
                  style={{
                    backgroundColor: "rgb(52,70,90)",
                    borderRadius: RFValue(14),
                    width: "48%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      fontFamily: Fonts.Bold,
                      paddingVertical: RFPercentage(1.5),
                      color: Colors.White,
                    }}
                  >
                    Reschedule
                  </Text>
                </TouchableOpacity>
              </View>
              {/* </View> */}
            </View>
            {/* <Text>{item.status}</Text> */}
          </View>
        );
      } else {
        return null;
      }
    } else {
      if (moment(item.date).isSameOrAfter(moment().format("YYYY-MM-DD"))) {
        return (
          <View
            style={{
              borderRadius: RFPercentage(2),
              marginVertical: RFPercentage(1.8),
              backgroundColor: "white",
              width: windowWidth / 1.1,
              height: windowHeight / 3.1,
              paddingHorizontal: RFValue(14),
              shadowColor: "#000",
              shadowOffset: { height: 2 },
              shadowRadius: 3,
              shadowOpacity: 0.2,
              elevation: 2,
            }}
          >
            <View style={{ paddingHorizontal: RFValue(3) }}>
              <View
                style={{
                  paddingVertical: RFPercentage(2),
                  flexDirection: "row",
                  marginTop: RFPercentage(1),
                }}
              >
                <Image
                  source={{ uri: item.trainer.image }}
                  style={{
                    height: RFPercentage(10),
                    width: RFPercentage(10),
                    borderRadius: RFPercentage(10),
                  }}
                />
                <View
                  style={{
                    paddingHorizontal: RFPercentage(1),
                    justifyContent: "space-between",
                    width: windowWidth / 2,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.Black,
                      fontSize: RFValue(16),
                      color: Colors.Black,
                    }}
                  >
                    {item.trainer.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.Bold,
                      color: Colors.Gray2,
                      fontSize: RFValue(14),
                    }}
                  >
                    Therapist
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={IMAGE.StarIcon}
                      style={{
                        height: RFPercentage(2),
                        width: RFPercentage(2),
                        tintColor: "rgb(52,70,90)",
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(12),
                        color: Colors.Black,
                        paddingHorizontal: RFPercentage(1),
                      }}
                    >
                      {item.trainer.rating}
                    </Text>
                  </View>
                </View>
                {item.isVideoCall == 1 ? (
                  <View style={{}}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "rgb(52,70,90)",
                        height: RFPercentage(6),
                        width: RFPercentage(6),
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: RFPercentage(6),
                      }}
                      onPress={() => this.MakeVideoCall(item)}
                    >
                      <Image
                        source={IMAGE.JoinVideoCall}
                        style={{
                          height: RFPercentage(4),
                          width: RFPercentage(4),
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              {/* <View style={{ marginVertical: RFPercentage(3) }}> */}
              <View
                style={{
                  marginVertical: RFPercentage(3),
                  height: 1.5,
                  width: "100%",
                  backgroundColor: "rgb(240,240,240)",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "35%",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={IMAGE.calendarIcon}
                    style={{
                      height: RFPercentage(3),
                      width: RFPercentage(3),
                      tintColor: Colors.Gray2,
                    }}
                  />
                  <Text
                    style={{
                      paddingHorizontal: RFPercentage(1),
                      fontFamily: Fonts.SemiBold,
                      color: Colors.Gray2,
                      fontSize: RFValue(12),
                    }}
                  >
                    {item.date}
                    {/* {moment(item.date).format('D MMM YYYY')} */}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "32%",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={IMAGE.ClockIcon}
                    style={{
                      height: RFPercentage(3),
                      width: RFPercentage(3),
                      tintColor: Colors.Gray2,
                    }}
                  />
                  <Text
                    style={{
                      paddingHorizontal: RFPercentage(1),
                      fontFamily: Fonts.SemiBold,
                      color: Colors.Gray2,
                      fontSize: RFValue(12),
                    }}
                  >
                    {item.time}
                    {/* {moment(item.time , 'h:mm:ss').format('h:mm a')} */}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "32%",
                    justifyContent: "center",
                    // backgroundColor: "red",
                  }}
                >
                  <View
                    style={{
                      height: RFPercentage(1),
                      width: RFPercentage(1),
                      borderRadius: RFPercentage(1),
                      backgroundColor:
                        item.status == "pending"
                          ? "yellow"
                          : item.status == "confirmed"
                          ? "green"
                          : item.status == "reject"
                          ? "red"
                          : "grey",
                    }}
                  ></View>
                  <Text
                    style={{
                      paddingHorizontal: RFPercentage(1),
                      fontFamily: Fonts.SemiBold,
                      color: Colors.Gray2,
                      fontSize: RFValue(12),
                      textTransform: "capitalize",
                    }}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginVertical: RFPercentage(3),
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.CancelAppoinments(item);
                  }}
                  style={{
                    borderWidth: 1,
                    borderColor: "rgb(52,70,90)",
                    borderRadius: RFValue(14),
                    width: "48%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "rgb(52,70,90)",
                      fontSize: RFValue(14),
                      fontFamily: Fonts.Bold,
                      paddingVertical: RFPercentage(1.5),
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.RescheduleAppoinments(item);
                  }}
                  style={{
                    backgroundColor: "rgb(52,70,90)",
                    borderRadius: RFValue(14),
                    width: "48%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      fontFamily: Fonts.Bold,
                      paddingVertical: RFPercentage(1.5),
                      color: Colors.White,
                    }}
                  >
                    Reschedule
                  </Text>
                </TouchableOpacity>
              </View>
              {/* </View> */}
            </View>
            {/* <Text>{item.status}</Text> */}
          </View>
        );
      } else {
        return null;
      }
    }
    // return (
    //   <View
    //     style={{
    //       borderRadius: RFPercentage(2),
    //       marginVertical: RFPercentage(1.8),
    //       backgroundColor: "white",
    //       width: windowWidth / 1.1,
    //       height: windowHeight / 3.1,
    //       paddingHorizontal: RFValue(14),
    //       shadowColor: "#000",
    //       shadowOffset: { height: 2 },
    //       shadowRadius: 3,
    //       shadowOpacity: 0.2,
    //       elevation: 2,
    //     }}
    //   >
    //     <View style={{ paddingHorizontal: RFValue(3) }}>
    //       <View
    //         style={{
    //           paddingVertical: RFPercentage(2),
    //           flexDirection: "row",
    //           marginTop: RFPercentage(1),
    //         }}
    //       >
    //         <Image
    //           source={{ uri: item.trainer.image }}
    //           style={{
    //             height: RFPercentage(10),
    //             width: RFPercentage(10),
    //             borderRadius: RFPercentage(10),
    //           }}
    //         />
    //         <View
    //           style={{
    //             paddingHorizontal: RFPercentage(1),
    //             justifyContent: "space-between",
    //             width: windowWidth / 2,
    //           }}
    //         >
    //           <Text
    //             style={{
    //               fontFamily: Fonts.Black,
    //               fontSize: RFValue(16),
    //               color: Colors.Black,
    //             }}
    //           >
    //             {item.trainer.name}
    //           </Text>
    //           <Text
    //             style={{
    //               fontFamily: Fonts.Bold,
    //               color: Colors.Gray2,
    //               fontSize: RFValue(14),
    //             }}
    //           >
    //             Therapist
    //           </Text>
    //           <View style={{ flexDirection: "row", alignItems: "center" }}>
    //             <Image
    //               source={IMAGE.StarIcon}
    //               style={{
    //                 height: RFPercentage(2),
    //                 width: RFPercentage(2),
    //                 tintColor: "rgb(52,70,90)",
    //               }}
    //             />
    //             <Text
    //               style={{
    //                 fontFamily: Fonts.Bold,
    //                 fontSize: RFValue(12),
    //                 color: Colors.Black,
    //                 paddingHorizontal: RFPercentage(1),
    //               }}
    //             >
    //               {item.trainer.rating}
    //             </Text>
    //           </View>
    //         </View>
    //         {item.isVideoCall == 1 ? (
    //           <View style={{}}>
    //             <TouchableOpacity
    //               style={{
    //                 backgroundColor: "rgb(52,70,90)",
    //                 height: RFPercentage(6),
    //                 width: RFPercentage(6),
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //                 borderRadius: RFPercentage(6),
    //               }}
    //               onPress={() => this.MakeVideoCall(item)}
    //             >
    //               <Image
    //                 source={IMAGE.JoinVideoCall}
    //                 style={{
    //                   height: RFPercentage(4),
    //                   width: RFPercentage(4),
    //                 }}
    //               />
    //             </TouchableOpacity>
    //           </View>
    //         ) : null}
    //       </View>
    //       {/* <View style={{ marginVertical: RFPercentage(3) }}> */}
    //       <View
    //         style={{
    //           marginVertical: RFPercentage(3),
    //           height: 1.5,
    //           width: "100%",
    //           backgroundColor: "rgb(240,240,240)",
    //         }}
    //       />
    //       <View
    //         style={{
    //           flexDirection: "row",
    //           justifyContent: "space-between",
    //           width: "100%",
    //         }}
    //       >
    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             width: "35%",
    //             justifyContent: "center",
    //           }}
    //         >
    //           <Image
    //             source={IMAGE.calendarIcon}
    //             style={{
    //               height: RFPercentage(3),
    //               width: RFPercentage(3),
    //               tintColor: Colors.Gray2,
    //             }}
    //           />
    //           <Text
    //             style={{
    //               paddingHorizontal: RFPercentage(1),
    //               fontFamily: Fonts.SemiBold,
    //               color: Colors.Gray2,
    //               fontSize: RFValue(12),
    //             }}
    //           >
    //             {item.date}
    //             {/* {moment(item.date).format('D MMM YYYY')} */}
    //           </Text>
    //         </View>
    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             width: "32%",
    //             justifyContent: "center",
    //           }}
    //         >
    //           <Image
    //             source={IMAGE.ClockIcon}
    //             style={{
    //               height: RFPercentage(3),
    //               width: RFPercentage(3),
    //               tintColor: Colors.Gray2,
    //             }}
    //           />
    //           <Text
    //             style={{
    //               paddingHorizontal: RFPercentage(1),
    //               fontFamily: Fonts.SemiBold,
    //               color: Colors.Gray2,
    //               fontSize: RFValue(12),
    //             }}
    //           >
    //             {item.time}
    //             {/* {moment(item.time , 'h:mm:ss').format('h:mm a')} */}
    //           </Text>
    //         </View>
    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             width: "32%",
    //             justifyContent: "center",
    //             // backgroundColor: "red",
    //           }}
    //         >
    //           <View
    //             style={{
    //               height: RFPercentage(1),
    //               width: RFPercentage(1),
    //               borderRadius: RFPercentage(1),
    //               backgroundColor:
    //                 item.status == "pending"
    //                   ? "yellow"
    //                   : item.status == "confirmed"
    //                   ? "green"
    //                   : item.status == "reject"
    //                   ? "red"
    //                   : "grey",
    //             }}
    //           ></View>
    //           <Text
    //             style={{
    //               paddingHorizontal: RFPercentage(1),
    //               fontFamily: Fonts.SemiBold,
    //               color: Colors.Gray2,
    //               fontSize: RFValue(12),
    //               textTransform: "capitalize",
    //             }}
    //           >
    //             {item.status}
    //           </Text>
    //         </View>
    //       </View>
    //       <View
    //         style={{
    //           marginVertical: RFPercentage(3),
    //           flexDirection: "row",
    //           justifyContent: "space-between",
    //         }}
    //       >
    //         <TouchableOpacity
    //           onPress={() => {
    //             this.CancelAppoinments(item);
    //           }}
    //           style={{
    //             borderWidth: 1,
    //             borderColor: "rgb(52,70,90)",
    //             borderRadius: RFValue(14),
    //             width: "48%",
    //             justifyContent: "center",
    //             alignItems: "center",
    //           }}
    //         >
    //           <Text
    //             style={{
    //               color: "rgb(52,70,90)",
    //               fontSize: RFValue(14),
    //               fontFamily: Fonts.Bold,
    //               paddingVertical: RFPercentage(1.5),
    //             }}
    //           >
    //             Cancel
    //           </Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           onPress={() => {
    //             this.RescheduleAppoinments(item);
    //           }}
    //           style={{
    //             backgroundColor: "rgb(52,70,90)",
    //             borderRadius: RFValue(14),
    //             width: "48%",
    //             justifyContent: "center",
    //             alignItems: "center",
    //           }}
    //         >
    //           <Text
    //             style={{
    //               fontSize: RFValue(14),
    //               fontFamily: Fonts.Bold,
    //               paddingVertical: RFPercentage(1.5),
    //               color: Colors.White,
    //             }}
    //           >
    //             Reschedule
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //       {/* </View> */}
    //     </View>
    //     {/* <Text>{item.status}</Text> */}
    //   </View>
    // );
  };

  render() {
    // const filteredData =
    //   this.state.TrainerBoookingList &&
    //   Array.isArray(this.state.TrainerBoookingList)
    //     ? this.state.TrainerBoookingList.filter((item) => {
    //         const isUpcoming = moment(item.date).isSameOrAfter(
    //           moment().format("YYYY-MM-DD")
    //         );
    //         console.log("upcomming", isUpcoming);
    //         return this.stateSelectButton === "upcoming"
    //           ? isUpcoming
    //           : !isUpcoming;
    //       })
    //     : [];

    return (
      <>
        <View>
          {/* <ImageBackground
            //  resizeMode="contain"
            source={r
              this.state.isLoading
                ? IMAGE.HomeImage
                : { uri: this.state.BG.image }
            }
            style={{ height: windowHeight }}
          > */}
          <View>
            <StatusBar
              hidden={false}
              barStyle={"dark-content"}
              translucent
              backgroundColor="transparent"
            />
            <View style={InnerStyle.HeaderMainStyle}>
              <TouchableOpacity onPress={() => this.props.navigation?.goBack()}>
                <Image
                  resizeMode="contain"
                  source={IMAGE.LeftSideIcon}
                  style={[
                    InnerStyle.DrawerIconStyle,
                    { tintColor: Colors.Black },
                  ]}
                />
              </TouchableOpacity>
              <Text style={[InnerStyle.HeaderTitle, { color: Colors.Black }]}>
                Appointment Status
              </Text>
              <View style={InnerStyle.BlankSpace}></View>
            </View>
            <View
              style={{
                paddingHorizontal: RFValue(16),
                marginTop: RFPercentage(3),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgb(206, 215, 227)",
                  justifyContent: "space-around",
                  height: RFPercentage(7),
                  borderRadius: RFValue(14),
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ SelectButton: false });
                  }}
                  style={{
                    backgroundColor:
                      this.state.SelectButton == false ? "rgb(52,70,90)" : null,
                    alignItems: "center",
                    width: "48%",
                    borderRadius: RFValue(10),
                  }}
                >
                  <Text
                    style={{
                      textAlignVertical: "center",
                      paddingVertical: RFPercentage(1.5),
                      fontFamily: Fonts.Bold,
                      fontSize: RFValue(15),
                      color:
                        this.state.SelectButton == false
                          ? Colors.White
                          : "rgb(52,70,90)",
                    }}
                  >
                    Upcoming
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ SelectButton: true });
                  }}
                  style={{
                    width: "48%",
                    backgroundColor:
                      this.state.SelectButton == true ? "rgb(52,70,90)" : null,
                    alignItems: "center",
                    borderRadius: RFValue(10),
                  }}
                >
                  <Text
                    style={{
                      textAlignVertical: "center",
                      paddingVertical: RFPercentage(1.5),
                      fontFamily: Fonts.Bold,
                      fontSize: RFValue(15),
                      color:
                        this.state.SelectButton == true
                          ? Colors.White
                          : "rgb(52,70,90)",
                    }}
                  >
                    Previous
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

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
                  color={"rgb(52,70,90)"}
                  style={{
                    position: "absolute",
                    top: height / 2,
                    left: width / 2.2,
                  }}
                  size={"large"}
                />
              </View>
            ) : this.state.TrainerBoookingList.length == 0 ? (
              <Text
                style={{
                  fontFamily: Fonts.Medium,
                  fontSize: RFValue(16),
                  fontWeight: "700",
                  color: Colors.Black,
                  alignSelf: "center",
                  marginTop: RFPercentage(36),
                }}
              >
                You do not have any appointments
              </Text>
            ) : (
              <View
                style={{
                  marginTop: RFPercentage(2),
                  paddingHorizontal: RFValue(0),
                  height: windowHeight / 1.3,
                }}
              >
                <FlatList
                  // removeClippedSubviews={true}
                  // maxToRenderPerBatch={3}
                  style={{}}
                  contentContainerStyle={{
                    alignItems: "center",
                    flexDirection: "column-reverse",
                  }}
                  // numColumns={2}
                  data={this.state.TrainerBoookingList}
                  keyExtractor={(item) => item.id}
                  renderItem={this.AppointmentsList}
                  // ListEmptyComponent={() => (
                  //   <View>
                  //     {this.state.showNoDataFound && <Text>No Data Found</Text>}
                  //   </View>
                  // )}
                />
                {/* {this.state.TrainerBoookingList.filter((item) => {
                  const isUpcoming = moment(item.date).isSameOrAfter(
                    moment().format("YYYY-MM-DD")
                  );
                  console.log("adat", isUpcoming);
                })} */}
                {/* {this.state.TrainerBoookingList.filter((item) => {
                  const isUpcoming = moment(item.date).isSameOrAfter(
                    moment().format("YYYY-MM-DD")
                  );
                  return !this.state.SelectButton && isUpcoming;
                }).length !== 0 ? (
               
                ) : (
                  <View>
                    <Text>Hii</Text>
                  </View>
                )} */}
              </View>
            )}
            <RBSheet
              ref={(ref) => {
                this.RescheduleAppointmentDetail = ref;
              }}
              onClose={this.CloseSheet}
              closeOnDragDown={true}
              customStyles={{
                container: {
                  height: windowHeight / 1.1,
                  borderRadius: RFPercentage(2),
                },
              }}
            >
              <ScrollView
                style={{ marginHorizontal: RFValue(14) }}
                showsVerticalScrollIndicator={false}
              >
                {this.ScheduleSelectPage()}
              </ScrollView>
            </RBSheet>
          </View>
          {/* </ImageBackground> */}
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("Rschedfule", JSON.stringify(state.RescheduleAppoinment));
  return {
    BookingStatus: state.BookingStatus,
    SelectDuration: state.SelectDuration,
    RescheduleAppoinment: state.RescheduleAppoinment,
    CancelAppoinment: state.CancelAppoinment,
    VideoCall: state.VideoCall,
  };
};

export default connect(mapStateToProps, {
  BookingStatusAction,
  SelectDurationAction,
  RescheduleAppoinmentAction,
  CancelApooinmentAction,
  VideoCallAction,
})(BookingStatusScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(249,249,249)",
    padding: 16,
  },
  dropdown: {
    backgroundColor: "rgb(249,249,249)",
    height: 50,
    // borderColor: 'gray',
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    addingHorizontal: RFPercentage(2),
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingHorizontal: RFPercentage(1),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
