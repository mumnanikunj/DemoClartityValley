import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Platform,
  BackHandler,
  Image,
  PermissionsAndroid,
} from "react-native";
import * as Colors from "../../common/colors";
import * as IMAGE from "../../common/Image";

import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from "react-native-twilio-video-webrtc";
import { RFPercentage } from "react-native-responsive-fontsize";

class VideoCall extends Component {
  state = {
    isAudioEnabled: true,
    isVideoEnabled: true,
    status: "disconnected",
    participants: new Map(),
    videoTracks: new Map(),

    roomSidNumber: "AC622ec48e9c760563172f2ce7c7757799",
    roomName: this.props.route.params.roomname,
    token: this.props.route.params.accesstoken,
    // tokenAndroid: this.props.route.params.accesstoken,
    // tokenIOS: this.props.route.params.accesstoken,
  };

  backAction = () => {
    this.props.navigation.goBack(null);
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
    this.requestCameraPermission();
    {
      Platform.OS === "android"
        ? this._onConnectButtonPress()
        : this._onConnectButtonCall();
    }
  }
  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "This app needs access to your camera.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission granted");
      } else {
        console.log("Camera permission denied");
      }
    } catch (error) {
      console.log("Error requesting camera permission:", error);
    }
  };
  _onConnectButtonPress = () => {
    try {
      this.twilioRef.connect({
        RoomName: this.state.roomName,
        accessToken: this.state.token,
        // roomSid:this.state.roomSidNumber
      });
    } catch (error) {
      console.log("AndroidError", error);
    }

    this.setState({ status: "connecting" });
  };

  _onConnectButtonCall = () => {
    try {
      this.twilioRef.connect({
        RoomName: this.state.roomName,
        accessToken: this.state.token,
        // roomSid:this.state.roomSidNumber
      });
    } catch (e) {
      console.log("IOSError", e);
    }
  };

  _onEndButtonPress = () => {
    this.twilioRef.disconnect();
    this.props.navigation.goBack();
  };

  _onMuteButtonPress = () => {
    this.twilioRef
      .setLocalAudioEnabled(!this.state.isAudioEnabled)
      .then((isEnabled) => this.setState({ isAudioEnabled: isEnabled }));
  };

  _onFlipButtonPress = () => {
    this.twilioRef.flipCamera();
  };

  _onRoomDidConnect = (error) => {
    console.log("error", error);
    this.setState({ status: "connected" });
  };

  _onRoomDidDisconnect = ({ error }) => {
    console.log("ERROR1: ", error);

    this.setState({ status: "disconnected" });
  };

  _onRoomDidFailToConnect = ({ error }) => {
    console.log("ERROR2: ", error);

    this.setState({ status: "disconnected" });
  };

  _onParticipantAddedVideoTrack = ({ participant, track }) => {
    console.log("onParticipantAddedVideoTrack: ", participant, track);

    this.setState({
      videoTracks: new Map([
        ...this.state.videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ]),
    });
  };

  _onParticipantRemovedVideoTrack = ({ participant, track }) => {
    console.log("onParticipantRemovedVideoTrack: ", participant, track);

    const videoTracks = this.state.videoTracks;
    videoTracks.delete(track.trackSid);

    this.setState({ videoTracks: new Map([...videoTracks]) });
  };

  setTwilioRef = (ref) => {
    this.twilioRef = ref;
  };

  render() {
    console.log("Tokenno:", this.props.route.params.accesstoken);
    console.log("Room name:", this.props.route.params.roomname);
    return (
      <View style={styles.container}>
        {/* {this.state.status === "disconnected" && (
          <View>
            <Text style={styles.welcome}>React Native Twilio Webrtc</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              editable={false}
              value={this.state.roomName}
              onChangeText={(text) => this.setState({ roomName: text })}
            ></TextInput>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              editable={false}
              value={
                Platform.OS === "android"
                  ? this.state.tokenAndroid
                  : this.state.tokenIOS
              }
              onChangeText={(text) => this.setState({ token: text })}
            ></TextInput>
            {Platform.OS === "android" ? (
              <Button
                title="Connect"
                style={styles.button}
                onPress={this._onConnectButtonPress}
              ></Button>
            ) : (
              <Button
                title="ConnectCall"
                style={styles.button}
                onPress={this._onConnectButtonCall}
              ></Button>
            )}
          </View>
        )} */}

        {this.state.status === "connected" ||
        this.state.status === "connecting" ? (
          <View style={styles.callContainer}>
            {this.state.status === "connected" && (
              <View style={styles.remoteGrid}>
                {Array.from(
                  this.state.videoTracks,
                  ([trackSid, trackIdentifier]) => {
                    console.log("TrackIdentifier", trackIdentifier);
                    return (
                      <TwilioVideoParticipantView
                        style={styles.remoteVideo}
                        key={trackSid}
                        trackIdentifier={trackIdentifier}
                      />
                    );
                  }
                )}
              </View>
            )}
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.optionButton, { backgroundColor: Colors.grey }]}
                onPress={this._onFlipButtonPress}
              >
                <Image
                  source={IMAGE.RotateCamera}
                  style={{ height: RFPercentage(3), width: RFPercentage(3) }}
                />
                {/* <Text style={{ fontSize: 12 }}>Flip</Text> */}
              </TouchableOpacity>
              {this.state.isAudioEnabled ? (
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    { backgroundColor: Colors.grey },
                  ]}
                  onPress={this._onMuteButtonPress}
                >
                  <Image
                    source={IMAGE.StopBtn}
                    style={{ height: RFPercentage(3), width: RFPercentage(3) }}
                  />
                  {/* <Text style={{ fontSize: 12 }}>
                    {this.state.isAudioEnabled ? "Mute" : "Unmute"}
                  </Text> */}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    { backgroundColor: Colors.grey },
                  ]}
                  onPress={this._onMuteButtonPress}
                >
                  <Image
                    source={IMAGE.MicIcon}
                    style={{ height: RFPercentage(3), width: RFPercentage(3) }}
                  />
                  {/* <Text style={{ fontSize: 12 }}>
                  {this.state.isAudioEnabled ? "Mute" : "Unmute"}
                </Text> */}
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.optionButton}
                onPress={this._onEndButtonPress}
              >
                <Image
                  source={IMAGE.EndVideoCall}
                  style={{ height: RFPercentage(3), width: RFPercentage(3) }}
                />
                {/* <Text style={{ fontSize: 12 }}>End</Text> */}
              </TouchableOpacity>
              <TwilioVideoLocalView enabled={true} style={styles.localVideo} />
              <View />
            </View>
          </View>
        ) : null}

        <TwilioVideo
          // applyZOrder={false}

          screenShare={true}
          ref={this.setTwilioRef}
          onRoomDidConnect={this._onRoomDidConnect}
          onRoomDidDisconnect={this._onRoomDidDisconnect}
          onRoomDidFailToConnect={this._onRoomDidFailToConnect}
          onParticipantAddedVideoTrack={this._onParticipantAddedVideoTrack}
          onParticipantRemovedVideoTrack={this._onParticipantRemovedVideoTrack}
        />
        {/* <TwilioVideoLocalView 
            applyZOrder={true}
          /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  callContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: "center",
    backgroundColor: "white",
    color: "black",
  },
  button: {
    marginTop: 100,
  },
  localVideo: {
    flex: 1,
    width: 125,
    height: 200,
    position: "absolute",
    right: 10,
    bottom: 200,
    borderRadius: 2,
    borderColor: "#4e4e4e",
  },
  remoteGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  remoteVideo: {
    width: "100%",
    height: "100%",
  },
  optionsContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    // backgroundColor: "blue",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VideoCall;
