import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { FlatList } from "react-native-gesture-handler";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from "../../common/colors";
import * as Fonts from "../../common/Fonts";
import * as IMAGE from "../../common/Image";
import { InnerStyle } from "./InnerStyle";
import LinearGradient from "react-native-linear-gradient";
import { SubInnerStyle } from "../SubComponent/SubInnerStyle";
// import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  ExploreAction,
  TrainerAction,
  TrainerReviewAction,
  BGImageAction,
  TherapistBookingAction,
  SelectDurationAction,
} from "../../redux/action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotesStyle } from "../SubComponent/NotesStyle";
import { VideoPlayerStyle } from "../Component/VideoPlayerStyle";
import { WebView } from "react-native-webview";
import { Rating } from "react-native-ratings";
import Toast from "react-native-simple-toast";
import RBSheet from "react-native-raw-bottom-sheet";
import { color } from "react-native-reanimated";
import { Calendar } from "react-native-calendars";
import { Dropdown } from "react-native-element-dropdown";
import { CardField, confirmPayment } from "@stripe/stripe-react-native";
import moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import { global } from "../../../global";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;
// const navigation = useNavigation();
const win = Dimensions.get("window");
const ratio = win.width / 535; //541 is actual image width

const { width, height } = Dimensions.get("window");
// const {confirmPayment} = useStripe();
class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Count: 0,
      searchValue: "",
      isLoading: true,
      isLoader: false,
      ApiCheckStatus: true,
      bgimgloading: true,
      isModal: false,
      TrainerStar: 0,
      APiExploreTopicData: [],
      SubCateApiData: [],
      MediaApiData: [],
      TrainerDetailData: [],
      SelectedTrainerData: [],
      searchedFilterData: [],
      isSearchActive: false,
      lengthMore: false,
      textShown: true,
      PageChangeindex: 0,
      SelectTimeSlotBook: -1,
      SelectedData: "", //
      SelectedImage: "",
      SelectedTherapistName: "",
      SelectedExperience: "",
      SelectedCharges: "",
      SelectedAvaibilityDay: "",
      SelectedAvaibilityTime: "",
      SelectID: "",
      SelectedTherapistRating: "",
      TodayDate: moment().format("YYYY-MM-DD"),
      markedDates: "",
      TrainerAbout: "",
      TherapistDurationData: "",
      Review: "",
      BG: "",
      SelectedDate: "",
      TherapistNote: "",
      SelectedItemCharges: null,
      SelectDurationParams: null,
      PaymentStatus: "",
      cardInfo: false,
      Key: "",
      TherapistBookStata: "",
      bookingDate: "", // moment().format("Do MMMM YYYY"),
      BookTherapistName: "",
      PaymentInputCompate: "",
      TherapistReview: [],
      checkList: false,
      noData: false,
      TimeData: [
        { label: "30 minutes", value: "1", Duration: 30 },
        { label: "60 minutes", value: "2", Duration: 60 },
      ],
      GenderSelection: [
        { label: "Male", value: "1" },
        { label: "Female", value: "2" },
      ],
      AgeSelection: [
        { label: "20 years", value: "1" },
        { label: "21 years", value: "2" },
        { label: "22 years", value: "3" },
        { label: "23 years", value: "4" },
        { label: "24 years", value: "5" },
        { label: "25 years", value: "6" },
        { label: "26 years", value: "7" },
        { label: "27 years", value: "8" },
        { label: "28 years", value: "9" },
      ],
      SelectionGender: "",
      SelectTimeSection: "",
      SelectAge: "",
      DropDownFocus: false,
      SelectionButton: 0,
    };
    this.oldProps = {};
    // this.stripe = useStripe()
  }

  // ExploreTopicAPI = async () => {

  // };

  async fetchCardDetail(cardDetails) {
    console.log("cardDetail", cardDetails);
    if (cardDetails.complete) {
      this.setState({ cardInfo: cardDetails.complete });
      const SecretKey =
        "sk_test_51MLKb0SCKYNLFEQfT87xiq4ReDFVxylZEXuJovvV0O7c1VeXeZlQF4g4UfN5ra6aCVNk64M7HEUJpEEhD38Js1Dq0010X4G6Xm";
      let amount = this.state.SelectedItemCharges;
      try {
        const response = await fetch(
          "https://api.stripe.com/v1/payment_intents",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${SecretKey}`,
            },
            body: `amount=${amount}&currency=inr&payment_method_types[]=card`,
          }
        );
        const data = await response.json();
        console.log("RESPONSE===>>>>>>", data);
        const clientSecret = data.client_secret;
        this.setState({ Key: clientSecret });
        //  return data;
        // Do something with the client secret
      } catch (error) {
        console.error("Something Error", error);
        promises.reject(error);
      }
    } else {
      this.setState({ cardInfo: cardDetails.complete });
    }
  }

  async componentDidUpdate() {
    // if(this.state.PageChangeindex !== this.oldProps.PageChangeindex){
    //   console.log('OldProps',this.oldProps)
    // }
    if (this.state.PageChangeindex == 3) {
      if (this.state.ApiCheckStatus) {
        // console.log("CardDitail",this.state.cardInfo)
        this.fetchCardDetail();
        // return this.state.PageChangeindex;
        this.setState({ ApiCheckStatus: false });
      }
    }

    // this.setState({ TrainerDetailData: TrainerDetailData });
    // else{
    //   return true;s
    // }
  }

  PaymentFuncation = async () => {
    // const { confirmPayment } = useStripe()
    console.log("ClientSecretKey", this.state.Key);
    this.setState({ isLoader: true });
    //     // setloading(true)

    confirmPayment(this.state.Key, {
      paymentMethodType: "Card",
      // paymentMethodData:{
      //   paymentMethodId:payment.id
      // }
    }).then((res) => {
      // console.log('res==>>>', res);
      this.setState({ PaymentStatus: res });
      this.setState({ isLoader: true });
      if (this.state.SelectedDate == "") {
        this.props.TherapistBookingAction({
          trainer: this.state.SelectID,
          date: this.state.TodayDate,
          time: this.state.SelectTimeSlotBook,
          duration: this.state.SelectDurationParams,
          video_call: this.state.SelectionButton,
          pre_session_note: this.state.TherapistNote,
          paymentkey: this.state.PaymentStatus.paymentIntent.clientSecret,
        });
      } else {
        this.props.TherapistBookingAction({
          trainer: this.state.SelectID,
          date: this.state.SelectedDate,
          time: this.state.SelectTimeSlotBook,
          duration: this.state.SelectDurationParams,
          video_call: this.state.SelectionButton,
          pre_session_note: this.state.TherapistNote,
          paymentkey: this.state.PaymentStatus.paymentIntent.clientSecret,
        });
      }

      if (res.paymentIntent) {
        // this.setState({ isLoader: false },()=>{
        Alert.alert("Success", "Payment Successfully Done", [
          {
            text: "OK",
            onPress: () =>
              this.setState({
                PageChangeindex: this.state.PageChangeindex + 1,
              }),
          },
        ]);
        // });

        // Transaction(res.paymentIntent);
      } else {
        // setloading(false)
        Alert.alert("Failed", res.error.message, [
          {
            text: "OK",
            // onPress: () => navigation.navigate("Dashboard"),
          },
        ]);
      }
    });
    this.setState({ isLoader: false });

    // if(!!this.state.cardInfo){
    //   try {
    //     const resToken =await createToken({...this.state.cardInfo , type :'Card'})
    //     console.log('ResponceTokenHere',resToken)
    //   } catch (error) {
    //     console.log('Errror===>',error)
    //   }
    // }
    // confirmPayment(Key,{
    //   paymentMethodType : 'Card',
    //   paymentMethodData:{
    //     billingDetails:{
    //       name : ,
    //       email :
    //     }
    //   }
    // })
    // Alert.alert("Payment Done", "", [
    //   { text: "Cancel", onPress: () => null, style: "cancel" },
    //   {
    //     text: "OK",
    //   },
    // ]);
  };

  async componentDidMount() {
    const ACToken = await AsyncStorage.getItem("AccessToken");
    // this.ExploreTopicAPI();
    this.props.ExploreAction(ACToken);
    this.props.TrainerAction(ACToken);
    this.props.BGImageAction(ACToken);
    // this.setState({ OriginalData: TrainerDetailData });

    // this.setState({ TrainerDetailData });
    // this.TraineDetailOpen();
    // this.TrainerDetail.open();
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.ExploreTopic) {
      if (nextProps.ExploreTopic.ExploreTopicSuccess) {
        const CateData = nextProps.ExploreTopic.data.data.category;
        // const SubCateData = nextProps.ExploreTopic.data.data.subcategory;
        // this.setState({ SubCateApiData: SubCateData });
        // const BgColour = nextProps.ExploreTopic.data.data.category[0].colour;
        // this.setState({BGColor : BgColour})
        this.setState({ APiExploreTopicData: CateData });
        this.setState({ isLoading: false });
      } else {
        this.setState({ isLoading: true });
      }
    }
    if (nextProps.Trainer) {
      this.setState({ isLoading: true });
      if (nextProps.Trainer.TrainerSuccess) {
        const TrainerData = nextProps.Trainer.data.data;
        console.log("Trainer---->", TrainerData);
        this.setState({ TrainerDetailData: TrainerData });
        this.setState({ isLoading: false });
      }
    }
    // if (nextProps.TrainerReview) {
    //   if (nextProps.TrainerReview.TrainerReviewSuccess) {
    //     this.setState({ isLoading: false });
    //     Toast.showWithGravity(
    //       nextProps.TrainerReview.data.message,
    //       Toast.SHORT,
    //       Toast.BOTTOM
    //     );
    //   }
    // }
    if (nextProps.BGImage) {
      if (nextProps.BGImage.BGImageSuccess) {
        const BGI = nextProps.BGImage.data.data;
        const found = BGI.find((obj) => {
          return obj.name === "Explore";
        });
        this.setState({ BG: found.image });
      }
    }
    if (nextProps.SelectDuration) {
      if (nextProps.SelectDuration.SelectDurationSuccess) {
        const DurationRes = nextProps.SelectDuration.data.data;
        console.log("SelectDurationResponce", DurationRes);
        this.setState({ TherapistDurationData: DurationRes });
        this.setState({ isLoader: false });
        this.setState({ noData: true });
      } else {
        this.setState({ isLoader: false });
      }
    } else {
      this.setState({ isLoader: true });
    }
    if (nextProps.Therapist) {
      if (nextProps.Therapist.BookingTherapistSuccess) {
        const TherapistBookingRes = nextProps.Therapist.data.data;
        let bookingDate = nextProps?.Therapist?.data?.data?.date;
        let BookTherapistName = nextProps?.Therapist?.data?.data?.trainer?.name;
        this.setState({ TherapistBookStata: TherapistBookingRes });
        this.setState({ bookingDate: bookingDate });
        this.setState({ BookTherapistName: BookTherapistName });
      }
      console.log("TherapistBookingNextProps", nextProps.Therapist);
    }
  }

  close = () => {
    this.setState({ isModal: false });
  };

  onChangeDuration = (item) => {
    {
      this.setState({
        SelectTimeSection: this.state.TimeData.item,
      });
      this.setState({ SelectDurationParams: item.Duration }, () => {
        console.log("SelectDurationParams", this.state.SelectDurationParams);
      });
      if (this.state.SelectedDate == "") {
        this.props.SelectDurationAction({
          trainer: this.state.SelectID,
          duration: item.Duration,
          date: this.state.TodayDate,
        });
      } else {
        this.props.SelectDurationAction({
          trainer: this.state.SelectID, //1,//this.state.SelectedData.id,
          duration: item.Duration,
          date: this.state.SelectedDate,
        });
      }

      this.setState({ DropDownFocus: false });
      this.setState({ isLoader: true });
    }
    // if(!this.state.SelectTimeSection == ""){

    // }
  };

  TrainerRanderData = ({ item, index }) => {
    return (
      <View style={{ width: "50%", height: "100%" }}>
        <View
          style={{
            backgroundColor: "rgb(90,101,113)",
            width: "95%",
            height: "90%",
            borderRadius: RFPercentage(2),
          }}
        >
          <View style={{}}>
            <Image
              source={item.Image}
              style={{
                height: RFPercentage(10),
                width: RFPercentage(10),
                borderRadius: RFPercentage(10),
                borderWidth: 1,
                borderColor: Colors.White,
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  TraineDetailOpen(item) {
    console.log("SelectedData", item);
    this.setState({ SelectedData: item, SelectID: item.id });
    this.setState({ TherapistReview: item.trainer_review }, () => {
      console.log("SelectedReviewData", this.state.TherapistReview);
    });
    this.setState({
      TrainerAbout: item.about_us,
      SelectedItemCharges: item.charges,
      SelectedTherapistName: item.name,
      SelectedExperience: item.experience,
      SelectedCharges: item.charges,
      SelectedImage: item.image,
      SelectedAvaibilityDay: item.avaibility_day,
      SelectedAvaibilityTime: item.avaibility_time,
      SelectedTherapistRating: item.rating,
    });
    this.TrainerDetail.open();
  }

  TherapistsList = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          maxWidth: windowWidth / 2.1,
          height: windowHeight / 3,
          alignItems: "center",
          flex: 1,
          paddingTop: RFPercentage(6),
          // backgroundColor:'red'
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(36, 58, 85, 0.6)",
            width: windowWidth / 2.3,
            height: windowHeight / 3.7,
            borderRadius: RFPercentage(1),
          }}
        >
          <View style={{ top: -RFValue(40) }}>
            <Image
              source={{ uri: item.image }}
              style={{
                backgroundColor: "white",
                height: RFPercentage(12),
                width: RFPercentage(12),
                borderRadius: RFPercentage(12),
                borderWidth: 1,
                borderColor: Colors.White,
                alignSelf: "center",
              }}
            />
          </View>
          <View style={{ top: -RFValue(30), alignItems: "center" }}>
            <Text
              style={{
                color: Colors.White,
                fontFamily: Fonts.SemiBold,
                fontSize: RFValue(13),
              }}
            >
              {item.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              top: -RFValue(20),
            }}
          >
            <View
              style={{
                backgroundColor: "#1B292A",
                alignItems: "center",
                height: RFPercentage(9),
                width: RFPercentage(6),
                borderRadius: RFPercentage(1),
                justifyContent: "space-evenly",
              }}
            >
              <Image
                resizeMode="contain"
                source={IMAGE.Back_In_Time}
                style={{
                  height: RFPercentage(3.5),
                  width: RFPercentage(3.5),
                }}
              />
              <Text
                style={{
                  color: Colors.White,
                  fontSize: RFValue(8),
                  fontFamily: Fonts.Medium,
                }}
              >
                {item.experience} Years
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#1B292A",
                alignItems: "center",
                height: RFPercentage(9),
                width: RFPercentage(6),
                borderRadius: RFPercentage(1),
                justifyContent: "space-evenly",
              }}
            >
              <Image
                resizeMode="contain"
                source={IMAGE.Customer_Review}
                style={{
                  height: RFPercentage(3.5),
                  width: RFPercentage(3.5),
                }}
              />
              <Text
                style={{
                  color: Colors.White,
                  fontSize: RFValue(8),
                  fontFamily: Fonts.Medium,
                }}
              >
                {/* 4.9/5 */}
                {item.rating}/5
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#1B292A",
                alignItems: "center",
                height: RFPercentage(9),
                width: RFPercentage(6),
                borderRadius: RFPercentage(1),
                justifyContent: "space-evenly",
              }}
            >
              <Image
                resizeMode="contain"
                source={IMAGE.$}
                style={{ height: RFPercentage(3), width: RFPercentage(3) }}
              />
              <Text
                style={{
                  color: Colors.White,
                  fontSize: RFValue(8),
                  fontFamily: Fonts.Medium,
                }}
              >
                {item.charges}/h
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                borderRadius: RFPercentage(1),
                alignSelf: "center",
                backgroundColor: Colors.White,
                // top:-RFValue(10),
                bottom: RFValue(5),
              }}
              onPress={() => this.TraineDetailOpen(item)}
            >
              <Text
                style={{
                  paddingHorizontal: RFPercentage(4),
                  paddingVertical: RFValue(4),
                  color: "#2B2958",
                  fontFamily: Fonts.Medium,
                  fontSize: RFPercentage(2),
                }}
              >
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    this.setState({ textShown: !this.state.textShown });
    // setTextShown(!textShown);
  };
  //  onTextLayout = ((e) => {

  //   // setLengthMore();
  //   // console.log(e.nativeEvent);
  // }, []);

  onTextLayout = (nativeEvent) => {
    // console.log("log", nativeEvent);
    // this.setState({lengthMore : nativeEvent.lines.length >= 2}) //to check the text is more than 4 lines or not
  };
  BackToDetail = () => {
    this.setState({
      PageChangeindex: this.state.PageChangeindex - 1,
      ApiCheckStatus: true,
      SelectTimeSection: "",
      SelectedData: "",
      markedDates: "",
    });
    this.setState({ TherapistDurationData: "" });
    // this.setState({ ScheduleSelect: false });
    // this.ScheduleSelectPage;
  };

  BookSchedule = () => {
    this.setState({ PageChangeindex: this.state.PageChangeindex + 1 }, () => {
      console.log("IndexIncriment", this.state.PageChangeindex);
    });
  };

  SelectPacakgeFuncation = () => {
    this.setState({ ScheduleSelect: false });
    this.setState({ PacakgeSelect: true });
    this.SelectPackage();
  };

  SelecationButtonRadio = () => {
    if (this.state.SelectionButton == 0) {
      this.setState({ SelectionButton: 1 });
    } else {
      this.setState({ SelectionButton: 0 });
    }
  };

  CancelPaymentFuncation = () => {
    this.setState({ PageChangeindex: this.state.PageChangeindex - 1 });
  };

  // fetchCardDetail = (cardDetails) =>{
  //   if(cardDetails.complete){
  //     this.setState({cardInfo:cardDetails})
  //   }else{
  //     this.setState({cardInfo:null})
  //   }
  // }

  VideoCallChange = () => {
    this.TrainerDetail.close();
    // this.closeOnDragDown()
    this.props.navigation.navigate("BookingStatusScreen");
    // this.setState({PageChangeindex: 0,SelectTimeSlotBook: -1,})
  };

  CloseSheet = () => {
    this.setState({ TherapistDurationData: "" });
    this.setState({
      PageChangeindex: 0,
      SelectTimeSlotBook: -1,
      TherapistNote: "",
      ApiCheckStatus: true,
      SelectTimeSection: "",
      SelectedData: "",
      markedDates: "",
      isLoader: false,
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

  ReviewListData = (item) => {
    console.log("ITEMS", item);
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginVertical: RFPercentage(1),
        }}
      >
        <Image
          source={require("../../assets/images/DemoTherapist3.png")}
          style={{
            height: RFPercentage(8),
            width: RFPercentage(8),
            // backgroundColor: "rgb(190,195,196)",
            borderRadius: RFPercentage(1),
          }}
        />
        <View style={{ marginHorizontal: RFPercentage(1), width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
              // backgroundColor: "blue",
            }}
          >
            <Text>{item.item.user_name}</Text>
            <View
              style={{
                borderRadius: RFPercentage(1.5),
                backgroundColor: "#385166",
              }}
            >
              <Text
                style={{
                  paddingVertical: RFPercentage(0.3),
                  paddingHorizontal: RFPercentage(2),
                  color: Colors.White,
                  fontFamily: Fonts.Bold,
                }}
              >
                {item.item.rating}
              </Text>
            </View>
          </View>

          <View style={{ width: "80%" }}>
            <Text style={{ color: Colors.Black, fontFamily: Fonts.Regular }}>
              {item.item.review}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  ScheduleSelectPage = () => {
    const { isModal, textShown, lengthMore, TrainerReview } = this.state;

    // console.log('SelectAboutUs',)
    const aboutText = this.state.TrainerAbout;
    const ShortText = textShown ? aboutText.substring(0, 126) : aboutText;
    console.log("lenght", this.state.TherapistReview);
    return (
      <>
        {this.state.PageChangeindex == 0 ? (
          <View>
            {/* {console.log('SelectedData===>',this.state.SelectedData.trainer_review)} */}
            <View
              style={{
                height: windowHeight / 7.5,
                borderRadius: RFPercentage(1),
                backgroundColor: "#F6F6F6",
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: RFValue(10),
              }}
            >
              <Image
                source={{ uri: this.state.SelectedImage }}
                style={{
                  height: RFPercentage(12),
                  width: RFPercentage(12),
                  // backgroundColor: "rgb(190,195,196)",
                  borderRadius: RFPercentage(1),
                }}
              />
              <View
                style={{
                  marginHorizontal: RFPercentage(2),
                  justifyContent: "space-between",
                  height: "65%",
                  // backgroundColor: "blue",
                }}
              >
                <Text
                  style={{
                    color: Colors.Black,
                    fontFamily: Fonts.Bold,
                    fontSize: RFValue(15),
                  }}
                >
                  {this.state.SelectedTherapistName}
                </Text>
                {/* <Text>Name</Text> */}
                <Text>Therapist</Text>
                <Text>Certified by College</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: RFPercentage(2),
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  borderRadius: RFPercentage(1),
                  height: RFPercentage(6),
                  width: RFPercentage(12),
                  backgroundColor: "#385166",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: Colors.White,
                    textAlign: "center",
                    fontFamily: Fonts.Bold,
                    fontSize: RFValue(11),
                    lineHeight: RFValue(12),
                  }}
                >
                  {this.state.SelectedExperience} Years Experience
                </Text>
              </View>
              <View
                style={{
                  borderRadius: RFPercentage(1),
                  height: RFPercentage(6),
                  width: RFPercentage(12),
                  backgroundColor: "rgba(36, 58, 85, 0.6)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: Colors.White,
                    textAlign: "center",
                    fontFamily: Fonts.Bold,
                    fontSize: RFValue(11),
                    lineHeight: RFValue(12),
                    width: "50%",
                  }}
                >
                  {/* 4.9/5 Rating */}
                  {this.state.SelectedTherapistRating}/5 Rating
                </Text>
              </View>
              <View
                style={{
                  borderRadius: RFPercentage(1),
                  height: RFPercentage(6),
                  width: RFPercentage(12),
                  backgroundColor: "#385166",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: Colors.White,
                    textAlign: "center",
                    fontFamily: Fonts.Bold,
                    fontSize: RFValue(11),
                    lineHeight: RFValue(12),
                    width: "50%",
                  }}
                >
                  From ${this.state.SelectedCharges}/h
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: RFPercentage(3) }}>
              <Text
                style={{
                  color: Colors.Black,
                  fontFamily: Fonts.Regular,
                  fontSize: RFValue(12),
                }}
              >
                About Me
              </Text>
              <Text
                onTextLayout={this.onTextLayout()}
                numberOfLines={textShown ? ShortText : aboutText}
                multiline={true}
                style={{
                  lineHeight: 18,
                  // color: "#565656",
                  Colors: Colors.Black,
                  fontFamily: Fonts.Regular,
                  fontSize: RFValue(13),
                  // textAlignVertical:'bottom',
                }}
                ellipsizeMode="tail"
              >
                {ShortText}
                {/* <TouchableOpacity
                 > */}

                <Text
                  onPress={this.toggleNumberOfLines}
                  style={{
                    // lineHeight: 10,
                    color: "#4267B2",
                    fontFamily: Fonts.Bold,
                    fontSize: RFValue(12),
                    alignSelf: "flex-start",
                  }}
                >
                  {textShown ? " ...read more" : " read less"}
                </Text>
                {/* </TouchableOpacity> */}
              </Text>
            </View>
            <Text
              style={{
                color: Colors.Black,
                fontFamily: Fonts.Regular,
                fontSize: RFValue(12),
                paddingVertical: RFPercentage(0.5),
              }}
            >
              Schedule
            </Text>
            <Text
              style={{
                color: Colors.Black,
                fontFamily: Fonts.Regular,
                paddingVertical: RFPercentage(0.5),
                width: windowWidth / 1.1,
              }}
            >
              Available {this.state.SelectedAvaibilityDay}{" "}
              {this.state.SelectedAvaibilityTime}
            </Text>
            <Text
              style={{
                color: Colors.Black,
                fontFamily: Fonts.Regular,
                fontSize: RFValue(13),
                marginTop: RFPercentage(2),
              }}
            >
              Reviews
            </Text>
            {/* <View>{this.ReviewListData()}</View> */}

            <ScrollView>
              {this.state.TherapistReview.length == 0 ? (
                <View>
                  <Text
                    style={{
                      fontFamily: Fonts.SemiBold,
                      color: Colors.Black,
                      fontSize: RFValue(13),
                      marginTop: RFValue(10),
                    }}
                  >
                    No review’s yet.
                  </Text>
                </View>
              ) : (
                <FlatList
                  style={{}}
                  data={this.state.TherapistReview}
                  keyExtractor={(item) => item}
                  renderItem={this.ReviewListData}
                />
              )}
            </ScrollView>
            <View style={{ marginVertical: RFPercentage(3) }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#385166",
                  alignItems: "center",
                  borderRadius: RFPercentage(1.5),
                }}
                onPress={this.BookSchedule}
              >
                <Text
                  style={{
                    color: Colors.White,
                    paddingVertical: RFPercentage(1.5),
                    fontFamily: Fonts.Regular,
                    fontSize: RFPercentage(2),
                  }}
                >
                  BOOK NOW
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : this.state.PageChangeindex == 1 ? (
          <>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={this.BackToDetail} style={{}}>
                  <Image
                    source={IMAGE.LeftSideIcon}
                    style={{
                      height: RFPercentage(3.5),
                      width: RFPercentage(3.5),
                      tintColor: Colors.Black,
                    }}
                  />
                </TouchableOpacity>
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
                  // onDayPress={(day) => {
                  //   if (
                  //     this.state.startDate == "" &&
                  //     this.state.endDate == ""
                  //   ) {
                  //     this.state.markedDate.push(day.dateString);
                  //     this.state.mark = {};
                  //     this.state.mark[day.dateString] = {
                  //       selected: true,
                  //       color: color.purple,
                  //       startingDay: true,
                  //       endingDay: true,
                  //     };
                  //     this.setState({
                  //       startDate: day.dateString,
                  //       markedDate: this.state.markedDate,
                  //       mark: this.state.mark,
                  //     });
                  //     this.getDatewiseReport();
                  //   } else {
                  //     // var startD = moment(this.state.startDate);
                  //     // var currD = moment(day.dateString);

                  //     const diff = currD.diff(startD, "days");
                  //     if (this.state.markedDate.includes(day.dateString)) {
                  //       this.state.markedDate = [];
                  //       this.state.mark = {};
                  //       this.state.mark[day.dateString] = {
                  //         selected: true,
                  //         color: color.purple,
                  //         startingDay: true,
                  //         endingDay: true,
                  //       };
                  //       this.state.markedDate.push(day.dateString);

                  //       this.setState({
                  //         startDate: day.dateString,
                  //         markedDate: this.state.markedDate,
                  //         mark: this.state.mark,
                  //         endDate: day.dateString,
                  //       });
                  //       this.getDatewiseReport();
                  //     } else {
                  //       this.state.markedDate = [];
                  //       if (diff < 0) {
                  //         this.state.mark = {};
                  //         this.state.mark[day.dateString] = {
                  //           selected: true,
                  //           color: color.purple,
                  //           startingDay: true,
                  //           endingDay: true,
                  //         };
                  //         this.state.markedDate.push(day.dateString);
                  //         this.setState({
                  //           startDate: day.dateString,
                  //           markedDate: this.state.markedDate,
                  //           mark: this.state.mark,
                  //           endDate: day.dateString,
                  //         });
                  //         this.getDatewiseReport();
                  //       } else {
                  //         this.setState({ endDate: day.dateString });
                  //         this.getDateRange(
                  //           this.state.startDate,
                  //           day.dateString
                  //         );
                  //         this.getDatewiseReport();
                  //       }
                  //     }
                  //   }
                  // }}
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
                  // renderHeader={date => {
                  //   console.log('Selectmonth',date)
                  //   // let timeStamp = months.timestamp
                  //   // let Month = moment.unix(timeStamp).format('DD/MM/YYYY')
                  //   // console.log("monthchanged", Month);
                  //   // let Month = month(moment.format('MMMM YYYY'))
                  //   return (
                  //     <View style={{ width: windowWidth / 1.5, marginLeft: -15 }}>
                  //       <Text
                  //         style={{
                  //           color: Colors.Black,
                  //           fontFamily: Fonts.Bold,
                  //           fontSize: RFValue(16),
                  //         }}
                  //       >
                  //         {moment().format("MMMM YYYY")}
                  //       </Text>
                  //     </View>
                  //   );
                  // }}
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
                    {this.RanderTimeSlot()}
                  </View>
                )}
                <TouchableOpacity
                  disabled={
                    this.state.SelectTimeSection ||
                    this.state.TherapistDurationData == ""
                  }
                  onPress={this.BookSchedule}
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
                    Next
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
                      top: height / 2.5,
                      left: width / 2.5,
                    }}
                    size={"large"}
                  />
                </View>
              </View>
            ) : undefined}
          </>
        ) : this.state.PageChangeindex == 2 ? (
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={this.BackToDetail} style={{}}>
                <Image
                  source={IMAGE.LeftSideIcon}
                  style={{
                    height: RFPercentage(3.5),
                    width: RFPercentage(3.5),
                    tintColor: Colors.Black,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: Colors.Black,
                  fontFamily: Fonts.Bold,
                  fontSize: RFValue(14),
                }}
              >
                Select Package
              </Text>
            </View>

            <View style={{ marginTop: RFValue(10) }}>
              <Text
                style={{
                  color: Colors.Black,
                  fontFamily: Fonts.Bold,
                  fontSize: RFValue(15),
                }}
              >
                Select Package
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: windowWidth / 1.1,
                  marginVertical: RFPercentage(2),
                  height: windowHeight / 11,
                  borderRadius: RFPercentage(1),
                  borderRightWidth: 2,
                  borderBottomWidth: 2,
                  borderColor: "rgb(242,242,242)",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "70%",
                  }}
                >
                  <Image
                    source={IMAGE.VideoSortIcon}
                    style={{
                      height: RFPercentage(7),
                      width: RFPercentage(7),
                      borderRadius: RFPercentage(4),
                      backgroundColor: "rgb(237,242,252)",
                    }}
                  />
                  <View
                    style={{
                      height: windowHeight / 14,
                      justifyContent: "space-evenly",
                      paddingHorizontal: RFPercentage(1),
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(16),
                      }}
                    >
                      Video Call
                    </Text>
                    <Text
                      style={{
                        color: Colors.Black,
                        fontFamily: Fonts.Medium,
                        fontSize: RFValue(11),
                      }}
                    >
                      video call with doctor
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    width: "30%",
                  }}
                >
                  <View
                    style={{
                      height: windowHeight / 14,
                      paddingHorizontal: RFPercentage(1),
                      justifyContent: "space-evenly",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        color: "rgb(51,70,90)",
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(16),
                      }}
                    >
                      $ {this.state.SelectedItemCharges}
                      {/* {this.state.SelectDurationParams == 60 */}
                      {/* ? */}
                      {/* : this.state.SelectedData?.charges} */}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Fonts.Medium,
                        fontSize: RFValue(10),
                      }}
                    >
                      /{this.state.SelectDurationParams}mins
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={this.SelecationButtonRadio}
                    style={{
                      height: RFPercentage(2.5),
                      width: RFPercentage(2.5),
                      borderColor: "rgb(51,70,90)",
                      borderWidth: 3,
                      borderRadius: RFPercentage(2),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {this.state.SelectionButton == 1 ? (
                      <View
                        style={{
                          height: RFPercentage(1.3),
                          width: RFPercentage(1.3),
                          backgroundColor: "rgb(51,70,90)",
                          borderRadius: RFPercentage(2),
                        }}
                      ></View>
                    ) : null}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ marginVertical: RFPercentage(2) }}>
              <KeyboardAwareScrollView>
                <Text
                  style={{
                    color: Colors.Black,
                    fontFamily: Fonts.Bold,
                    fontSize: RFValue(14),
                  }}
                >
                  Pre-Session Notes For Therapist:
                </Text>
                <TextInput
                  value={this.state.TherapistNote}
                  multiline={true}
                  onChangeText={(value) =>
                    this.setState({ TherapistNote: value })
                  }
                  placeholder={"Therapist Notes(Optional)"}
                  style={{
                    textAlignVertical: "top",
                    fontFamily: Fonts.Medium,
                    fontSize: Fonts,
                    fontSize: RFValue(15),
                    backgroundColor: "rgb(249,249,249)",
                    paddingHorizontal: RFPercentage(2),
                    height: windowHeight / 3,
                    // paddingVertical: RFPercentage(2),
                    marginTop: RFPercentage(2),
                    borderRadius: RFPercentage(2),
                  }}
                />
              </KeyboardAwareScrollView>
            </View>
            {/* <View>
              <Text
                style={{
                  color: Colors.Black,
                  fontFamily: Fonts.Bold,
                  fontSize: RFValue(15),
                }}
              >
                Gender
              </Text>
              <View style={{ marginVertical: RFPercentage(3) }}>
                <Dropdown
                  style={[styles.dropdown]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  // iconStyle={styles.iconStyle}
                  data={this.state.GenderSelection}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={"Select Gender"}
                  searchPlaceholder="Search..."
                  value={this.state.TimeData.value}
                  onFocus={() => this.setState({ DropDownFocus: true })}
                  // onBlur={() => setIsFocus(false)}
                  onChange={() => {
                    this.setState({
                      SelectionGender: this.state.GenderSelection.item,
                    });
                    this.setState({ DropDownFocus: false });
                  }}
                  renderRightIcon={() => (
                    <Image
                      source={IMAGE.SortDownIcon}
                      style={{
                        height: RFPercentage(4),
                        width: RFPercentage(4),
                      }}
                    />
                  )}
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: Colors.Black,
                  fontFamily: Fonts.Bold,
                  fontSize: RFValue(15),
                }}
              >
                Your Age
              </Text>
              <View style={{ marginVertical: RFPercentage(3) }}>
                <Dropdown
                  style={[styles.dropdown]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  // iconStyle={styles.iconStyle}
                  data={this.state.AgeSelection}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={"Select Age"}
                  searchPlaceholder="Search..."
                  value={this.state.TimeData.value}
                  onFocus={() => this.setState({ DropDownFocus: true })}
                  // onBlur={() => setIsFocus(false)}
                  onChange={() => {
                    this.setState({
                      SelectAge: this.state.AgeSelection,
                    });
                    this.setState({ DropDownFocus: false });
                  }}
                  renderRightIcon={() => (
                    <Image
                      source={IMAGE.SortDownIcon}
                      style={{
                        height: RFPercentage(4),
                        width: RFPercentage(4),
                      }}
                    />
                  )}
                />
              </View>
            </View> */}
            <TouchableOpacity
              onPress={this.BookSchedule}
              style={{
                backgroundColor: "rgb(51,70,90)",
                alignItems: "center",
                borderRadius: RFPercentage(4),
              }}
            >
              <Text
                style={{
                  paddingVertical: RFPercentage(2),
                  color: Colors.White,
                  fontFamily: Fonts.Bold,
                  fontSize: RFValue(12),
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        ) : this.state.PageChangeindex == 3 ? (
          <>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={this.BackToDetail} style={{}}>
                  <Image
                    source={IMAGE.LeftSideIcon}
                    style={{
                      height: RFPercentage(3.5),
                      width: RFPercentage(3.5),
                      tintColor: Colors.Black,
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: Colors.Black,
                    fontFamily: Fonts.Bold,
                    fontSize: RFValue(14),
                  }}
                >
                  Select Payment Method
                </Text>
              </View>
              <View
                style={{
                  marginVertical: RFPercentage(2),
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: RFPercentage(1),
                    width: windowWidth / 1.2,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.Black,
                      fontFamily: Fonts.Bold,
                      fontSize: RFValue(14),
                    }}
                  >
                    Total Payment{" "}
                  </Text>
                  <Text
                    style={{
                      color: Colors.Black,
                      fontFamily: Fonts.Bold,
                      fontSize: RFValue(14),
                    }}
                  >
                    {"$"} {this.state.SelectedItemCharges}
                  </Text>
                </View>
                <ImageBackground
                  resizeMode="contain"
                  source={IMAGE.StaticCardImage}
                  style={{ height: windowHeight / 4, width: windowWidth / 1.1 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      paddingHorizontal: RFPercentage(3),
                      bottom: RFPercentage(5),
                    }}
                  >
                    <View
                      style={{
                        height: RFPercentage(10),
                        width: RFPercentage(30),
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.White,
                          fontFamily: Fonts.Bold,
                          fontSize: RFValue(14),
                          // textAlign: "center",
                        }}
                      >
                        {/* {this.state.PaymentInput != '' ? this.state.PaymentInput. :}{"4242 4242 4242 4242"} */}
                        {"4242 4242 4242 4242"}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: windowWidth / 2.1,
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.White,
                            fontFamily: Fonts.SemiBold,
                            fontSize: RFValue(14),
                          }}
                        >
                          {"User Name"}
                        </Text>
                        <Text
                          style={{
                            color: Colors.White,
                            fontFamily: Fonts.SemiBold,
                            fontSize: RFValue(14),
                          }}
                        >
                          {"12/29"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>
              <View style={{}}>
                <Text
                  style={{
                    color: Colors.Black,
                    fontFamily: Fonts.Bold,
                    fontSize: RFValue(14),
                  }}
                >
                  Card Details
                </Text>
                <CardField
                  postalCodeEnabled={false}
                  placeholders={{
                    number: "4242",
                  }}
                  cardStyle={{
                    backgroundColor: "#d9d9d9",
                    borderRadius: RFValue(5),
                    textColor: "#000000",
                  }}
                  style={{
                    width: "100%",
                    height: 50,
                    marginVertical: 30,
                  }}
                  onCardChange={(cardDetails) => {
                    this.fetchCardDetail(cardDetails);
                    this.setState({ PaymentInput: cardDetails });
                  }}
                  onFocus={(focusedField) => {
                    console.log("focusField", focusedField);
                  }}
                />
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgb(221,37,26)",
                    height: RFPercentage(5),
                    width: RFPercentage(20),
                    borderRadius: RFPercentage(1),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={this.CancelPaymentFuncation}
                >
                  <Text
                    style={{
                      color: Colors.White,
                      fontFamily: Fonts.SemiBold,
                      fontSize: RFValue(16),
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={this.state.cardInfo == false}
                  style={{
                    backgroundColor:
                      this.state.cardInfo == false ? "grey" : "rgb(0,172,30)",
                    height: RFPercentage(5),
                    width: RFPercentage(20),
                    borderRadius: RFPercentage(1),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={this.PaymentFuncation}
                >
                  <Text
                    style={{
                      color: Colors.White,
                      fontFamily: Fonts.SemiBold,
                      fontSize: RFValue(16),
                    }}
                  >
                    Pay
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: RFPercentage(5),
                  backgroundColor: "green",
                  paddingVertical: RFPercentage(1),
                  borderRadius: RFPercentage(2),
                }}
                onPress={this.VideoCallChange}
              >
                <Text style={{ color: Colors.White }}>VideoCallScreen</Text>
              </TouchableOpacity> */}
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
                  color={"black"}
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
        ) : this.state.PageChangeindex == 4 ? (
          <>
            <View>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={IMAGE.Checkmarkgray}
                  style={{ height: height * 0.15, width: width * 0.3 }}
                />
                <View
                  style={{
                    alignItems: "center",
                    height: windowWidth / 5,
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.Bold,
                      color: Colors.Black,
                      fontSize: RFValue(18),
                    }}
                  >
                    Thanks for booking
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.Medium,
                      color: Colors.LightPerpale,
                      fontSize: RFValue(13),
                    }}
                  >
                    Your Booking time will be confirm by Therapist
                  </Text>
                </View>
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#A6B7DB",
                  }}
                />
                <View style={{ paddingVertical: RFPercentage(3) }}>
                  <Text
                    style={{
                      color: Colors.Black,
                      fontFamily: Fonts.SemiBold,
                      fontSize: RFValue(13),
                    }}
                  >
                    TherapistName:{this.state.BookTherapistName}
                  </Text>
                </View>
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#A6B7DB",
                  }}
                />
                <View style={{ paddingVertical: RFPercentage(3) }}>
                  <Text
                    style={{
                      color: Colors.Black,
                      fontFamily: Fonts.SemiBold,
                      fontSize: RFValue(13),
                    }}
                  >
                    Email : hello@clarityvalley.com
                  </Text>
                </View>
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#A6B7DB",
                  }}
                />
                <View style={{ paddingVertical: RFPercentage(3) }}>
                  <Text
                    style={{
                      color: Colors.Black,
                      fontFamily: Fonts.SemiBold,
                      fontSize: RFValue(13),
                    }}
                  >
                    Your Time:
                    {moment(this.state.bookingDate).format("D MMM YYYY")}
                    ,Duration:
                    {this.state.TherapistBookStata?.duration}minutes
                  </Text>
                </View>
                {/* <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#A6B7DB",
                  }}
                /> */}
                {/* <View style={{ paddingVertical: RFPercentage(3) }}>
                  <Text
                    style={{
                      color: Colors.Black,
                      fontFamily: Fonts.SemiBold,
                      fontSize: RFValue(13),
                    }}
                  >
                    Address: Clinic Name , SEO 434,435 Sector, USA
                  </Text>
                </View> */}
                <TouchableOpacity
                  style={{
                    borderRadius: RFPercentage(5),
                    backgroundColor: "#385166",
                    width: windowWidth / 1.1,
                    alignItems: "center",
                    marginTop: RFPercentage(10),
                    paddingVertical: RFPercentage(1.5),
                  }}
                  onPress={() => this.VideoCallChange()}
                >
                  <Text
                    style={{
                      color: Colors.White,
                      fontFamily: Fonts.Bold,
                      fontSize: RFValue(15),
                    }}
                  >
                    My Appointment
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null}
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
              color={"black"}
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
    );
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
                element == this.state.SelectTimeSlotBook
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

  // DateTimeSelection = () => {
  //   if (this.state.PageChangeindex == 1) {
  //     return (

  //     );
  //   } else {
  //     null;
  //   }
  // };

  // SelectPackage = () => {
  //   return (

  //   );
  // };

  SearchTherapist(text) {
    const searchText = text.toLowerCase();
    // console.log("Input Text -----> ", this.state.searchValue);
    // console.log(
    //   "this.state.TrainerDetailData====>",
    //   this.state.TrainerDetailData
    // );
    // let SerachFliterDtta = this.state.TrainerDetailData;
    if (text) {
      const filteredData = this.state.TrainerDetailData?.filter((item) => {
        let TrainerData = item.name.toLowerCase();
        return TrainerData.includes(searchText);
      });
      // console.log("FlitreerDtaaa+-+-+-", filteredData);
      this.setState({ searchedFilterData: filteredData, searchValue: text });
    } else {
      // console.log("emptieddddd");
      this.setState({ searchedFilterData: [], searchValue: "" });
    }
    // if (text === "") {
    //   this.setState({
    //     // searchValue: text,
    //     TrainerDetailData: filteredData,
    //   });
    // } else {
    // }

    // this.setState({ searchValue: searchValue, TrainerDetailData: [] }, () => {
    //   console.log("API CALL START ");
    //   this.props.Trainer;

    //   if (this.state.TrainerDetailData === 0) {
    //     Alert.alert("search not found");
    //   }
    // });
    // console.log(
    //   "this.state.TrainerDetailData====>",
    //   this.state.TrainerDetailData
    // );
    console.log("Input Text -----> ", this.state.searchValue);
  }
  render() {
    const runFirst = `
    window.isNativeApp = true;
    true; // note: this is required, or you'll sometimes get silent failures
  `;

    return (
      <>
        {/* <View style={{ flex:1,}}>
          <WebView
          style={{ marginTop: RFPercentage(5) }}
            source={{
              uri: 'https://appointment.getmotopress.com/medmix/our-team/',
            }}
            injectedJavaScriptBeforeContentLoaded={runFirst}
            
          />
        </View> */}
        <ImageBackground
          // resizeMode="contain"
          source={
            this.state.BG == "" ? IMAGE.HomeImage : { uri: this.state.BG }
          }
          style={[
            InnerStyle.HeaderImage,
            {
              height: windowHeight,
              width: windowWidth,
              // width: Platform.OS == "android" ? win.width : win.width,
              // height: Platform.OS == "android" ? 260 * ratio : 290 * ratio,
            },
          ]}
        >
          <StatusBar
            hidden={false}
            barStyle={"light-content"}
            translucent
            backgroundColor="transparent"
          />

          <View
            style={[
              InnerStyle.SecoundMainviewStyle,
              { backgroundColor: this.state.BG.colour },
            ]}
          >
            <View
              style={{
                position: "relative",
                flex: 1,
                marginTop:
                  Platform.OS === "ios" ? RFPercentage(4) : RFPercentage(4),
                height: windowHeight,
                //  marginBottom: RFPercentage(3)
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                <View
                  style={[
                    InnerStyle.HeaderMainStyle,
                    {
                      marginTop: RFPercentage(3.5),
                      paddingHorizontal: RFValue(0),
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}
                  >
                    <Image
                      resizeMode="contain"
                      source={IMAGE.DrawerIcon}
                      style={InnerStyle.DrawerIconStyle}
                    />
                  </TouchableOpacity>
                  <Text style={InnerStyle.HeaderTitle}>Choose A Therapist</Text>
                  <View style={InnerStyle.BlankSpace}></View>
                </View>
                <View style={InnerStyle.SecoundHeaderTitleStyle}>
                  <View style={InnerStyle.TextViewStyle}>
                    <Text style={InnerStyle.HeaderTextStyle}>
                      Need someone to talk to?
                    </Text>
                    <Text style={InnerStyle.HeaderChildTextStyle}>
                      We have more than {this.state.TrainerDetailData.length}{" "}
                      registered therapists help
                    </Text>
                  </View>
                  <View style={InnerStyle.SearchViewStyle}>
                    <Image
                      resizeMode="contain"
                      source={IMAGE.SearchIcon}
                      style={InnerStyle.SearchIconStyle}
                    />
                    <TextInput
                      // autoCapitalize={Platform.OS === "ios" ? "none" : "off"}
                      // autoComplete={Platform.OS === "ios" ? "none" : "off"}
                      style={InnerStyle.TextInputInnerStyle}
                      value={this.state.searchValue}
                      onChangeText={(text) => {
                        this.SearchTherapist(text);
                        if (text.trim().length === 0) {
                          this.setState({ isSearchActive: false });
                        } else {
                          this.setState({ isSearchActive: true });
                        }
                      }}
                      placeholder="Search Therapist"
                      placeholderTextColor={"#000000"}
                    />
                  </View>
                </View>
                {/* {this.state.searchValue.length === 0 ? (
                  <FlatList
                    style={{}}
                    numColumns={2}
                    data={this.state.TrainerDetailData}
                    keyExtractor={(item) => item}
                    renderItem={this.TherapistsList}
                  />
                ) : (
                  <FlatList
                    style={{}}
                    numColumns={2}
                    data={this.state.searchedFilterData}
                    keyExtractor={(item) => item}
                    renderItem={this.TherapistsList}
                  />
                )} */}
                {this.state.isSearchActive ? (
                  <FlatList
                    style={{}}
                    numColumns={2}
                    data={this.state.searchedFilterData}
                    keyExtractor={(item) => item}
                    renderItem={this.TherapistsList}
                  />
                ) : null}
                {this.state.isSearchActive ? null : (
                  <FlatList
                    style={{}}
                    numColumns={2}
                    data={this.state.TrainerDetailData}
                    keyExtractor={(item) => item}
                    renderItem={this.TherapistsList}
                  />
                )}

                {/* <View style={InnerStyle.ExploreTopicStyle}>
                    {this.TherapistsList()}
                  </View> */}
                <RBSheet
                  ref={(ref) => {
                    this.TrainerDetail = ref;
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
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
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
    ExploreTopic: state.ExploreTopic,
    Trainer: state.Trainer,
    TrainerReview: state.TrainerReview,
    BGImage: state.BGImage,
    Therapist: state.TherapistBooking,
    SelectDuration: state.SelectDuration,
  };
};
export default connect(mapStateToProps, {
  ExploreAction,
  TrainerAction,
  TrainerReviewAction,
  BGImageAction,
  TherapistBookingAction,
  SelectDurationAction,
})(Explore);

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
