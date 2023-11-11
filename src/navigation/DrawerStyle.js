import { Dimensions, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Colors from '../common/colors';
import * as Fonts from '../common/Fonts';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

const { width, height } = Dimensions.get('window')

export const DrawerStyle = StyleSheet.create({
    Logo:{
        height: RFPercentage(15), 
        width: RFPercentage(15), 
        alignSelf: "center", 
        marginTop: RFPercentage(5),
    },
    DrawerMainView:{
        backgroundColor: Colors.Drawer, 
        flex: 1,
    },
    Sec_View:{
        paddingVertical: RFPercentage(2), 
    },
    CommonTouchStyle:{
        paddingHorizontal: RFPercentage(2), 
        flexDirection: "row", 
        alignItems: "center",
    },
    CommmonIcon:{
        height: RFPercentage(3), 
        width: RFPercentage(3),
    },
    CommonTextStyle:{
        fontFamily: Fonts.SemiBold, 
        color: Colors.White,
         paddingHorizontal: RFPercentage(1), 
    },
})