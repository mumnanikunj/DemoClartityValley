import { Dimensions, StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from '../../common/colors';
import * as Fonts from '../../common/Fonts';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

const { width, height } = Dimensions.get('window')

export const VideoPlayerStyle = StyleSheet.create({
    MVContainer: {
        // backgroundColor: 'black',
        // flex:1,
    },
    Video_DetailsView: {
        paddingVertical: RFPercentage(2),
        paddingHorizontal: RFPercentage(1.5),
        backgroundColor: Colors.White
    },
    V_TitleView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    V_Rating: {

        paddingVertical: RFValue(5),
        width: windowWidth / 2.7
    },
    CommentIcon: {
        height: RFPercentage(3),
        width: RFPercentage(3)
    },

    MainReviewContainer: {
        flex:1,
        backgroundColor: Colors.DarkBlue,
        height: windowHeight,
        bottom: RFPercentage(-4)
    },
    ArrowDown: {
        height: RFPercentage(3),
        width: RFPercentage(2.7),
        marginLeft: RFPercentage(2)
    },
    ReviewText: {
        color: Colors.White,
        fontSize: Fonts.Bold,
        fontSize: RFPercentage(2.2)
    },
    ReviewTextInput: {
        paddingVertical: RFPercentage(2),
        flex: 1,
        flexDirection: 'column'
    },
    ReviewTextInputModal: {
        backgroundColor: Colors.BoxColor,
        paddingVertical: RFPercentage(1),
        flexDirection: "row",
        alignItems: "center",

    },
    R_Modal_Text: {
        marginHorizontal: RFPercentage(2),
        borderWidth: 1,
        borderColor: Colors.LigthGrey2,
        borderRadius: RFPercentage(2),
        paddingVertical: RFPercentage(1.5),
        paddingHorizontal: RFPercentage(2),
        width: windowWidth / 1.2,
        color: Colors.White,
        fontFamily: Fonts.SemiBold,
        bottom: 1
    },
    SendIcon: {
        height: RFPercentage(3.5),
        width: RFPercentage(3.5)
    },
    menuBar: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    menuBarBtn: {
        flexDirection: "row",
        backgroundColor: Colors.DarkBlueish,
        height: RFValue(45),
        width: RFValue(50),
        alignItems: "center",
        borderRadius: RFPercentage(2),



    },
    menuBarBtn2: {
        flexDirection: "row",
        backgroundColor: Colors.DarkBlueish,
        height: RFValue(45),
        width: RFValue(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFPercentage(2),
    },
    PlayText: {
        color: Colors.White,
        fontFamily: Fonts.Bold,
        marginHorizontal: RFPercentage(1)
    },
    NotesIcon: {
        height: RFPercentage(2.8),
        width: RFPercentage(2.8),
    },
    ShareIcon: {
        height: RFPercentage(2.8),
        tintColor: 'white',
        width: RFPercentage(2.7)
    },
    DownloadIcon: {
        height: RFPercentage(3.2),
        width: RFPercentage(3.2),
        tintColor: 'white',
    },
    ClockIcon: {
        height: RFPercentage(2.3),
        width: RFPercentage(2.3),
        tintColor: Colors.Grey,
    },
    ReviewIcon: {
        height: RFPercentage(2.8),
        width: RFPercentage(2.8)
    },
    LikeIcon: {
        height: RFPercentage(2.8),
        width: RFPercentage(2.8),
        tintColor: 'white',
    },
    RateIcon: {
        height: RFPercentage(2.8),
        width: RFPercentage(2.8),

    },
    NotesImageText: {
        color: Colors.White,
        fontFamily: Fonts.Bold,
        marginHorizontal: RFPercentage(1)
    },
    CrossImgContainer: {
        alignSelf: "flex-end",
        marginVertical: RFPercentage(1)
    },
    notesBtn: {
        color: Colors.White
    },
    modalDescription: {
        color: Colors.White
    },
    modalDescriptionText: {
        color: Colors.WhiteShade_1,
        fontFamily: Fonts.SemiBold,
        textAlign: 'left'
    },
    fullscreenVideo: {
        backgroundColor: 'black',
        ...StyleSheet.absoluteFill,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'


    },
    backgroundVideo2: {
        position: 'absolute',

        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    VerticalView: {
        height: '49.8%',
        marginTop: windowHeight / 5.1,
        position: 'absolute',
        backgroundColor: 'rgba(52, 52, 52, 0)'
    },
    backgroundVideo: Platform.OS === 'ios' ? {
        paddingHorizontal: RFValue(0),
        height: height / 4,
        width: '100%',
    } :
        {
            paddingHorizontal: RFValue(0),
            marginTop: RFPercentage(2),
            height: windowHeight / 4,
            width: '100%',
        }


})