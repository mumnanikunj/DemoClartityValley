import React, { Component } from 'react';
import {
    BackHandler, Dimensions,
    Image, ImageBackground, Platform, StatusBar, Text,
    TextInput,
    TouchableOpacity, View
} from 'react-native';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import * as Colors from '../../common/colors';
import * as IMAGE from '../../common/Image';
import { AuthStyle } from '../Auth/AuthStyle';
import { InnerStyle } from '../Component/InnerStyle';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ForgetInnerStyle } from './ForgetInnerStyle';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

const { width, height } = Dimensions.get('window')


class Reset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newpassword: '',
            confirmpassword: '',
            showPassword: false,
            showPassword2: false,
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
        console.log('State false', this.state.showPassword)
    }

    render() {
        return (
            <>
                <ImageBackground
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
                        <Text style={InnerStyle.HeaderTitle}>Reset Password</Text>
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
                        <View style={[ForgetInnerStyle.SecoundInnerStyle, { justifyContent: "center" }]}>
                            <View style={[ForgetInnerStyle.StaticTextViewStyle1, { alignItems: 'flex-start', paddingTop: RFPercentage(0), marginVertical: RFPercentage(2), }]}>
                                <Text style={[ForgetInnerStyle.FirstTextStyle1, { paddingVertical: RFPercentage(2) }]}>Reset Password</Text>
                                <Text style={[ForgetInnerStyle.SecoundTextStyle1, { textAlign: "justify", width: windowWidth, fontSize: RFValue(14), }]}>Please enter your new password</Text>
                            </View>

                            <View style={[ForgetInnerStyle.TextInputStyle, { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: RFPercentage(2) }]}>
                                <TextInput
                                    autoCapitalize={Platform.OS === 'ios' ? 'none' : 'off'}
                                    autoComplete={Platform.OS === 'ios' ? 'none' : 'off'}
                                    style={[ForgetInnerStyle.TextInputInnerStyle, { left: 15 }]}
                                    value={this.state.newpassword}
                                    onChangeText={(V) => this.setState({ newpassword: (V).trim() })}
                                    keyboardType="default"
                                    placeholder='Enter New Password'
                                    placeholderTextColor={'grey'}
                                    secureTextEntry={this.state.showPassword ? false : true}
                                />
                                <TouchableOpacity
                                    style={{right: RFPercentage(2), }}
                                    onPress={() => this.state.showPassword ? this.setState({ showPassword: false }) : this.setState({ showPassword: true }, () => {
                                        console.log('statechange', this.state.showPassword)
                                    })}
                                >
                                    <Image
                                        source={
                                            this.state.showPassword ? require('../../assets/images/icons/ShowIcon.png') : require('../../assets/images/icons/HideIcon.png')
                                        }
                                        style={ForgetInnerStyle.hiddenStyleIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={[ForgetInnerStyle.TextInputStyle, { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: RFPercentage(2) }]}>
                                <TextInput
                                    autoCapitalize={Platform.OS === 'ios' ? 'none' : 'off'}
                                    autoComplete={Platform.OS === 'ios' ? 'none' : 'off'}
                                    style={[ForgetInnerStyle.TextInputInnerStyle, { left: 15 }]}
                                    value={this.state.confirmpassword}
                                    onChangeText={(V) => this.setState({ confirmpassword: (V).trim() })}
                                    keyboardType="default"
                                    placeholder='Enter Confirm Password'
                                    secureTextEntry={this.state.showPassword2 ? false : true}
                                    placeholderTextColor={'grey'}
                                />
                                <TouchableOpacity
                                style={{right:RFPercentage(2)}}
                                    onPress={() => this.state.showPassword2 ? this.setState({ showPassword2: false }) : this.setState({ showPassword2: true })}
                                >
                                    <Image
                                        source={
                                            this.state.showPassword2 ? require('../../assets/images/icons/ShowIcon.png') : require('../../assets/images/icons/HideIcon.png')
                                        }
                                        style={ForgetInnerStyle.hiddenStyleIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={[ForgetInnerStyle.BtnViewStyle, { marginVertical: RFPercentage(2) }]}
                                onPress={() => this.props.navigation.navigate('Login')}
                            >
                                <Text style={ForgetInnerStyle.BtnTextStyle}>Create New Password</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </View>

            </>
        );
    }
}

export default Reset;