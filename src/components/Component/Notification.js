import React, { Component } from "react";
import {
    ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from "../../common/colors";
import * as IMAGE from "../../common/Image";
import * as Fonts from "../../common/Fonts";
import { InnerStyle } from "./InnerStyle";
import { connect } from "react-redux";
import {BGImageAction} from '../../redux/action'
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const { width, height } = Dimensions.get("window");

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BG : '',
      isLoading : true,
      DownloadData: [
        {
          Name: "These meditations are done outside in natural surroundings.These meditations are done outside in natural surroundings.",
          Title: "Breathe",
          Image: require("../../assets/images/ReletitationshipImage.png"),
          Image1: require("../../assets/images/icons/TimeIcon.png"),
          Time: "10:19",
        },
        {
          Name: "These meditations are done outside in natural surroundings.These meditations are done outside in natural surroundings.",
          Title: "Wake Up",
          Image: require("../../assets/images/ReletitationshipImage.png"),
          Image1: require("../../assets/images/icons/TimeIcon.png"),
          Time: "9:56",
        },
        {
          Name: "These meditations are done outside in natural surroundings.These meditations are done outside in natural surroundings.",
          Title: "Breathe",
          Image: require("../../assets/images/ReletitationshipImage.png"),
          Image1: require("../../assets/images/icons/TimeIcon.png"),
          Time: "9:49",
        },
        {
          Name: "These meditations are done outside in natural surroundings.",
          Title: "Wake Up ",
          Image: require("../../assets/images/ReletitationshipImage.png"),
          Image1: require("../../assets/images/icons/TimeIcon.png"),
          Time: "9:24",
        },
        {
          Name: "These meditations are done outside in natural surroundings.",
          Title: "Breathe",
          Image: require("../../assets/images/ReletitationshipImage.png"),
          Image1: require("../../assets/images/icons/TimeIcon.png"),
          Time: "7:23",
        },
        {
          Name: "These meditations are done outside in natural surroundings.",
          Title: "Relex",
          Image: require("../../assets/images/ReletitationshipImage.png"),
          Image1: require("../../assets/images/icons/TimeIcon.png"),
          Time: "6:34",
        },
        {
          Name: "These meditations are done outside in natural surroundings.",
          Title: "Anxiety",
          Image: require("../../assets/images/ReletitationshipImage.png"),
          Image1: require("../../assets/images/icons/TimeIcon.png"),
          Time: "2:56",
        },
        {
          Name: "These meditations are done outside in natural surroundings.",
          Title: "Gratitude",
          Image: require("../../assets/images/ReletitationshipImage.png"),
          Image1: require("../../assets/images/icons/TimeIcon.png"),
          Time: "1:30",
        },
      ],
    };
  }

  async componentDidMount(){
    const ACToken = await AsyncStorage.getItem('AccessToken')
    this.props.BGImageAction(ACToken)
  }

  async UNSAFE_componentWillReceiveProps(nextProps){
    if (nextProps.BGImage) {
        if (nextProps.BGImage.BGImageSuccess) {
          const BGI = nextProps.BGImage.data.data;
          const found = BGI.find((obj) => {
            return obj.name === "CommonScreen";
          });
          console.log("NotificationProps", found);
          this.setState({ BG: found });
          this.setState({isLoading : false})
        }
      }
  }


  NotificationData = () => {
    return this.state.DownloadData.map((element, index) => {
      // console.log(this.state.data)
      return (
        <View style={InnerStyle.NotificationMainViewStyle}>
          <View style={InnerStyle.NotificationInnerViewStyle}>
            <View>
              <Image
                resizeMode="contain"
                source={element.Image}
                style={InnerStyle.NotificationImageStyle}
              />
            </View>
            <View>
              <Text style={InnerStyle.NotificationTitleStyle}>
                {element.Title}
              </Text>
              <Text numberOfLines={3} style={InnerStyle.NotificationDiscStyle}>
                {element.Name}
              </Text>
            </View>
            <View style={InnerStyle.NotificationTimeViewStyle}>
              {/* <Image 
                                resizeMode="contain"
                                source={element.Image1}
                                style={InnerStyle.NotificationTimeIconStyle}
                            /> */}
              <Text style={InnerStyle.NotificationTimeTextStyle}>
                {element.Time}
              </Text>
            </View>
          </View>
        </View>
      );
    });
  };

  render() {
    return (
        <>
      <View>
        <ImageBackground
          //  resizeMode="contain"
          source={this.state.isLoading ? IMAGE.HomeImage : {uri : this.state.BG.image}}
          style={{ height: windowHeight }}
        >
          <StatusBar
            hidden={false}
            barStyle={"light-content"}
            translucent
            backgroundColor="transparent"
          />
          <ScrollView
            style={{
              marginBottom: RFPercentage(10),
              marginTop: RFPercentage(0),
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={[InnerStyle.HeaderMainStyle,{marginTop: RFPercentage(6.5),flex:1,}]}>
              <TouchableOpacity
                onPress={() => this.props.navigation?.openDrawer()}
              >
                <Image
                  resizeMode="contain"
                  source={IMAGE.DrawerIcon}
                  style={InnerStyle.DrawerIconStyle}
                />
              </TouchableOpacity>
              <Text style={InnerStyle.HeaderTitle}>Notification</Text>
              <View style={InnerStyle.BlankSpace}></View>
            </View>
            {this.NotificationData()}
          </ScrollView>
        </ImageBackground>
      </View>
      {this.state.isLoading ? (
        <View style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}>
          <ActivityIndicator
            color={"black"}
            style={{ position: "absolute", top: height / 2, left: width / 2.2 }}
            size={"large"}
          />
          </View>
        ) : undefined}
      </>
    );
  }
}

const mapStateToProps = (state) =>{
    return{
        BGImage: state.BGImage,
    }
}

export default connect(mapStateToProps,{
    BGImageAction,
})(Notification);


