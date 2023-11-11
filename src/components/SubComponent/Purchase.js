import React, { Component } from "react";
import { BackHandler, Dimensions, Image, ImageBackground, StatusBar, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import * as Colors from '../../common/colors';
import * as IMAGE from '../../common/Image';
import { InnerStyle } from '../Component/InnerStyle';
import { SubInnerStyle } from "./SubInnerStyle";
import { connect } from "react-redux";
import { BGImageAction } from "../../redux/action";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

const { width, height } = Dimensions.get('window')


//---> in app Purches plaltform select
    
    // const itemSkus = Platform.select({
    //     ios: ['com.example.productId'],
    //     android: ['com.example.productId'],
    //   });

    // const itemSubs = Platform.select({
    //     ios: ['test.sub'], 
    //     android: ['test.sub']
    // });



class Purchase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCarousel: true,
            activeSlide: 0,
            index: 0,
            pagingEnabled : true,
            snapEnabled: true,
            autoPlay : false,
            isLoading : true,
            BG : '',
            Data: [
                {
                    Header: 'STARTING',
                    Disc: 'Send thoughtful gifts to clients with a sending technology to match. ',
                    Price: '10.99$',
                    month: '3 month',
                    Benefit1: 'Offline listening',
                    Benefit2: 'On-demand listening',
                    Benefit3: 'Unlimited access',
                    Benefit4: 'Add-free experience',
                    color1: '#afafee',
                    color2: '#8787d9',
                    color3: '#6161b3',

                },
                {
                    Header: 'SATNDARD',
                    Disc: 'Send thoughtful gifts to clients with a sending technology to match. ',
                    Price: '20.99$',
                    month: '6 month',
                    Benefit1: 'Offline listening',
                    Benefit2: 'On-demand listening',
                    Benefit3: 'Unlimited access',
                    Benefit4: 'Add-free experience',
                    color1: '#b49de1',
                    color2: '#8973b5',
                    color3: '#755ba9',
                },
                {
                    Header: 'PREMIUM',
                    Disc: 'Send thoughtful gifts to clients with a sending technology to match. ',
                    Price: '30.99$',
                    month: '12 month',
                    Benefit1: 'Offline listening',
                    Benefit2: 'On-demand listening',
                    Benefit3: 'Unlimited access',
                    Benefit4: 'Add-free experience',
                    color1: '#cb9ce2',
                    color2: '#9d6fb3',
                    color3: '#82499c',
                },
            ],
        }
    }

    
    PurchaseItem  = async(item) => { 
            
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

        // initConnection(); // <== Add this line For In-App Purchase

        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        const ACToken = await AsyncStorage.getItem('AccessToken')
        this.props.BGImageAction(ACToken)
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={SubInnerStyle.renderItem}>
                <Text style={SubInnerStyle.CardHeaderTextStyla}>{item.Header}</Text>
                <View style={[InnerStyle.horozontalLine, { backgroundColor: Colors.LineGrey, marginVertical: RFPercentage(1), width: windowWidth / 2, alignSelf: 'center' }]} />
                <Text style={SubInnerStyle.CardDiscTextStyle}>{item.Disc}</Text>
                {/* <View style={{ justifyContent: "center", alignItems: 'center', backgroundColor: Colors.LigthGray, paddingVertical: RFPercentage(2), marginVertical: RFPercentage(2) }}> */}
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={[item.color1, item.color2, item.color3]}
                    style={SubInnerStyle.AmountPriceLiniarStyle}
                >
                    <View style={SubInnerStyle.AmountPriceViewStyle}>
                        <Text style={SubInnerStyle.PriceTextStyle}>{item.Price}</Text>
                        <Text style={SubInnerStyle.PriceDiscTextStyle}>{item.month}</Text>
                    </View>
                </LinearGradient>
                {/* </View> */}
                <View>
                    <View style={[InnerStyle.horozontalLine, { backgroundColor: Colors.LineGrey, marginVertical: RFPercentage(2), width: windowWidth / 2, alignSelf: 'center' }]} />
                    <Text style={SubInnerStyle.BenifitTextStyle}>{item.Benefit1}</Text>
                    <View style={[InnerStyle.horozontalLine, { backgroundColor: Colors.LineGrey, marginVertical: RFPercentage(2), width: windowWidth / 2, alignSelf: 'center' }]} />
                    <Text style={SubInnerStyle.BenifitTextStyle}>{item.Benefit2}</Text>
                    <View style={[InnerStyle.horozontalLine, { backgroundColor: Colors.LineGrey, marginVertical: RFPercentage(2), width: windowWidth / 2, alignSelf: 'center' }]} />
                    <Text style={SubInnerStyle.BenifitTextStyle}>{item.Benefit3}</Text>
                    <View style={[InnerStyle.horozontalLine, { backgroundColor: Colors.LineGrey, marginVertical: RFPercentage(2), width: windowWidth / 2, alignSelf: 'center' }]} />
                    <Text style={SubInnerStyle.BenifitTextStyle}>{item.Benefit4}</Text>
                    <View style={[InnerStyle.horozontalLine, { backgroundColor: Colors.LineGrey, marginVertical: RFPercentage(2), width: windowWidth / 2, alignSelf: 'center' }]} />
                </View>
                <View style={{}}>
                    <TouchableOpacity
                    onPress={() => this.PurchaseItem(item)}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={[item.color1, item.color2, item.color3]}
                            style={SubInnerStyle.BtnLinearStyle}
                        >
                            <Text style={SubInnerStyle.BtnTextStyle}>SELECT</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View>
                <ImageBackground
                    //  resizeMode="contain"
                    source={this.state.isLoading ? IMAGE.HomeImage : {uri:this.state.BG.image}}
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
                        <Text style={InnerStyle.HeaderTitle}>Purchase</Text>
                        <View style={InnerStyle.BlankSpace}></View>
                    </View>
                    <View style={[InnerStyle.ProfileSecoundMainViewStyle,{backgroundColor: this.state.isLoading ? Colors.DarkBlue : this.state.BG.colour}]}>
                        <View style={SubInnerStyle.CarouselMainViewStyle}>
                            <Carousel
                                // ref={(c) => { this._carousel = c; }}
                                style={{ height: windowHeight / 1.3 }}
                                data={this.state.Data}
                                renderItem={this.renderItem}
                                sliderWidth={windowWidth}
                                itemWidth={windowWidth / 1.4}
                                onSnapToItem={(index) => this.setState({ activeSlide: index })}
                            />
                            <Pagination
                                dotsLength={this.state.Data.length}
                                activeDotIndex={this.state.activeSlide}
                                carouselRef={this.state.isCarousel}
                                dotStyle={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginHorizontal: 0,
                                    backgroundColor: this.state.BG.colour === "#ffffff"? Colors.Black :  Colors.White
                                }}
                                animatedDuration={100}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                                tappableDots={true}
                            />        
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
})(Purchase);

