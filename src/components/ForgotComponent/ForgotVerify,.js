import React, { Component } from 'react';
import {
    BackHandler, Dimensions,
    Image, ImageBackground, StatusBar, Text, TouchableOpacity, View
} from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';
import * as Colors from '../../common/colors';
import * as IMAGE from '../../common/Image';
import { AuthStyle } from '../Auth/AuthStyle';
import { InnerStyle } from '../Component/InnerStyle';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ForgetInnerStyle } from './ForgetInnerStyle';

import OTPInputView from '@twotalltotems/react-native-otp-input';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

const { width, height } = Dimensions.get('window')


class ForgotVerify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            OTP: "",
        }
    }

    backAction = () => {
        this.props.navigation.goBack(null);
        return true;
    };
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    render() {
        return (
            <>
                <ImageBackground
                    // resizeMode='contain'
                    source={IMAGE.SunsetImage}
                    style={AuthStyle.backgroundImage}
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
                        <Text style={[InnerStyle.HeaderTitle, { height: RFPercentage(3.2) }]}>Verify OTP</Text>
                        <View style={InnerStyle.BlankSpace}></View>
                    </View>
                </ImageBackground>
                <View style={{ backgroundColor: Colors.LigthDark, flex: 3 }}>
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={AuthStyle.ChildFirstViewStyle}>
                            <Image
                                resizeMode='contain'
                                source={IMAGE.Logo1}
                                style={AuthStyle.LogoImgStyle}
                            />
                        </View>
                        <View style={ForgetInnerStyle.SecoundInnerStyle}>
                            <View style={ForgetInnerStyle.StaticTextViewStyle1}>
                                <Text style={ForgetInnerStyle.FirstTextStyle1}>Verify OTP</Text>
                                <Text style={ForgetInnerStyle.SecoundTextStyle1}>Please enter 4 digit code send to your email.</Text>
                            </View>
                            {/* <Text style={ForgetInnerStyle.EmailaddressStaticTextStyle}>Email address</Text> */}
                            <View style={ForgetInnerStyle.OTPViewStyle}>
                                <OTPInputView
                                    style={ForgetInnerStyle.OTPInputBoxView}
                                    pinCount={4}
                                    autoFocusOnLoad={false}
                                    value={this.state.OTP}
                                    codeInputFieldStyle={ForgetInnerStyle.underlineStyleBase}
                                    codeInputHighlightStyle={ForgetInnerStyle.underlineStyleHighLighted}
                                    onCodeFilled={(code) => {
                                        // console.log(`Code is ${code}, you are good to go!`)
                                        this.setState({ OTP: code });
                                    }}
                                />
                            </View>
                            <TouchableOpacity
                                style={[ForgetInnerStyle.BtnViewStyle, {}]}
                                onPress={() => this.props.navigation.navigate('Reset')}
                            >
                                <Text style={ForgetInnerStyle.BtnTextStyle}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </View>

            </>
        );
    }
}

export default ForgotVerify;