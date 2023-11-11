import AsyncStorage from "@react-native-async-storage/async-storage";
import Voice from "@react-native-voice/voice";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Colors from "../../common/colors";
import * as Fonts from "../../common/Fonts";
import * as IMAGE from "../../common/Image";
import { InnerStyle } from "../Component/InnerStyle";
import { useDispatch, useSelector } from "react-redux";
import { AddNoteAction , BGImageAction } from "../../redux/action";
import DateTimePicker from "react-native-modal-datetime-picker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const { width, height } = Dimensions.get("window");

function VoiceToText() {
  const [recognized, setRecognized] = useState("");
  const [volume, setVolume] = useState("");
  const [error, setError] = useState("");
  const [end, setEnd] = useState("");
  const [started, setStarted] = useState("");
  const [results, setResults] = useState("");
  const [partialResults, setPartialResults] = useState([]);
  const [date, setDate] = useState(moment().format("Y-M-D"));
  const [SelectDate , setSelectDate] = useState(moment().format("Y-M-D"));
  const [DatePicker, setDatePicker] = useState(false);
  const [time, setTime] = useState(moment().format("h:m"));
  const [selectTime , setSelectTime] = useState(moment().format("h:m"))
  const [TimePicker, setTimePicker] = useState(false);
  const [title, setTitle] = useState("");
  const [VoiceDate, setVoiceData] = useState("");
  const [BG , setBG] = useState('');
  const [isLoading , setisLoading] = useState(true);
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(BGImageAction())
  },[])

  const BGData = useSelector((state) => state.BGImage);

  useEffect(()=>{
    if (BGData?.data) {
      console.log('DataBGData',BGData)
      if (BGData?.BGImageSuccess) {
        const BGI = BGData.data.data;
        const found = BGI.find((obj) => {
          return obj.name === "CommonScreen";
        });
        setBG(found)
        setisLoading(false)
      }
    }
  },[])

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    console.log("onSpeechStart: ", e);
    setStarted("Start");
  };

  const onSpeechRecognized = (e) => {
    console.log("onSpeechRecognized: ", e);
    setRecognized("Recoding Start");
  };

  const onSpeechEnd = (e) => {
    // console.log('End : ', e);
    setEnd("√");
  };

  const onSpeechError = (e) => {
    // console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e) => {
    console.log("onSpeechResults: ", e);
    setResults(e.value);
    console.log("Data", e);
  };

  const onSpeechPartialResults = (e) => {
    // console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e) => {
    // console.log('onSpeechVolumeChanged: ', e);
    setVolume(e.value);
  };

  const _startRecognizing = async () => {
    _clearState();
    try {
      await Voice.start("en-US");
      console.log("called start");
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
      console.log("calledstop");
    } catch (e) {
      console.error(e);
    }
  };

  const _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    _clearState();
  };

  const _clearState = () => {
    setRecognized("");
    setVolume("");
    setError("");
    setEnd("");
    setStarted("");
    setResults([]);
    setPartialResults([]);
  };

  const SaveData = async (e) => {
    if (results != "") {
      console.log("ResultData : ", results);
      // const VoiceDataRec = await AsyncStorage.getItem("NotesArray");
      // console.log(VoiceDataRec, "Noters");
      // let VoiceDataAdd = [];
      // VoiceDataAdd = JSON.parse(VoiceDataRec);
      // VoiceDataAdd.push({
      //   key: new Date().getTime(),
      //   Title: "VoiceNotes",
      //   data: results,
      //   date: moment().format("DD/MM/YYYY"),
      //   time: moment().format("h:mm a"),
      // });
      // VoiceDataAdd.reverse();
      // setVoiceData(VoiceDate);
      // AsyncStorage.setItem("NotesArray", JSON.stringify(VoiceDataAdd));
      // Alert.alert("Data Added Successfully...");
      dispatch(
        AddNoteAction({
          title: title,
          description: results[0],
          date: SelectDate,
          time: selectTime,
        })
      );
      setVoiceData("");
      // console.log('VoiceData1234', JSON.parse(await AsyncStorage.getItem('NotesArray')))
      _clearState();
    }
    // else {
    //   VoiceDataAdd.push({
    //     key: new Date().getTime(),
    //     Title: "VoiceNotes",
    //     data: results,
    //     date: moment().format("DD/MM/YYYY"),
    //     time: moment().format("h:mm a"),
    //   });
    //   AsyncStorage.setItem("NotesArray", JSON.stringify(VoiceDataAdd));
    //   _clearState();
    // }
  };


  const showDatepicker = () => {
    // this.setState({ DatepickerVisible: true });
    setDatePicker(true)
  };
  const hideDatePicker = () => {
    // this.setState({ DatepickerVisible: false });
    setDatePicker(false)
  };
  const DatehandleConfirm = (date) => {
    console.log("A Date has been picked", date);  
    hideDatePicker();
    setSelectDate(moment(date).format("Y-M-D"))
    console.log('SelectedData',moment(date).format("Y-M-D"))
  };

  const showTimePicker = () => {
    setTimePicker(true)
  };
  const hideTimePicker = () => {
    setTimePicker(false)
  };

  const TimehandleConfirm = (time) => {
    console.log("A Date has been picked", time);
    hideTimePicker();
    setSelectTime(moment(time).format("h:m") )
    console.log('SelectedTime',moment(time).format("h:m"))
  };

  const navigation = useNavigation();
  return (
    <ImageBackground source={isLoading ?  IMAGE.HomeImage : {uri : BG.image}} style={{ height: windowHeight }}>
      <StatusBar
        hidden={false}
        barStyle={"light-content"}
        translucent
        backgroundColor="transparent"
      />
      <View style={[InnerStyle.HeaderMainStyle]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            resizeMode="contain"
            source={IMAGE.LeftSideIcon}
            style={InnerStyle.DrawerIconStyle}
          />
        </TouchableOpacity>
        <Text style={InnerStyle.HeaderTitle}>Speech To Text Convert</Text>
        <View style={InnerStyle.BlankSpace}></View>
      </View>
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Press the button and start speaking.
        </Text>
        <View
          style={{
            justifyContent: "space-between",
            height: windowHeight / 1.3,
            width: windowWidth / 1.2,

          }}
        >
          <TextInput
            onChangeText={(val) => setTitle(val)}
            value={title}
            style={{
              // height: "5%",
              paddingVertical:RFPercentage(1.2),
              textAlignVertical: "center",
              marginVertical: RFPercentage(1),
              // paddingVertical: RFPercentage(1.5),
              borderColor: Colors.LigthGrey2,
              borderWidth: 1,
              borderRadius: RFPercentage(1),
              paddingHorizontal: RFPercentage(2),
              fontSize: RFPercentage(2.2),
              fontFamily: Fonts.SemiBold,
              color: Colors.Black,
            }}
            // style={NotesStyle.TitleTextinputStyle}
            placeholder={"Enter Title..."}
            placeholderTextColor="grey"
          />
          {/* <Text style={styles.stat}>{`Started: ${started}`}</Text>
          <Text style={styles.stat}>{`Recognized: ${recognized}`}</Text>
          <Text style={styles.stat}>{`Volume: ${volume}`}</Text>
          <Text style={styles.stat}>{`Error: ${error}`}</Text> */}
          <View>
            <Text style={{ color: "black" }}>Start Speech: </Text>
            {/* {results.map((result, index) => {
              return (
                <Text key={`result-${index}`} style={styles.stat}>
                  {result}
                </Text>
              );
            })} */}
            {/* {results.map((result, index) => {
              return ( */}
            <Text style={styles.stat}>{results[0]}</Text>
            {/* );
            })} */}
            {/* <Text style={styles.stat}>Partial Results</Text>
            {partialResults.map((result, index) => {
              return (
                <Text key={`partial-result-${index}`} style={styles.stat}>
                  {result}
                </Text>
              );
            })} */}
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={{
                borderColor: Colors.LigthBlue,
                borderWidth: 1,
                padding: RFPercentage(1),
                borderRadius: RFPercentage(1),
              }}
              onPress={() => {
                showTimePicker()
              }}
            >
              <Text>{selectTime}</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={TimePicker}
              mode="time"
              format={"h:m"}
              onConfirm={TimehandleConfirm}
              onCancel={hideTimePicker}
              // minimumDate={this.state.time}
              value={time}
              onChange={(time) => {
                // this.setState({ SelectTime: time });
                setSelectTime(time.toString())
              }}
            />
            <TouchableOpacity
              style={{
                borderColor: Colors.LigthBlue,
                borderWidth: 1,
                padding: RFPercentage(1),
                borderRadius: RFPercentage(1),
              }}
              onPress={() =>{
                showDatepicker()
              }}
            >
              <Text>{SelectDate}</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={DatePicker}
              mode="date"
              format={"Y-M-D"}
              onConfirm={DatehandleConfirm}
              onCancel={hideDatePicker}
              // minimumDate={this.state.time}
              value={date}
              onChange={(date) => {
                // this.setState({ SelectTime: time });
                setSelectDate(date.toString())
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {/* <Text style={styles.stat}>{`End: ${end}`}</Text> */}

            <TouchableOpacity onPress={_stopRecognizing}>
              <Image style={[styles.button, {}]} source={IMAGE.StopBtn} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={_startRecognizing}
              style={{
                // backgroundColor: "black",
                // borderRadius: RFPercentage(5),
              }}
            >
              <Image
                style={[styles.button, ]}
                source={IMAGE.MicIcon}
              />
            </TouchableOpacity>
            {/* <TouchableHighlight onPress={_cancelRecognizing}>
              <Text style={styles.action}>Cancel</Text>
            </TouchableHighlight> */}
            <TouchableOpacity
              onPress={_destroyRecognizer}
              style={{ backgroundColor: "grey", borderRadius: RFPercentage(5) }}
            >
              <Image style={[styles.button, {}]} source={IMAGE.DustIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => SaveData(results)}
              style={{ borderRadius: RFPercentage(5) }}
            >
              <Image style={[styles.button, {}]} source={IMAGE.SaveBtn} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    width: RFPercentage(5),
    height: RFPercentage(5),
  },
  container: {
    // flex: 1,
    // justifyContent: 'center',
    marginVertical: RFPercentage(2),
    alignItems: "center",
    height: windowHeight / 1.2,
    borderRadius: RFPercentage(1.5),
    marginHorizontal: RFValue(16),
    backgroundColor: "#F5FCFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  action: {
    textAlign: "center",
    color: "#0000FF",
    marginVertical: 5,
    fontWeight: "bold",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  stat: {
    textAlign: "center",
    color: "#B0171F",
    marginBottom: 1,
  },
});

export default VoiceToText;
