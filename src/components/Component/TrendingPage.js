import { useFocusEffect } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Share from "react-native-share";
import * as Colors from "../../common/colors";
import * as Fonts from "../../common/Fonts";
import * as IMAGE from "../../common/Image";
import { AuthStyle } from "../Auth/AuthStyle";
import { InnerStyle } from "./InnerStyle";
import Videoplayer from "./VideoPlayer";
import ModalComponents from "./ModalComponents";
import { NotesStyle } from "../SubComponent/NotesStyle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import {
  AddQuoteAction,
  DeleteQuoteAction,
  GetQuoteAction,
  EditQuoteAction,
} from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

export default function TrendingPage() {
  const navigation = useNavigation();
  const [page, SetPage] = useState(0);
  const [id, setID] = useState(0);
  const [onfocus, setOnfocus] = useState(0);
  const [Vid, setViD] = useState(0);
  const [like, setLike] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [QuotesModal, setQuotesModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [writer, setWriter] = useState("");
  const [quotes, setQuotes] = useState("");
  const [quotesData, setQuotesData] = useState("");
  const [EditQuote, setEditQuote] = useState(false);
  const [EQuoteData, setEQuoteData] = useState([]);
  const [tempData, setTempData] = useState("");
  const dispatch = useDispatch();
  const data = [
    {
      quote:
        "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      writer: "Nelson Mandela",
    },
    {
      quote: "The way to get started is to quit talking and begin doing.",
      writer: "Walt Disney",
    },
    {
      quote:
        "If life were predictable it would cease to be life, and be without flavor. ",
      writer: "Eleanor Roosevelt",
    },
    {
      quote: "Life is what happens when youre busy making other plans",
      writer: "Nelson Mandela",
    },
    {
      quote: "Life is either a daring adventure or nothing at all",
      writer: "Helen Keller",
    },
  ];

  const Vdata = [
    {
      Name: "Breathe",
      Disc: "Breathe Lorem ipsum Lorem ipsum Lorem",
      Time: "24",
      CoverImg: require("../../assets/images/icons/Vl_1.webp"),
      Video: require("../../assets/Video/MyMovie20.mov"),
      Type: "Relaxing",
    },
    {
      Name: "Wake Up",
      Disc: "Wake Up Lorem ipsum Lorem ipsum Lorem",
      Time: "5",
      CoverImg: require("../../assets/images/icons/VL_2.jpeg"),
      Type: "Yoga",
      Video: require("../../assets/Video/MyMovie20.mov"),
    },
    {
      Name: "Relax",
      Disc: "Relax Lorem ipsum Lorem ipsum Lorem",
      Time: "12",
      Type: "Calm",
      CoverImg: require("../../assets/images/icons/VL-3.jpeg"),
    },
    {
      Name: "Anxiety",
      Disc: " Anxiety Lorem ipsum Lorem ipsum Lorem",
      Time: "5",
      Type: "Meditation",
      CoverImg: require("../../assets/images/icons/VL_5.jpeg"),
    },
    {
      Name: "Gratitude",
      Disc: "Gratitude Lorem ipsum Lorem ipsum Lorem",
      Time: "10",
      Type: "Relationship",
      CoverImg: require("../../assets/images/PlayIcon.png"),
    },
    {
      Name: "Calm",
      Disc: "Relax Lorem ipsum Lorem ipsum Lorem",
      Time: "12",
      Type: "Calm",
      CoverImg: require("../../assets/images/icons/VL-3.jpeg"),
    },
  ];

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    dispatch(GetQuoteAction()); 
  }, []);


  // const AddData = useSelector((state) => state.AddQuote)
  const GetQuotesData = useSelector((state) => state.GetQuote);
  // const EditedQuoteData = useSelector((state) => state.EditQuote);
  // const DeleteQData = useSelector((state) => state.DeleteQuote);

  useEffect(() => {
    if (GetQuotesData) {
      if (GetQuotesData.GetQuoteSuccess) {
        const QData = GetQuotesData.data.data;
        console.log('DataQuet',GetQuotesData)
        setQuotesData(QData);
        setIsLoading(false);

      }
    }
  }, [GetQuotesData]);
  // useEffect(() => {
  //   if (EditedQuoteData) {
  //     setIsLoading(true)
  //     if (EditedQuoteData.EditQuoteSuccess) {
  //       setIsLoading(false)
  //     }
  //   }
  // }, [EditedQuoteData]);

  // useEffect(()=>{
  //   if(DeleteQData){
  //   }
  // },[DeleteQData])

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  const onShare = async () => {
    const ShareText = quotesData[id].quote;
    console.log("ShereData", ShareText);
    const options = {
      title: "My thoughts.",
      message: ShareText,
    };
    try {
      await Share.open(options);
    } catch (error) {
      // alert(error.message);
    }
  };

  // const OpenEditer = () => {
  //   setEditQuote(false);
  //   setQuotesModal(true);
  // };
  // const close = () => {
  //   setQuotesModal(false);
  //   clearText();
  // };

  // const DeleteQuote = (element) => {
  //   let DeleteID = element.id;
  //   // console.log('DeleteDataElement',DeleteID)
  //   dispatch(
  //     DeleteQuoteAction({
  //       id: DeleteID,
  //     })
  //   );
  // };
  // const AddQuotes = () => {
  //   let QuoteID = EQuoteData;
  //   console.log("IDDD", QuoteID.id);
  //   if (EditQuote) {
  //     dispatch(
  //       EditQuoteAction({
  //         id: QuoteID.id,
  //         writer_name: writer,
  //         quote: quotes,
  //       })
  //     );
  //     close();
  //       setIsLoading(true)
  //     // setIsLoading(true)
  //     clearText();
  //   } else if (writer != "" && quotes != "") {
  //     dispatch(
  //       AddQuoteAction(
  //         JSON.stringify({
  //           writer_name: writer,
  //           quote: quotes,
  //         })
  //       )
  //     );
  //     setIsLoading(true)
  //     clearText();
  //     setQuotesModal(false);
  //   }
  // };
  // const clearText = () => {
  //   setWriter("");
  //   setQuotes("");
  // };

  const renderQuotesItem = () => {
    return quotesData.map((element, index) => {
      return (
        // <TouchableOpacity
        //   onPress={() => {
        //     setTempData(element);
        //     setEQuoteData(element);
        //     setEditQuote(true);
        //     setQuotesModal(true);
        //     setWriter(element.writer_name);
        //     setQuotes(element.quote);
        //   }}
        // >
          <ImageBackground
            source={IMAGE.QuotesCard}
            style={InnerStyle.QuotesCardContainer}
            imageStyle={InnerStyle.QutoesBorder}
          >
            <View style={InnerStyle.QuotesCard}>
              <View style={InnerStyle.QuotesView}>
                <Text style={InnerStyle.QuotesText}>{element.quote}</Text>
              </View>
              <View style={InnerStyle.QuotesWriterView}>
                <Text style={InnerStyle.QuotesWriter}>
                  {element.writer_name}
                </Text>
              </View>

              <View style={InnerStyle.QShareContainer}>
                <View style={InnerStyle.QShareView}>
                  {/* <TouchableOpacity onPress={() => setLike(!like)}>
              <Image
                source={
                  like == true ? IMAGE.lHeart_Icon_fill : IMAGE.lHeart_Icon
                }
                style={[
                  InnerStyle.Share_Img,
                  like ? { tintColor: "orange" } : null,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={IMAGE.Comment_i} style={InnerStyle.Share_Img} />
            </TouchableOpacity> */}
                  {/* <TouchableOpacity
                    onPress={() => {
                      DeleteQuote(element);
                    }}
                  >
                    <Image
                      source={IMAGE.DeleteIcon}
                      style={InnerStyle.Share_Img}
                    />
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPressIn={() => setID(index)}
                    onPress={async () => {
                      onShare();
                    }}
                  >
                    <Image source={IMAGE.share} style={InnerStyle.Share_Img} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
      //  </TouchableOpacity> 
      );
    });
  };

  // const [counter, setCounter] = useState(0);
  // useEffect(() => {
  //   setInterval(() => {
  //     setCounter((counter) => (counter === 0 ? counter : counter - 1));
  //   }, 1000);
  // }, []);

  // counter == 0
  //   ? setTimeout(() => {
  //       setOnfocus(null);
  //     }, 100)
  //   : null;
  // const handleReset = () => {
  //   setCounter(10);
  // };
  // // console.log("THIS   :", counter);

  const renderVideoItem = ({ item, index }) => (
    <View style={InnerStyle.VideoCard}>
      <View style={InnerStyle.VideoContainer}>
        <ImageBackground
          source={item.CoverImg}
          style={InnerStyle.VideoCardImage}
          imageStyle={{
            borderRadius: RFValue(15),
            borderWidth: 1,
            borderColor: Colors.GreyBlue,
          }}
        >
          <View style={InnerStyle.downloadContainer}>
            <TouchableOpacity
              onPressIn={() => setViD(index)}
              onPress={() => setModalVisible(true)}
            >
              <Image source={IMAGE.I_download} style={InnerStyle.I_download} />
            </TouchableOpacity>
          </View>

          <View style={InnerStyle.PlayContainer}>
            <TouchableOpacity
              // onPressIn={() => setViD(index)}
              // onPress={() => setModalVisible(true)}
            >
              <Image source={IMAGE.Play} style={InnerStyle.PlayImg} />
            </TouchableOpacity>
          </View>
          <View style={InnerStyle.VideoDetails}>
            <Text style={InnerStyle.TV_Titile}>{item.Name}</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
  const renderImageItem = ({ item, index }) => (
    <View style={InnerStyle.ImageCard}>
      <Image
        source={item.CoverImg}
        style={{
          marginRight: RFValue(10),
          height: RFPercentage(30),
          width: RFPercentage(25),
          borderRadius: RFValue(15),
          borderWidth: 1,
          borderColor: Colors.GreyBlue,
        }}
      />
    </View>
  );

  function VideoPage() {
    const renderVideoPageItem = () => {
      return Vdata.map((element, index) => {
        return (
          <View style={[InnerStyle.VideoCard, { marginRight: RFValue(0) }]}>
            <ImageBackground
              source={element.CoverImg}
              style={[
                InnerStyle.VideoCardImage,
                { height: RFPercentage(25), width: RFPercentage(20) },
              ]}
              imageStyle={{
                borderRadius: RFValue(15),
                borderWidth: 1,
                borderColor: Colors.GreyBlue,
              }}
            >
              <View style={InnerStyle.downloadContainer}>
                <TouchableOpacity
                  onPressIn={() => setViD(index)}
                  onPress={() => setModalVisible(true)}
                >
                  <Image
                    source={IMAGE.I_download}
                    style={InnerStyle.I_download}
                  />
                </TouchableOpacity>
              </View>

              <View style={InnerStyle.PlayContainer}>
                <TouchableOpacity
                  // onPressIn={() => setViD(index)}
                  // onPress={() => setModalVisible(true)}
                >
                  <Image source={IMAGE.Play} style={InnerStyle.PlayImg} />
                </TouchableOpacity>
              </View>
              <View style={InnerStyle.VideoDetails}>
                <Text style={InnerStyle.TV_Titile}>{element.Name}</Text>
              </View>
            </ImageBackground>
          </View>
        );
      });
    };
    return (
      <View style={InnerStyle.TrendingVideos}>
        <Text style={InnerStyle.TQ_Titile}>Inspiring Video's :</Text>
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            width: windowWidth / 1.1,
            justifyContent: "space-around",
          }}
        >
          {renderVideoPageItem()}
        </View>
      </View>
    );
  }
  function QuotesPage() {
    return (
      <View style={[InnerStyle.TrendingQuotes, {}]}>
        <View   style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
          <Text style={InnerStyle.TQ_Titile}>Inspiring Quotes </Text>
          {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: Fonts.SemiBold,
                color: Colors.White,
                paddingHorizontal: RFPercentage(1),
              }}
            >
              AddQuote
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: Colors.GreyBlue,
                borderRadius: RFPercentage(2),
                padding: RFPercentage(0.5),
                backgroundColor: Colors.DarkBlue,
              }}
              onPress={() => {
                OpenEditer();
              }}
            >
              <Image
                source={IMAGE.PlusIcon}
                style={{
                  height: RFPercentage(2.5),
                  width: RFPercentage(2.5),
                }}
              />
            </TouchableOpacity>
          </View> */}
        </View>
        {quotesData != "" ? (
          <ScrollView>{renderQuotesItem()}</ScrollView>
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: windowHeight / 1.5,
            }}
          >
            <Text
              style={{
                color: Colors.White,
                fontFamily: Fonts.SemiBold,
                fontSize: RFValue(12),
              }}
            >
              No Quotes
            </Text>
          </View>
        )}
      </View>
    );
  }
  function ImagePage() {
    const renderImageItems = ({ item, index }) => (
      <View style={InnerStyle.ImageCard2}>
        <Image source={item.CoverImg} style={InnerStyle.ImageStyle} />
      </View>
    );

    return (
      <View>
        <View style={[InnerStyle.TrendingQuotes]}>
          <Text style={InnerStyle.TQ_Titile}>Inspiring Image's :</Text>
          <FlatList
            data={Vdata}
            renderItem={renderImageItems}
            keyExtractor={(index) => {
              index.toString(index);
            }}
          />
        </View>
      </View>
    );
  }

  function PageSwitcher() {
    if (page == 0) {
      return null;
    }
    if (page == 1) {
      return <VideoPage />;
    } else if (page == 2) {
      return <QuotesPage />;
    } else if (page == 3) {
      return <ImagePage />;
    }
  }
  return (
    <>
      <View style={InnerStyle.T_MainView}>
        <StatusBar
          hidden={false}
          barStyle={"light-content"}
          translucent
          backgroundColor="transparent"
        />
        <View style={InnerStyle.T_MainContainer}>
          <Modal
            visible={modalVisible}
            transparent
            animationType="slide"
            onSwipeComplete={() => setModalVisible(false)}
            onRequestClose={() => setModalVisible(false)}
            useNativeDriver={true}
            backdropColor={"transparent"}
            useNativeDriverForBackdrop
            swipeDirection={"down"}
            propagateSwipe={true}
            style={{
              margin: 0,
            }}
          >
            <ModalComponents id={Vid} />
          </Modal>
          {/* <Modal
            // animationType={'fade'}
            visible={QuotesModal}
            transparent
            animationType="fade"
            onSwipeComplete={close}
            useNativeDriver={true}
            backdropColor={"transparent"}
            useNativeDriverForBackdrop
            swipeDirection={["down"]}
            style={{
              margin: 16,
            }}
          >
            <TouchableWithoutFeedback
              accessible={false}
              onPress={() => Keyboard.dismiss()}
            >
              <View
                style={[
                  NotesStyle.ModalMainViewStyle,
                  { height: windowHeight / 2.5 },
                ]}
              >
                <View style={NotesStyle.ModalInnerMainstyle}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        height: RFPercentage(3.5),
                        width: RFPercentage(3.5),
                      }}
                    ></View>
                    <Text
                      style={{
                        fontFamily: Fonts.Bold,
                        fontSize: RFValue(15),
                        color: Colors.DarkBlue,
                      }}
                    >
                      Add Quotes
                    </Text>
                    <TouchableOpacity
                      style={{
                        // alignSelf: "flex-end",
                        marginVertical: RFPercentage(1),
                      }}
                      onPress={() => close()}
                    >
                      <Image
                        source={IMAGE.CrossIcon}
                        style={[
                          NotesStyle.CommonIConStyle,
                          {
                            tintColor: Colors.DarkBlue,
                            right: RFPercentage(0.2),
                          },
                        ]}
                      />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    onChangeText={(val) => setWriter(val)}
                    value={writer}
                    selectTextOnFocus={true}
                    style={[NotesStyle.TitleTextinputStyle, { height: "15%" }]}
                    placeholder={"Enter Writer Name"}
                    placeholderTextColor="grey"
                  />
                  <TextInput
                    selectTextOnFocus={true}
                    onChangeText={(val) => setQuotes(val)}
                    value={quotes}
                    style={[NotesStyle.TextInputStyle, { height: "50%" }]}
                    multiline={true}
                    placeholder={"Think and Write Quote:"}
                    placeholderTextColor="grey"
                  />
                </View>
                <View
                  style={[
                    NotesStyle.BottomButtonView,
                    { justifyContent: "space-around" },
                  ]}
                >
                  <TouchableOpacity
                    style={NotesStyle.BottomButton}
                    onPress={() => clearText()}
                  >
                    <Text style={{ color: Colors.White }}>Clear</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={quotes == "" && writer == ""}
                    onPress={() => {
                      AddQuotes();
                    }}
                    style={[
                      NotesStyle.BottomButton,
                      {
                        backgroundColor:
                          quotes == "" && writer == ""
                            ? Colors.LigthBlue
                            : Colors.ButtonBlue,
                      },
                    ]}
                  >
                    <Text style={{ color: Colors.White }}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPressIn={() => navigation.goBack()}>
              <Image
                resizeMode="contain"
                source={IMAGE.LeftSideIcon}
                style={InnerStyle.backIcon}
              />
            </TouchableOpacity>
            <Text style={InnerStyle.M_Title}>InspiringPage</Text>
            <View
              style={[InnerStyle.BlankSpace, { marginTop: RFPercentage(0) }]}
            ></View>
          </View>
          <View style={InnerStyle.T_pages}>
            <TouchableOpacity onPressIn={() => SetPage(0)}>
              <View
                style={
                  page !== 0 ? InnerStyle.T_pageslist : InnerStyle.T_pageslist2
                }
              >
                <Text style={InnerStyle.T_pagesTexts}>All</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPressIn={() => SetPage(1)}>
              <View
                style={
                  page !== 1 ? InnerStyle.T_pageslist : InnerStyle.T_pageslist2
                }
              >
                <Text style={InnerStyle.T_pagesTexts}>Video</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPressIn={() => SetPage(2)}>
              <View
                style={
                  page !== 2 ? InnerStyle.T_pageslist : InnerStyle.T_pageslist2
                }
              >
                <Text style={InnerStyle.T_pagesTexts}>Quotes</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => SetPage(3)}>
              <View
                style={
                  page !== 3 ? InnerStyle.T_pageslist : InnerStyle.T_pageslist2
                }
              >
                <Text style={InnerStyle.T_pagesTexts}>Image</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: RFPercentage(3) }}>
              {page == 0 ? (
                <View>
                  <View style={InnerStyle.TrendingQuotes}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={InnerStyle.TQ_Titile}>Inspiring Quotes</Text>
                      {/* <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text
                          style={{
                            fontFamily: Fonts.SemiBold,
                            color: Colors.White,
                            paddingHorizontal: RFPercentage(1),
                          }}
                        >
                          AddQuote
                        </Text>
                        <TouchableOpacity
                          style={{
                            borderWidth: 1,
                            borderColor: Colors.GreyBlue,
                            borderRadius: RFPercentage(2),
                            padding: RFPercentage(0.5),
                            backgroundColor: Colors.DarkBlue,
                          }}
                          onPress={() => {
                            OpenEditer();
                          }}
                        >
                          <Image
                            source={IMAGE.PlusIcon}
                            style={{
                              height: RFPercentage(2.5),
                              width: RFPercentage(2.5),
                            }}
                          />
                        </TouchableOpacity>
                      </View> */}
                    </View>
                    {quotesData != "" ? (
                      <ScrollView horizontal>{renderQuotesItem()}</ScrollView>
                    ) : (
                      // <FlatList
                      //   showsHorizontalScrollIndicator={false}
                      //   horizontal
                      //   data={quotesData}
                      //   renderItem={renderQuotesItem}
                      //   keyExtractor={(index) => {
                      //     index.toString(index);
                      //   }}
                      // />
                      <View style={{ alignItems: "center" }}>
                        <Text
                          style={{
                            color: Colors.White,
                            fontFamily: Fonts.SemiBold,
                            fontSize: RFValue(12),
                          }}
                        >
                          No Quotes
                        </Text>
                      </View>
                    )}
                  </View>

                  <View>
                    <View style={InnerStyle.TrendingVideos}>
                      <Text style={InnerStyle.TQ_Titile}>
                        Inspiring Video's :
                      </Text>

                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={Vdata}
                        renderItem={renderVideoItem}
                        keyExtractor={(index) => {
                          index.toString(index);
                        }}
                      />
                    </View>
                  </View>

                  <View style={InnerStyle.TrendingVideos}>
                    <Text
                      style={[
                        InnerStyle.TQ_Titile,
                        { paddingVertical: RFPercentage(1.5) },
                      ]}
                    >
                      Trending Image's :
                    </Text>

                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      data={Vdata}
                      renderItem={renderImageItem}
                      keyExtractor={(index) => {
                        index.toString(index);
                      }}
                    />
                  </View>
                </View>
              ) : null}
            </View>
            <PageSwitcher />
          </ScrollView>
        </View>
      </View>
      {isLoading ? (
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
          color={"white"}
          style={{
            position: "absolute",
            top: windowHeight / 2,
            left: windowWidth / 2.2,
          }}
          size={"large"}
        />
        </View>
      ) : undefined}
    </>
  );
}
