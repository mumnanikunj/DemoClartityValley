import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { ImageBackground, StatusBar, View } from 'react-native';
import * as IMAGE from '../../common/Image';
import { AuthStyle } from "./AuthStyle";
export default function RouterSplash() {
    const [skip, setSkip] = useState(" ")
    const navigation = useNavigation();
    useEffect(() => {
        const firstLoad = async () => {
            try {
                const Sinput = await AsyncStorage.getItem("@Skip_Key");

                const data = JSON.parse(Sinput);
                console.log('Heeeeeeeee00', data)
                if (data !== null) {

                    setSkip(data);
                    console.log('hello')
                }
                {
                    data !== null ? navigation.navigate('Splash2') : navigation.navigate('Splash');
                }

            } catch (err) {
                console.log(err);
            }
        };
        firstLoad();
    }, []);



    return (
        <View style={[AuthStyle.container, { justifyContent: "center", alignItems: "center" }]}>
            <ImageBackground
                source={IMAGE.SplashBackground}
                style={AuthStyle.splashMainContainer}>


            </ImageBackground >

            <StatusBar
                hidden={false}
                barStyle={'light-content'}
                translucent backgroundColor='transparent'
            />
        </View >
    )
}