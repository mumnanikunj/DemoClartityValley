import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { WebView } from 'react-native-webview';

export default class Web_PrivacyPolicy extends Component{
    render(){
      const runFirst = `
        window.isNativeApp = true;
        true; // note: this is required, or you'll sometimes get silent failures
      `;
      return  (
        
        <View style={{ flex:1,}}>
          <StatusBar 
                 hidden={false}
                 barStyle={"dark-content"}
                 translucent
                 backgroundColor="transparent"
          />
          <WebView
           style={{ marginTop: RFPercentage(5) }}
            source={{
              uri: 'https://app.clarityvalley.com/privacy',
            }}
            injectedJavaScriptBeforeContentLoaded={runFirst}
            
          />
        </View>
      );
    }
  }