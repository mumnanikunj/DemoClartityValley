import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ImageBackground, StatusBar, View } from "react-native";
import * as IMAGE from '../../common/Image';
import { AuthStyle } from "./AuthStyle";
import useToken from "./Token";



export default function Splash2() {
    const navigation = useNavigation();
    token = useToken();



    useEffect(() => {
        return (
            setTimeout(() => {
                {
                    token ? navigation.navigate('MainStack') : navigation.navigate('Router');
                }
            }, 2000

            )

        )

    }, [])



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
    );

}

