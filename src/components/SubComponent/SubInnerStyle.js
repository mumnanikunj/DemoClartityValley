import { Dimensions, StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from '../../common/colors';
import * as Fonts from '../../common/Fonts';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

const { width, height } = Dimensions.get('window')

export const SubInnerStyle = StyleSheet.create({
    renderItem: {
        backgroundColor: Colors.LigthGrey2,
        borderRadius: RFPercentage(2)
    },
    CardHeaderTextStyla: {
        color: Colors.White,
        textAlign: "center",
        fontFamily: Fonts.Bold,
        fontSize: RFPercentage(4),
        paddingTop: RFPercentage(3),
    },
    CardDiscTextStyle: {
        color: Colors.Black,
        fontSize: RFPercentage(1.5),
        fontFamily: Fonts.SemiBold,
        textAlign: "center",
        width: windowWidth / 1.7,
        justifyContent: "center",
        alignSelf: "center",
    },
    AmountPriceLiniarStyle: {
        marginVertical: RFPercentage(2),
        paddingVertical: RFPercentage(1.5),
    },
    AmountPriceViewStyle: {
        justifyContent: "center",
        alignItems: "center",
    },
    PriceTextStyle: {
        fontFamily: Fonts.Bold,
        fontSize: RFPercentage(4),
        color: Colors.White,
    },
    PriceDiscTextStyle: {
        fontFamily: Fonts.SemiBold,
        color: Colors.White
    },
    BenifitTextStyle: {
        textAlign: "center",
        color: Colors.Black,
        fontFamily: Fonts.SemiBold,
    },
    BtnLinearStyle: {
        alignSelf: "center",
        paddingVertical: RFPercentage(1.5),
        marginVertical: RFPercentage(2),
        borderRadius: RFPercentage(5),
    },
    BtnTextStyle: {
        paddingHorizontal: RFPercentage(6),
        color: Colors.White,
        fontFamily: Fonts.Bold,
    },
    CarouselMainViewStyle: {
        marginTop: '20%',
        alignItems: "center",
    },
    // SettingInner Screen Design
    secoundViewStyle: {
        marginTop: RFPercentage(5),
    },
    HeaderViewStyle: {
        justifyContent: "space-between",
        alignItems: "center",
        height: RFPercentage(10),
    },
    FreeTextStyle: {
        color: Colors.White,
        fontFamily: Fonts.Bold,
        fontSize: RFPercentage(2),
    },
    BtnGoPremiumViewStyle: {
        backgroundColor: Colors.White,
        paddingHorizontal: RFPercentage(2.5),
        paddingVertical: RFPercentage(1.5),
        borderRadius: RFPercentage(5),
    },
    BtnTextInviteStyle: {
        color: Colors.Black,
        fontFamily: Fonts.SemiBold,
        fontSize: RFPercentage(2),
    },
    ProfileviewStyle: {
        marginVertical: RFPercentage(2),
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: RFValue(5),
    },
    ProfileIMG: {
        height: RFPercentage(7),
        width: RFPercentage(7),
        backgroundColor: Colors.White,
        borderRadius: RFPercentage(5),
    },
    ProfileCenterTextViewStyle: {
        paddingHorizontal: RFPercentage(2),
        justifyContent: "space-evenly",
    },
    ProfileNameTextStyle: {
        color: Colors.White,
        fontFamily: Fonts.Bold,
        fontSize: RFPercentage(2.5),
    },
    ProfileSecoundTextStyle: {
        color: Colors.White,
        fontFamily: Fonts.Medium,
        fontSize: RFPercentage(1.3),
    },
    RigthArrowIMG: {
        height: RFPercentage(2),
        width: RFPercentage(2),
        alignSelf: "center",
    },
    CommonViewStyle: {
        flexDirection: 'row',
        alignItems: "center",
        paddingVertical: RFPercentage(2),
    },
    CommonTextStyle: {
        color: Colors.White,
        fontFamily: Fonts.Bold,
        paddingHorizontal: RFPercentage(2),
    },
    CommonIMGStyle: {
        height: RFPercentage(3),
        width: RFPercentage(3),
    },
    // Invite Screen Design
    SecoundInnerViewStyle:{
        marginVertical:RFPercentage(5),
    },
    EarnImageViewStyle:{
        justifyContent:"center",
        alignItems:"center",
    },
    EarnImageStyle:{
        height:RFPercentage(35),
        width:RFPercentage(70),
    },
    InviteTextViewStyle:{
        justifyContent: "center", 
        marginVertical: RFPercentage(1) ,
    },
    HeaderInviteTextStyle:{
        color: Colors.White, 
        fontFamily: Fonts.Bold, 
        fontSize: RFPercentage(2),
    },
    HeaderDiscInviteTextStyle:{
        color: 'grey', 
        fontFamily: Fonts.Bold,
         fontSize: RFPercentage(2),
    },
    CodeTextStyle:{
        color: Colors.White, 
        fontFamily: Fonts.SemiBold ,
        fontSize:RFPercentage(2),  
    },
    InviteBtnViewStyle:{
        marginVertical: RFPercentage(2), 
        alignItems: "center",
    },
    BtnTouchStyle:{
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: Colors.White, 
        borderRadius: RFPercentage(5),
    },
    BtnInviteTextStyle:{
        paddingVertical: RFPercentage(1), 
        color: Colors.Black, 
        paddingHorizontal: RFPercentage(2.5), 
    },
})