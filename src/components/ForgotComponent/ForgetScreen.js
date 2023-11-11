import React, { Component } from 'react';
import {
    BackHandler, Dimensions,
    Image, ImageBackground, Platform, StatusBar, Text,
    TextInput,
    TouchableOpacity, View
} from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';
import * as Colors from '../../common/colors';
import * as IMAGE from '../../common/Image';
import { AuthStyle } from '../Auth/AuthStyle';
import { InnerStyle } from '../Component/InnerStyle';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ForgetInnerStyle } from './ForgetInnerStyle';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

const { width, height } = Dimensions.get('window')


class ForgetScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ForgotEmailPassword: '',
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
                    <View style={[InnerStyle.HeaderMainStyle, {}]}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Image
                                resizeMode="contain"
                                source={IMAGE.LeftSideIcon}
                                style={InnerStyle.DrawerIconStyle}
                            />
                        </TouchableOpacity>
                        <Text style={[InnerStyle.HeaderTitle, { height: RFPercentage(3.2) }]}>Forgot Password</Text>
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
                            <View style={ForgetInnerStyle.StaticTextViewStyle}>
                                <Text style={ForgetInnerStyle.FirstTextStyle}>Forgot Password?</Text>
                                <Text style={ForgetInnerStyle.SecoundTextStyle}>Please enter your email address to receive a verification code.</Text>
                            </View>
                            <View style={ForgetInnerStyle.TextInputStyle}>
                                <Image
                                    resizeMode='contain'
                                    source={IMAGE.EmialIcon}
                                    style={AuthStyle.TextInputIconStyle}
                                />
                                <TextInput
                                    autoCapitalize={Platform.OS === 'ios' ? 'none' : 'off'}
                                    autoComplete={Platform.OS === 'ios' ? 'none' : 'off'}
                                    style={ForgetInnerStyle.TextInputInnerStyle}
                                    value={this.state.ForgotEmailPassword}
                                    onChangeText={(V) => this.setState({ ForgotEmailPassword: (V).trim() })}
                                    keyboardType="email-address"
                                    placeholder='Email Address'
                                    placeholderTextColor={'grey'}
                                />
                            </View>
                            <TouchableOpacity
                                style={ForgetInnerStyle.BtnViewStyle}
                                onPress={() => this.props.navigation.navigate('ForgotVerify')}
                            >
                                <Text style={ForgetInnerStyle.BtnTextStyle}>Send Email</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </View>


            </>
        );
    }
}

export default ForgetScreen;