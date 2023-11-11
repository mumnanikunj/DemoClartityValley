import { Dimensions, StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from "../../common/colors";
import * as Fonts from "../../common/Fonts";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const { width, height } = Dimensions.get("window");

export const NotesStyle = StyleSheet.create({
  NotesMaincontent: {
    paddingHorizontal: RFValue(14),
    justifyContent: "space-between",
    height: windowHeight / 1.2,
  },
  NotesChildcontent: {
    backgroundColor: "transparent",
    width: width / 1.1,
    height: height / 1.3,
  },
  CalanderIconPosition: {
    backgroundColor: "black",
    alignSelf: "flex-end",
    padding: RFPercentage(1.5),
    borderRadius: RFPercentage(5),
  },
  CommonIConStyle: {
    tintColor: Colors.White,
    height: RFPercentage(3),
    width: RFPercentage(3),
  },
  CommonHeaderTextStyle: {
    color: Colors.White,
    fontFamily: Fonts.Bold,
    fontSize: RFPercentage(2.5),
  },
  CommonScrollSecationStyle: {
    height: windowHeight / 1.3,
  },
  ModalMainViewStyle: {
    height: windowHeight / 2,
    backgroundColor: Colors.White,
    borderRadius: RFPercentage(3),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  ModalInnerMainstyle: {
    justifyContent: "center",
    marginHorizontal: RFPercentage(2),
  },
  TitleTextinputStyle: {
    height: "12%",
    textAlignVertical: "center",
    marginVertical: RFPercentage(1),
    // paddingVertical: RFPercentage(1.5),
    borderColor: Colors.LigthGrey2,
    borderWidth: 1,
    borderRadius: RFPercentage(2),
    paddingHorizontal: RFPercentage(2),
    fontSize: RFPercentage(2.2),
    fontFamily: Fonts.SemiBold,
    color: Colors.Black,
  },
  TextInputStyle: {
    height: "40%",
    borderColor: Colors.LigthGrey2,
    borderWidth: 1,
    borderRadius: RFPercentage(2),
    paddingHorizontal: RFPercentage(2),
    fontSize: RFPercentage(2.2),
    fontFamily: Fonts.SemiBold,
    textAlignVertical: "top",
    color: Colors.Black,
  },
  BottomButtonView: {
    marginHorizontal: RFPercentage(5),
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: RFPercentage(1.5),
  },
  BottomButton: {
    paddingVertical: RFPercentage(1.5),
    paddingHorizontal: RFPercentage(3),
    backgroundColor: Colors.LigthBlue,
    borderRadius: RFPercentage(2),
  },
  UIBottomButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  CommonIConViewStyle: {
    backgroundColor: "black",
    padding: RFPercentage(1.5),
    borderRadius: RFPercentage(5),
  },
  //  Render Data Styling ......
  HeaderTextStyle: {
    fontFamily: Fonts.Bold,
    fontSize: RFPercentage(2),
    color: Colors.White,
  },
  HeaderFirstViewStyleView: {
    paddingVertical: RFPercentage(1.5),
  },
  HeaderSecondInnerViewStyle: {
    backgroundColor: Colors.LightPerpale,
    borderWidth: 1,
    borderColor: Colors.LineGrey,
    borderRadius: RFValue(8),
    shadowColor: "white",
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 1 },
    shadowRadius: 5,
    elevation: 1,
    paddingHorizontal: RFPercentage(2),
    // flexDirection:'row',
    // alignItems:'center',
    // justifyContent:'space-around',
  },
  innerContentTextStyle: {
    color: Colors.White,
    width: windowWidth / 1.3,
    paddingVertical: RFPercentage(1),
    fontFamily: Fonts.Regular,
  },
  DeleteImageStyle: {
    // justifyContent:"center",

    height: RFPercentage(2.5),
    width: RFPercentage(2.5),
    //  marginVertical: RFPercentage(0.6),
    tintColor: Colors.White,
  },
});
