import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN_FAILED } from "../redux/action/types";
import { VideolistAsyn } from "../redux/saga/VideoSaga";

const BaseUrl = "https://app.clarityvalley.com/api/"; // API BaseUrl

module.exports = {
  async Login(params) {
    return fetch(`${BaseUrl}login`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    }).then(async (result) => {
      let res = await result.json();
      return res;
    });
  },

  async Register(params) {
    return fetch(`${BaseUrl}register`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    }).then(async (result) => {
      let RegisterRes = await result.json();
      return RegisterRes;
    });
  },

  async Category(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}get-category`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let Cres = await result.json();
      return Cres;
    });
  },
  async SubCategory(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(
      `${BaseUrl}get-sub-category?category_id=${params.category_id}`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${AccessT}`,
        },
      }
    ).then(async (result) => {
      let SubCate = await result.json();

      return SubCate;
    });
  },
  async AddNote(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}add-notes`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let Notes = await result.json();
      return Notes;
    });
  },
  async GetNotes(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}get-notes`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let GetNoteData = await result.json();
      return GetNoteData;
    });
  },
  async EditNotes(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}update-notes`, {
      method: "PUT",
      body: JSON.stringify(params),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let EditNote = await result.json();
      return EditNote;
    });
  },
  async DeleteNote(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    // const NoteID =  await AsyncStorage.getItem('NoteId')
    return fetch(`${BaseUrl}delete-notes?id=${params.id}`, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let RemoveNote = await result.json();
      return RemoveNote;
    });
  },
  async ExploreTopic(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}explore-topic`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let ExploreRes = await result.json();
      return ExploreRes;
    });
  },
  async EditProfile(params) {
    console.log("paramss", params);
    var formdata = new FormData();
    console.log("params.image==>>>>", params);
    if (params.image) {
      formdata.append("image", {
        type: "image/jpeg",
        name: "image.jpeg",
        uri: params.image,
      });
    }
    formdata.append("name", params.name);
    formdata.append("phone", params.phone);
    formdata.append("age", params.age);

    console.log("FormDta", JSON.stringify(formdata));
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}edit-profile`, {
      method: "POST",
      body: formdata,
      // body: JSON.stringify(params),
      headers: {
        Accept: "*/*",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let EProfile = await result.json();
      console.log("EditProfile", EProfile);
      return EProfile;
    });
  },
  async AddQuote(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}add-quote`, {
      method: "POST",
      body: params,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let AddQuoteData = await result.json();
      return AddQuoteData;
    });
  },
  async GetQuote(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}get-quotes`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let getQuoteData = await result.json();
      return getQuoteData;
    });
  },
  async EditQuote(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(
      `${BaseUrl}update-quote?id=${params.id}&writer_name=${params.writer_name}&quote=${params.quote}`,
      {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${AccessT}`,
        },
      }
    ).then(async (result) => {
      let EditQuoteData = await result.json();

      return EditQuoteData;
    });
  },
  async DeleteQuote(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}delete-quote?id=${params.id}`, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      const DeleteQuoteData = await result.json();
      return DeleteQuoteData;
    });
  },
  async VideoList(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(
      `${BaseUrl}get-video-list?sub_category_id=${params.sub_category_id}`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${AccessT}`,
        },
      }
    ).then(async (result) => {
      let VideoListData = await result.json();
      return VideoListData;
    });
  },
  async Review(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}media-review`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let Reviewdata = await result.json();
      return Reviewdata;
    });
  },
  async Like(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}sub-category-favourite`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let LikeVideoData = await result.json();
      return LikeVideoData;
    });
  },
  async AudioList() {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}get-audio-list`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let AudioListData = await result.json();
      return AudioListData;
    });
  },
  async favMedia(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}get-favourite-sub-category`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let favMediaListData = await result.json();
      return favMediaListData;
    });
  },
  async BGImage(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}get-sitebg`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let BGIRes = await result.json();
      return BGIRes;
    });
  },
  async ViewMedia(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}media-view-count`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let ViewData = await result.json();
      return ViewData;
    });
  },
  async History(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}recent-view-media`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let HistoryData = await result.json();
      return HistoryData;
    });
  },
  async Trainer(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}get-trainer`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let TrainerData = await result.json();
      return TrainerData;
    });
  },
  async TrainerReview(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}trainer-review`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let TrainerReviewData = await result.json();
      return TrainerReviewData;
    });
  },
  async RecoMediaCollecation(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}recommendation-media`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let RecoMediaData = await result.json();
      return RecoMediaData;
    });
  },
  async TherapistBook(params) {
    let formdata = new FormData();
    formdata.append("trainer", params.trainer);
    formdata.append("date", params.date);
    formdata.append("time", params.time);
    formdata.append("duration", params.duration);
    formdata.append("video_call", params.pre_session_note);
    formdata.append("paymentkey", params.paymentkey);
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(
      `${BaseUrl}user-booking?trainer=${params.trainer}&date=${params.date}&time=${params.time}&duration=${params.duration}&video_call=${params.video_call}&paymentkey=${params.paymentkey}`,
      {
        method: "POST",
        body: formdata,
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${AccessT}`,
        },
      }
    ).then(async (result) => {
      let TherapistBookRes = await result.json();
      return TherapistBookRes;
    });
  },
  async BookingStatus(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}booking-list`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let RecoMediaData = await result.json();
      return RecoMediaData;
    });
  },

  async VideoCall(params) {
    var formdata = new FormData();
    formdata.append("video_session_id", params.id);

    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}video-access-token?video_session_id=${params.id}`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let videocall = await result.json();
      // console.log("video Status", videocall);
      return videocall;
    });
  },
  async SelectDuration(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(
      `${BaseUrl}booking-slot?trainer=${params.id}&duration=${params.duration}&date=${params.date}`,
      {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${AccessT}`,
        },
      }
    ).then(async (result) => {
      let DurationData = await result.json();
      return DurationData;
    });
  },
  async RescheduleAppointment(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(
      `${BaseUrl}booking-reschedule?id=${params.id}&date=${params.date}&time=${params.time}&duration=${params.duration}`,
      {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${AccessT}`,
        },
      }
    ).then(async (result) => {
      let RescheduleAppointmet = await result.json();
      return RescheduleAppointmet;
    });
  },
  async CancelAppointment(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}booking-cancel?id=${params.id}`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let CancelAppintment = await result.json();
      return CancelAppintment;
    });
  },

  //Add This Api

  async ProfileDetails(params) {
    const AccessT = await AsyncStorage.getItem("AccessToken");
    return fetch(`${BaseUrl}get-profile`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessT}`,
      },
    }).then(async (result) => {
      let ProfileData = await result.json();
      return ProfileData;
    });
  },

  //End
};
