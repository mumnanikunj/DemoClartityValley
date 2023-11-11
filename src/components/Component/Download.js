import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import * as Colors from '../../common/colors';
import * as IMAGE from '../../common/Image';
import { InnerStyle } from './InnerStyle';
// import { global } from "../../../global";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

const { width, height } = Dimensions.get('window')

class Download extends Component{

    constructor(props) {
        super(props);
        this.state = {
            DownloadData: [
                {
                    Name: 'Breathe',
                    Disc: 'Meditation ',
                    Time: '24 min',
                    Image: require('../../assets/images/ReletitationshipImage.png'),
                    Image1: require('../../assets/images/PlayIcon.png')
                },
                {
                    Name: 'Wake Up',
                    Disc: 'Meditation ',
                    Time: '5 min',
                    Image: require('../../assets/images/ReletitationshipImage.png'),
                    Image1: require('../../assets/images/PlayIcon.png')
                },
                {
                    Name: 'Relax',
                    Disc: 'Meditation ',
                    Time: '12 min',
                    Image: require('../../assets/images/ReletitationshipImage.png'),
                    Image1: require('../../assets/images/PlayIcon.png')
                },
                {
                    Name: 'Anxiety',
                    Disc: 'Meditation ',
                    Time: '5 min',
                    Image: require('../../assets/images/ReletitationshipImage.png'),
                    Image1: require('../../assets/images/PlayIcon.png')
                },
                {
                    Name: 'Gratitude',
                    Disc: 'Meditation ',
                    Time: '10 min',
                    Image: require('../../assets/images/ReletitationshipImage.png'),
                    Image1: require('../../assets/images/PlayIcon.png')
                },
            ],
        }
    }

    RenderData = () => {
        return this.state.DownloadData.map((element, index) => {
            // console.log(this.state.data)
            return (
                <View style={InnerStyle.mainScrollViewStyle}>
                    <View style={InnerStyle.MainChildViewStyle}>
                        <Image
                            resizeMode="contain"
                            source={this.state.DownloadData[0].Image}
                            style={InnerStyle.FirstImageStyle}
                        />
                    </View>
                    <View style={InnerStyle.HeaderTextSectionStyle}>
                        <Text style={InnerStyle.FistTextStyle}>{element.Name}</Text>
                        <Text style={InnerStyle.SecoundTextStyle}>{element.Disc}</Text>
                    </View>
                    <View style={{ justifyContent: "space-around" }}>
                        <Text style={InnerStyle.SecoundTextTimeStyle}>Time</Text>
                        <Text style={[ InnerStyle.SecoundTextTimeStyle, { color: Colors.White, fontSize: RFValue(6) }]}>{element.Time}</Text>
                    </View>
                    <View style={InnerStyle.PlayButtonViewStyle}>
                        <TouchableOpacity>
                            <Image
                                resizeMode="contain"
                                source={element.Image1}
                                style={InnerStyle.PlayButtonStyle}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        })
    }


    render(){
        return(
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
                <View style={InnerStyle.HeaderMainStyle} >
                    <TouchableOpacity 
                        onPress={() => this.props.navigation?.goBack()}
                    >
                        <Image
                            resizeMode="contain"
                            source={IMAGE.LeftSideIcon}
                            style={InnerStyle.DrawerIconStyle}
                        />
                    </TouchableOpacity>
                    <Text style={InnerStyle.HeaderTitle}>Downloads</Text>
                    <View style={InnerStyle.BlankSpace}></View>
                </View>
                <ScrollView>
                    <View style={{ paddingVertical: RFPercentage(5) }}>{this.RenderData()}</View>
                </ScrollView>
            </ImageBackground>
        </View>
        );
    }
}

export default Download;