// import React, { Component } from 'react';
// import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Platform, PermissionsAndroid, Button } from 'react-native';
// import * as ImagePicker from "react-native-image-picker";

// import Video from 'react-native-video';

// class Purchase extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             videoSource: '',
//         };
//     }

//     selectVideo = (type) => {

//        const options ={
//             title: 'Select video',
//             mediaType: type,
            
//             quality: 1,
//             storageOptions: {
//                 skipBackup: true,
//                 path:'video',
//               },
//         };
    
//         ImagePicker.launchImageLibrary(options, (response) => {
//             console.log('Response = ', response);

//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 // const source = { uri: response.uri };
//                 //const source = response.assets[0].uri  
//                 const uri = response.assets[0].uri;
//                 alert(uri);
//                 // const source1 = { uri: 'data:video/mp4;uri,' + response.assets[0].uri }
//                 //alert(source)

//                 this.setState({videoSource:uri})


//             }
//         });


//     }

//     render() {
//         return (
//             <View style={{flex:1,justifyContent:"center"}}>
//                 <Video source={this.state.videoSource}   
//                     ref={(ref) => {
//                         this.player = ref
//                     }}                                  
//                     onBuffer={this.onBuffer}                
//                     onError={this.videoError}             

//                     controls={true}
//                     fullscreen={true}
//                 />
//                 <Button title='Video' onPress={()=>this.selectVideo('video')} >
//                 </Button>
//             </View>

//         );
//     }
// }

// export default Purchase;