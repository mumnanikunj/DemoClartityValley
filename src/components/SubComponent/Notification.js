import React, { Component } from "react";
import { BackHandler, Dimensions, Image, ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';


import { RFPercentage } from 'react-native-responsive-fontsize';
import * as Colors from '../../common/colors';
import * as IMAGE from '../../common/Image';
import { InnerStyle } from '../Component/InnerStyle';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

const { width, height } = Dimensions.get('window')

class Notification extends Component{

    
    constructor(props) {
        super(props);
        this.state = {
            NotifiData: [
                {
                    IMG: require('../../assets/images/ProfileImage.png'),
                    Title: 'Frank Odd',
                    Disc: 'Lores ipsume dolor sit amet , consecture Aenean commodo',
                    Time: '9.45 PM',
                },
                {
                    IMG: require('../../assets/images/ProfileImage.png'),
                    Title: 'Olia Jio',
                    Disc: 'Lores ipsume dolor sit amet , consecture Aenean commodo',
                    Time: '8.59 PM',
                },
                {
                    IMG: require('../../assets/images/ProfileImage.png'),
                    Title: 'Lorun Liv',
                    Disc: 'Lores ipsume dolor sit amet , consecture Aenean commodo',
                    Time: '8.33 PM',
                },
                {
                    IMG: require('../../assets/images/ProfileImage.png'),
                    Title: 'Clark Die',
                    Disc: 'Lores ipsume dolor sit amet , consecture Aenean commodo',
                    Time: '7.01 PM',
                },
                {
                    IMG: require('../../assets/images/ProfileImage.png'),
                    Title: 'Petter Cena',
                    Disc: 'Lores ipsume dolor sit amet , consecture Aenean commodo',
                    Time: '6.45 PM',
                },
                {
                    IMG: require('../../assets/images/ProfileImage.png'),
                    Title: 'Romen Empire',
                    Disc: 'Lores ipsume dolor sit amet , consecture Aenean commodo',
                    Time: '6.13 PM',
                },
                {
                    IMG: require('../../assets/images/ProfileImage.png'),
                    Title: 'Dian Amrous',
                    Disc: 'Lores ipsume dolor sit amet , consecture Aenean commodo',
                    Time: '5.34 PM',
                },
                {
                    IMG: require('../../assets/images/ProfileImage.png'),
                    Title: 'Rahul Kumar',
                    Disc: 'Lores ipsume dolor sit amet , consecture Aenean commodo',
                    Time: '4.55 PM',
                },
                {
                    IMG: require('../../assets/images/ProfileImage.png'),
                    Title: 'Amit Kumar',
                    Disc: 'Lores ipsume dolor sit amet , consecture Aenean commodo',
                    Time: '4.47 PM',
                },
                {
                    IMG: require('../../assets/images/ProfileImage.png'),
                    Title: 'Parth Obroy',
                    Disc: 'Lores ipsume dolor sit amet , consecture Aenean commodo',
                    Time: '4.01 PM',
                },
            ],
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

    NotifiDataRender = () => {
        return this.state.NotifiData.map((element, index) => {
            // console.log(element,'elementData')
            return (
                <View style={InnerStyle.DataRenderMainView}>
                    <View style={{ alignSelf: 'center' }}>
                        <Image
                            resizeMode="contain"
                            source={element.IMG}
                            style={InnerStyle.NotifiInnerImage} />
                    </View>
                    <View style={{ width: windowWidth / 1.6 ,paddingHorizontal:RFPercentage(2)}}>
                        <Text style={InnerStyle.NotifyTitleStyle}>{element.Title}</Text>
                        <Text numberOfLines={2} style={InnerStyle.NotifyDiscStyle}>{element.Disc}</Text>
                    </View>
                    <View>
                        <Text style={{ color: Colors.White ,paddingVertical:RFPercentage(0.5)}}>{element.Time}</Text>
                    </View>
                </View>
            );
        })
    }

    render() {
        return (
            <View>
                <ImageBackground
                    //  resizeMode="contain"
                    source={IMAGE.HomeImage}
                    style={{ height: windowHeight }}
                >
                    <StatusBar
                        hidden={false}
                        barStyle={'light-content'}
                        translucent backgroundColor='transparent'
                    />
                    <View style={[InnerStyle.HeaderMainStyle]}>
                        <TouchableOpacity 
                            onPress={()=> this.props.navigation.goBack()}
                        >
                            <Image
                                resizeMode="contain"
                                source={IMAGE.LeftSideIcon}
                                style={InnerStyle.DrawerIconStyle}
                            />
                        </TouchableOpacity>
                        <Text style={InnerStyle.HeaderTitle}>Notification</Text>
                        <View style={InnerStyle.BlankSpace}></View>
                    </View>
                    <View style={InnerStyle.DataMainView}>
                        <ScrollView 
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{paddingBottom:RFPercentage(10)}}>{this.NotifiDataRender()}</View>
                        </ScrollView>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
export default Notification;