import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, StatusBar, ImageBackground, Animated, TouchableOpacity, Dimensions, BackHandler } from "react-native";
import useToken from "./Token";
import * as IMAGE from '../../common/Image';
import { AuthStyle } from "./AuthStyle";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage, } from "react-native-responsive-fontsize";
import { Easing, } from 'react-native-reanimated';
import CircularProgress from 'react-native-circular-progress-indicator';

import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer, {

    State,

    usePlaybackState,

} from 'react-native-track-player';
import LinearGradient from "react-native-linear-gradient";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;
var track = {
    url: require('../../assets/songs/Splash.mp3'), // Load media from the network  
};
const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add([track]);
    await TrackPlayer.updateOptions({
        stopWithApp: true,
        stoppingAppPausesPlayback: true


    });
    TrackPlayer.play()

}
const name1 = ['breathe in', 'breathe out']


export default function Splash() {
    const navigation = useNavigation();
    token = useToken();
    const [counter, setCounter] = useState(0);
    const [skip, setSkip] = useState(false);
    useEffect(() => {
        setupPlayer();

    }, []);


    // const togglePlayback = async (playbackState) => {
    //     const currentTrack = await TrackPlayer.getCurrentTrack();

    //     if (currentTrack !== null) {
    //         if (isPlaying) {
    //             console.log('if')
    //             await TrackPlayer.pause(), console.log('play');
    //         } else {
    //             console.log('else')
    //             await TrackPlayer.play(), console.log('pause');
    //         }
    //     }

    // }

    // const playbackState = usePlaybackState();
    // const isPlaying = playbackState === State.Playing;





    function TextCounter() {


        if (counter === 2) {
            setCounter(0)
        }
        useEffect(() => {

            const interval = setInterval(() => {
                setCounter((prevCounter) => prevCounter + 1);
            }, 5000);


            return () => clearInterval(interval);
        }, []);

        return (


            <View style={AuthStyle.SplashTextView} >

                <Text style={AuthStyle.SplashText}>
                    {name1[counter]}
                </Text>

            </View>

        );
    }

    function handleBackButtonClick() {
        BackHandler.exitApp() & TrackPlayer.reset()
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                handleBackButtonClick
            );
        };
    }, []);
    useEffect(() => {

        return (

            setTimeout(() => {
                {
                    token ? navigation.navigate('MainStack') : navigation.navigate('Router');
                }
                TrackPlayer.reset()

            }, 40000


            )

        )

    }, [])
    const spinValue = useState(new Animated.Value(0))[0];


    useEffect(() => {
        return (

            Animated.loop(
                Animated.sequence([


                    Animated.timing(
                        spinValue,
                        {
                            toValue: 1,
                            duration: 10000,
                            easing: Easing.linear,
                            useNativeDriver: true

                        }
                    ),

                ])


            ).start()


        )

    }, [])



    useEffect(() => {
        Animated.loop(
            // runs given animations in a sequence
            Animated.sequence([
                // increase size
                Animated.timing(anim.current, {
                    toValue: 1.2,
                    duration: 5000,
                    useNativeDriver: true

                }),
                // decrease size
                Animated.timing(anim.current, {

                    toValue: 0.8,
                    duration: 5000,
                    useNativeDriver: true
                }),

            ])
        ).start();
        // makes the sequence loop
    }, []);



    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    const anim = useRef(new Animated.Value(0.8));


    const Skipdata = async () => {

        try {
            AsyncStorage.getItem('@Skip_Key', (err, result) => {
                const id = skip;

                if (result !== null) {

                    AsyncStorage.setItem('@Skip_Key', JSON.stringify(id));
                    console.log(id)

                } else {
                    console.log('Data Not Found');
                    AsyncStorage.setItem('@Skip_Key', JSON.stringify(id));
                }
            });

        }
        catch (error) {
            console.log(error);
        }

    };
    return (
        <View>

            <View style={AuthStyle.container}>
                <ImageBackground source={IMAGE.SplashBackground} style={AuthStyle.ImageBg} imageStyle={AuthStyle.ImageBgStyle}>


                    <View
                        style={AuthStyle.splashMainContainer}>

                        <View style={AuthStyle.SplashHeader}>
                            {/* <Text style={{ fontFamily: Fonts.Bold, fontSize: RFPercentage(5), color: '#F3F2ED', marginBottom: RFValue(10), }}>Clarity<Text style={{ color: '#5097e4' }}> Valley</Text></Text>
                            <Text style={{ fontFamily: Fonts.SemiBold, fontSize: RFPercentage(2.5), color: '#F3F2ED' }}>(Breathing Exercise)</Text> */}
                        </View>
                        <View style={AuthStyle.SplashMainContent}>
                            <View style={AuthStyle.Ring_Container}>
                                {TextCounter()}





                                <Animated.View style={{ transform: [{ scale: anim.current }] }}>




                                    <View style={AuthStyle.Ring_Circle}>

                                        <LinearGradient colors={['#48c8e8', '#5097e4', '#5981e4']} style={AuthStyle.LinearGradientBg} />
                                        <View style={AuthStyle.pointerContainer}>
                                            <View style={AuthStyle.pointer}>

                                                <Image source={IMAGE.Splash_HalfCircle} style={AuthStyle.StillPointer} />
                                            </View>
                                            <View style={AuthStyle.pointer}>

                                                <Image source={IMAGE.Splash_HalfCircle} style={AuthStyle.StillPointer2} />
                                            </View>
                                        </View>

                                        <Animated.View style={[AuthStyle.pointerContainer, { transform: [{ rotate: spin }] }]}>
                                            <View style={AuthStyle.pointer}>

                                                <Image source={IMAGE.Splash_HalfCircle} style={AuthStyle.MovingArrow} />
                                            </View>
                                        </Animated.View>

                                        <View style={AuthStyle.Cicular_Arc}>

                                            <CircularProgress
                                                // ref={hello}
                                                initialValue={100}
                                                value={100}
                                                // delay={100}
                                                activeStrokeSecondaryColor={'#57558c'}
                                                activeStrokeColor={'#51709b'}

                                                inActiveStrokeColor={'transparent'}
                                                progressValueColor={'transparent'}
                                                radius={RFPercentage(16)}
                                                activeStrokeWidth={5}


                                            />


                                        </View>
                                    </View>



                                </Animated.View>



                            </View>
                        </View>
                        <View style={AuthStyle.SkipMainContainer}>

                            <View style={AuthStyle.SkipView}>

                                <View style={AuthStyle.TextView}>
                                    <TouchableOpacity style={AuthStyle.Skip_Container} onPress={() => {
                                        token ? navigation.navigate('MainStack') : navigation.navigate('Router');
                                        // navigation.navigate('Router')

                                    }} onPressIn={() => TrackPlayer.reset()}>

                                        <Text style={AuthStyle.SkipStyle}>Skip Once</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={AuthStyle.TextView2}>
                                    <TouchableOpacity style={AuthStyle.Skip_Container} onPress={() => {
                                        Skipdata() &&
                                            // navigation.navigate('Router')
                                        token ? navigation.navigate('MainStack') : navigation.navigate('Router');

                                    }} onPressIn={() => { setSkip(true) & TrackPlayer.reset() }}>


                                        <Text style={AuthStyle.SkipStyle}>Skip Permanently</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>

                        </View>



                    </View>
                </ImageBackground>

                <StatusBar
                    hidden={false}
                    barStyle={'light-content'}
                    translucent backgroundColor='transparent' />
            </View >

        </View >
    );

}
