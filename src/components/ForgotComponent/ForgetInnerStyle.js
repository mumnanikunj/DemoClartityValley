import { Dimensions, StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from '../../common/colors';
import * as Fonts from '../../common/Fonts';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

const { width, height } = Dimensions.get('window')

export const ForgetInnerStyle = StyleSheet.create({
    SecoundMainViewStyle: {
        backgroundColor: Colors.White,
        marginVertical: '25%',
        height: windowHeight / 1.3,
        alignSelf: 'center',
        justifyContent: "center",
        borderRadius: RFValue(15),
    },
    SecoundInnerStyle: {
        // width: windowWidth / 1.12,
        paddingHorizontal: RFPercentage(2),
    },
    StaticTextViewStyle: {
        height: windowHeight / 5,
        justifyContent: "center",
    },
    FirstTextStyle: {
        paddingVertical: RFPercentage(3),
        fontSize: RFValue(18),
        fontFamily: Fonts.Bold,
        color: Colors.White,
    },
    SecoundTextStyle: {
        fontSize: RFValue(12),
        fontFamily: Fonts.SemiBold,
        color: Colors.White,
    },
    EmailaddressStaticTextStyle: {
        fontFamily: Fonts.SemiBold,
        color:Colors.DarkBlue,
        fontSize: RFValue(12),
        paddingVertical: RFPercentage(1),
    },
    TextInputStyle: {
        paddingVertical: RFValue(2),
        flexDirection: "row",
        backgroundColor: Colors.LigthDark,
        // marginTop: RFPercentage(2),
        borderRadius: RFValue(10),
        borderColor: Colors.LigthGray,
        borderWidth: 1,
    },
    TextInputInnerStyle: {
        color: Colors.White,
        paddingVertical: RFPercentage(1.3),
        fontSize: RFValue(15),
        fontFamily: Fonts.Medium,
        width: windowWidth / 1.4,
        // right: 3,
    },
    BtnViewStyle: {
        borderRadius: RFPercentage(5),
        marginVertical: RFPercentage(4),
        backgroundColor: Colors.DarkBlue,
        justifyContent: "center",
        alignItems: "center",
        borderWidth:1,
        borderColor: Colors.LigthGray,
    },
    BtnTextStyle: {
        paddingVertical: RFPercentage(1.5),
        color: Colors.White,
        fontFamily: Fonts.Bold,
        fontSize: RFValue(12),
    },
    // VerifyScreen Style
    StaticTextViewStyle1: {
        paddingTop: RFPercentage(5),
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"blue",
    },
    FirstTextStyle1: {
        paddingVertical:RFPercentage(2),
        fontFamily: Fonts.Bold,
        fontSize: RFValue(17),
        color: Colors.White,
    },
    SecoundTextStyle1: {
        color: Colors.White,
        fontFamily: Fonts.Medium,
        fontSize: RFValue(12),
        textAlign: "center",
        width: windowWidth / 1.5,
    },
    OTPViewStyle: {
        // backgroundColor:"blue",
        justifyContent: "center",
        alignItems: "center",
    },
    OTPInputBoxView: {
        width: width / 1.5,
        height: height / 6,
    },
    underlineStyleBase: {
        width: RFPercentage(7),
        height: RFPercentage(7),
        fontSize: RFPercentage(2.5),
        borderWidth: 1,
        borderRadius: RFValue(10),
        color: Colors.DarkBlue,
        borderColor: Colors.DarkBlue,
        backgroundColor: '#e1e2ef',
    },
    underlineStyleHighLighted: {
        borderColor: Colors.DarkOrange,
        color: Colors.DarkOrange,
    },

    // Reset screeen Style

    StaticTextStyle: {
        paddingVertical: RFPercentage(1),
        color: Colors.DarkBlue,
        fontSize: RFValue(12),
        fontFamily: Fonts.Medium,
    },
    hiddenStyleIcon:{
        tintColor:Colors.White,
        height:RFPercentage(2.5),
        width:RFPercentage(2.5),
    }
})
