import React, { Component } from "react";
import { BackHandler, Dimensions, Image, ImageBackground, StatusBar, Text, TouchableOpacity, View } from "react-native";
import Share from 'react-native-share';
import * as IMAGE from '../../common/Image';
import { InnerStyle } from '../Component/InnerStyle';
import { SubInnerStyle } from "./SubInnerStyle";
import { connect } from "react-redux";
import { BGImageAction } from "../../redux/action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Colors from '../../common/colors'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

const { width, height } = Dimensions.get('window')


class Invite extends Component {
    constructor(props){
        super(props);
        this.state ={
            isLoading : true,
            BG : '',
        }
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
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

    backAction = () => {
        this.props.navigation.goBack(null);
        return true;
    };
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }
    async componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        const ACToken = await AsyncStorage.getItem("AccessToken");
        this.props.BGImageAction(ACToken)
    }

    render() {
        const CustomShare = async() =>{
            const ShareOption = {
                message : 'This is a test message ',
                // title : 'YouTubeLink',
                // url : 'https://www.youtube.com/',
                // email : 'nikunjmumna20@gmail.com'
            }
            try{
                const ShareResponse = await Share.open(ShareOption);
                console.log(JSON.stringify(ShareResponse,'Response:'));
            }catch(e){
                console.log('Share Error :',e)
            }
        } 
        return (
            <View>
                <ImageBackground
                    //  resizeMode="contain"
                    source={this.state.isLoading ? IMAGE.HomeImage : {uri : this.state.BG.image}}
                    style={{ height: windowHeight }}
                >
                    <StatusBar
                        hidden={false}
                        barStyle={'light-content'}
                        translucent backgroundColor='transparent'
                    />
                    <View style={[InnerStyle.HeaderMainStyle]}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Image
                                resizeMode="contain"
                                source={IMAGE.LeftSideIcon}
                                style={InnerStyle.DrawerIconStyle}
                            />
                        </TouchableOpacity>
                        <Text style={InnerStyle.HeaderTitle}>Invitation</Text>
                        <View style={InnerStyle.BlankSpace}></View>
                    </View>
                    <View style={[InnerStyle.ProfileSecoundMainViewStyle,{
                           backgroundColor: this.state.isLoading
                           ? Colors.DarkBlue
                           : this.state.BG.colour, 
                    }]}>
                        <View style={SubInnerStyle.SecoundInnerViewStyle}>
                            <View style={SubInnerStyle.EarnImageViewStyle}>
                                <Image
                                    resizeMode="contain"
                                    source={IMAGE.EarnImage}
                                    style={SubInnerStyle.EarnImageStyle}
                                />
                            </View>
                            <View style={SubInnerStyle.InviteTextViewStyle}>
                                <Text style={[SubInnerStyle.HeaderInviteTextStyle,{ color:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Black
                          : Colors.White,}]}>Invite Your friends to ClarityValley</Text>
                                <Text style={SubInnerStyle.HeaderDiscInviteTextStyle}>Invite friends to ClarityValley  and 1 month Subscription Free when your friend Purchase any Subscription </Text>
                            </View>
                        </View>
                        <View>
                            <Text style={[SubInnerStyle.CodeTextStyle,{ color:
                        this.state.BG.colour === "#ffffff"
                          ? Colors.Black
                          : Colors.White,}]}>Copy your code : u89op8</Text>
                        </View>
                        <View style={SubInnerStyle.InviteBtnViewStyle}>
                            <TouchableOpacity
                            onPress={CustomShare}
                                style={[SubInnerStyle.BtnTouchStyle,{backgroundColor: this.state.BG.colour === '#ffffff' ? Colors.DarkBlue : Colors.White}]}>
                                <Text style={[SubInnerStyle.BtnInviteTextStyle,{color : this.state.BG.colour ? Colors.White : Colors.Black}]}>Invite</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        BGImage : state.BGImage
    }
}

export default connect(mapStateToProps,{
    BGImageAction
})(Invite);