import { Dimensions, Platform, StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from '../../common/colors';
import * as Fonts from '../../common/Fonts';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

const { width, height } = Dimensions.get('window')

export const AuthStyle = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center",
        alignContent: 'center'
        // flex: 1,
    },
    SplashScreenStyle: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        alignSelf: 'center',
    },
    SplashText: {
        fontFamily: Fonts.Regular,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: RFValue(24),
        textAlign: 'center'
    },
    SplashTextView: {
        width: RFPercentage(22),
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 10,
    },
    LinearGradientBg: {
        flex: 1,
        borderRadius: RFPercentage(50),
        transform: [{ rotate: '35deg' }],
    },

    splashMainContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        // backgroundColor: Colors.Black_Blue
    },
    Cicular_Ring: {
        height: RFPercentage(40),
        width: RFPercentage(40),
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        tintColor: Colors.White,

    },
    Cicular_Arc: {
        position: 'absolute',
        height: RFPercentage(32),
        width: RFPercentage(32),
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
    },
    Ring_Container: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    Ring_Circle: {
        justifyContent: 'center',
        alignSelf: 'center',
        // backgroundColor: '#041F4C',
        height: RFPercentage(28),
        width: RFPercentage(28),
        borderRadius: 500
    },
    pointer: {

        borderRadius: 1000,
        height: RFValue(15),
        width: RFValue(16),
        alignSelf: 'center',
        justifyContent: 'center',
    },
    StillPointer: {
        height: RFValue(16),
        width: RFValue(16),
        alignSelf: 'center',
        transform: [{ rotate: '90deg' }],
    },
    StillPointer2: {
        height: RFValue(16),
        width: RFValue(16),
        marginBottom: RFValue(0.5),
        alignSelf: 'center',
        transform: [{ rotate: '270deg' }],
    },
    MovingArrow: {

        height: RFValue(17.2),
        width: RFValue(16),
        alignSelf: 'center',
        tintColor: Colors.GreyBlue,
        transform: [{ rotate: '90deg' }],
    },
    pointerContainer: {
        position: 'absolute',
        width: RFValue(25),
        height: RFPercentage(33.3),
        alignSelf: 'center',
        zIndex: 1,

        overflow: 'hidden',
        justifyContent: 'space-between'

    },

    backgroundImage: {
        flex: 1,
        width: windowWidth,
        height: windowHeight / 4,
    },
    ImageBg: {
        height: windowHeight,
        width: windowWidth
    },
    ImageBgStyle: {
        resizeMode: 'cover',
        height: windowHeight
    },
    SkipMainContainer: {
        flex: 0.7,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    SkipView: {
        marginTop: RFPercentage(12)
    },
    SplashMainContent: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    SplashHeader: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // LoginScreen Screen Style
    HeaderStyle: {
        paddingHorizontal: RFPercentage(3.5),
        paddingVertical: RFPercentage(3),
        marginTop: '10%',
    },
    HeaderMainTextStyle: {
        marginVertical: RFPercentage(4),
        color: Colors.White,
        fontSize: RFValue(25),
        fontFamily: Fonts.SemiBold,
    },
    HeaderChildTextStyle: {
        fontSize: RFValue(14),
        color: Colors.White,
        fontFamily: Fonts.SemiBold,
    },
    SecoundViewStyle: {
        backgroundColor: Colors.White,
        height: windowHeight,
        borderRadius: RFValue(35)
    },
    TextInputStyle: {
        paddingVertical: RFValue(2),
        flexDirection: "row",
        backgroundColor: Colors.LigthDark,
        marginTop: RFPercentage(2),
        borderRadius: RFValue(35),
        borderColor: Colors.Dark_GreyBlue,
        borderWidth: 2,
        marginVertical: RFPercentage(0.5),
        alignItems:"center",

    },
    TextInputIconStyle: {
        tintColor: Colors.White,
        alignSelf: 'center',
        paddingHorizontal: RFPercentage(4),
        height: RFPercentage(2.1),
        width: RFPercentage(2.1),
    },
    TextInputInnerStyle: {
        color: Colors.Light_GreyBlue,
        paddingVertical: RFPercentage(1.3),
        fontSize: RFValue(13),
        fontFamily: Fonts.Regular,
        width: windowWidth / 1.4,
        // right: 3,
        // backgroundColor:"blue"
    },
    ForgetTextStyle: {
        paddingVertical: RFPercentage(2),
        textAlign: 'right',
        fontSize: RFValue(14),
        fontFamily: Fonts.SemiBold,
        color: Colors.Orangish,
    },
    LoginBtn: {
        // marginTop: RFValue(10),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(35),
        backgroundColor: Colors.BluePurple,

    },
    LoginBtnTextStyle: {
        color: Colors.White,
        fontFamily: Fonts.Bold,
        fontSize: RFValue(14),
        paddingVertical: RFPercentage(1.5),
    },
    LineViewStyle: {
        marginVertical: RFValue(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    },
    LineStyle: {
        width: RFValue(70),
        height: 1,
        backgroundColor: Colors.OfColor,
    },
    LineTextStyle: {
        width: 50,
        textAlign: 'center',
        color: Colors.White,
        fontFamily: Fonts.Bold,
        fontSize: RFValue(14),
    },
    SocialBtnViewStyle: {
        // backgroundColor:"blue",  
        
    },
    BtnInnerStyle: {
        paddingHorizontal:'20%',
        // justifyContent: 'flex-start',
        // alignItems:'center',
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: RFPercentage(1),
        marginBottom: RFPercentage(2.2),
        borderRadius: RFValue(35),
        borderWidth: 2,
        borderColor: Colors.Dark_GreyBlue,
    },
    SocialIconStyle: {
        height: RFPercentage(3.5),
        width: RFPercentage(8),
    },
    SocialIconStyle_A: {
        height: RFPercentage(3.5),
        width: RFPercentage(6),
    },
    SocialIconStyle_F: {
        height: RFPercentage(3.5),
        width: RFPercentage(6),
        tintColor: Colors.FacebookBlue
    },
    SocialIconStyle_G: {
        height: RFPercentage(3.5),
        width: RFPercentage(6)
    },
    SocialIconStyle_E: {
        tintColor: Colors.White,
        height: RFPercentage(3.5),
        width: RFPercentage(6),
        paddingHorizontal: RFPercentage(3)
    },
    BtnTextStyle: {
        color: Colors.WhiteShade_1,
        fontFamily: Fonts.Medium,
        fontSize: RFValue(13),
        fontWeight: 'bold',
        // letterSpacing: 0.2
    },
    SignUpBtnViewStyle: {
        // backgroundColor:"blue",
        paddingVertical: RFPercentage(1),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: RFPercentage(6)

    },
    SignUpDisableTextStyle: {
        color: Colors.OfColor,
        fontFamily: Fonts.Medium,
        fontSize: RFValue(12),
    },
    SignUpBtnTextStyle: {
        paddingHorizontal: RFValue(2),
        color: Colors.Orangish,
        fontFamily: Fonts.Bold,
        fontSize: RFValue(12),
    },
    //SignUp Screen Style
    SignUpMainViewStyle: {
        position: 'absolute',
        top: '7%',
    },
    SignUpBtnChildViewStyle: {
        marginVertical: RFPercentage(1),
        paddingHorizontal: RFPercentage(2),
        width: windowWidth / 1,
    },
    ChildFirstViewStyle: {
        // backgroundColor:"blue",
        marginVertical: RFPercentage(2),
        justifyContent: "center",
        alignItems: "center",
    },
    LogoImgStyle: {
        height: RFPercentage(14),
        width: RFPercentage(24),
        alignSelf: "center",
    },
    CreationTextStyle: {
        paddingTop: RFPercentage(1),
        color: Colors.Light_GreyBlue,
        fontFamily: Fonts.Medium,
        lineHeight: RFValue(20),
        fontSize: RFValue(12),
    },
    BtnTouchViewStyle: {
        marginTop: RFPercentage(2),
        // paddingVertical:RFPercentage(2),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.BluePurple,

        borderRadius: RFValue(35),
        borderWidth: 2,
        borderColor: Colors.Dark_GreyBlue,
    },
    SignUpBtnText: {
        color: Colors.White,
        fontFamily: Fonts.Bold,
        fontSize: RFValue(14),
        paddingVertical: RFPercentage(1.5),
    },
    BottomViewStyle: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"blue",
        bottom: RFValue(10),
        marginBottom: RFPercentage(2),
    },
    BottomLoginFirstTextStyle: {
        color: Colors.DarkBlue,
        fontFamily: Fonts.Medium,
        fontSize: RFValue(14),
    },
    BottomLoginSecoundTextStyle: {
        fontFamily: Fonts.Bold,
        fontSize: RFValue(15),
        color: Colors.DarkBlue,
    },
    SkipContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    Skip_Container: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomColor: Colors.White,
        borderBottomWidth: 2,
    },
    SImage: {
        height: RFPercentage(8),
        width: RFPercentage(8),
    },
    TextContainer: {
        flexDirection: 'column',
    },
    TextView: {
        marginTop: RFValue(10),
        marginBottom: RFValue(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextView2: {
        marginTop: RFValue(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    SkipStyle: {
        color: Colors.White,
        fontFamily: Fonts.Medium,
        fontSize: RFValue(14),
    },
    VideoInnerCrossViewStyle: Platform.OS === 'ios' ? {
        position: 'absolute',
        marginVertical: RFPercentage(12),
        marginHorizontal: '90%',
    } :
        {
            position: 'absolute',
            marginVertical: RFPercentage(2),
            marginHorizontal: '90%',
        },
    CrossImageStyle: {
        height: RFPercentage(4),
        width: RFPercentage(4),
    },
    VideoBottomViewStyle: {
        backgroundColor: Colors.DarkBlue,
    },
    VideoHeaderViewStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    VideoTitleTextStyle: {
        color: Colors.White,
        fontFamily: Fonts.Bold,
        fontSize: RFValue(20),
    },
    LikeBtnStyle: {
        height: RFPercentage(3),
        width: RFPercentage(3),
    },
    TimeTextStyle: {
        color: Colors.White,
        fontFamily: Fonts.Bold,
        textAlignVertical: "center",
        marginVertical: RFValue(2),
    },
    WelcomHeaderTextStyle: {
        color: Colors.White,
        fontFamily: Fonts.Medium,
        fontSize: RFValue(19),
        marginVertical: RFPercentage(0),
    },
    ModalFirstViewStyle: {
        flex: 1,
        marginTop: windowHeight / 3.8,
        height: windowHeight / 1,
        borderRadius: RFValue(22),
        borderColor: Colors.Dark_GreyBlue,
        backgroundColor: Colors.LigthDark,
        borderWidth: 2,
        borderBottomWidth: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,


        paddingHorizontal: RFPercentage(2),
    },
    BottomfirstViewStyle: {
        flexDirection: 'row',
        alignSelf: "center",
        width: RFPercentage(40)
    },
    BottomfirstViewStyle_M: {
        flexDirection: 'row',
        alignSelf: "center",
    },
    NonLinkedTextStyle: {
        color: Colors.Light_GreyBlue,
        fontFamily: Fonts.Medium,
        fontSize: RFValue(10),
    },
    LinkTextStyle: {
        color: Colors.OrangeTextColor,
        fontSize: RFValue(10),
        fontFamily: Fonts.Bold,
    },
    BottomSecondViewStyle: {
        marginTop: RFValue(4),
        flexDirection: "row",
        alignSelf: "center",
    },
    SecoundNonLinkedTextStyle: {
        color: Colors.OfColor,
        fontSize: RFValue(10),
    },
    SecoundLinkedTextStyle: {
        color: Colors.OrangeTextColor,
        fontSize: RFValue(10),
        fontFamily: Fonts.Bold,
    },
});