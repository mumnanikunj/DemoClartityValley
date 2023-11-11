import { put, call, takeEvery, all } from "redux-saga/effects";

import LoginSaga from "./LoginSaga";
import RegisterSaga from "./RegisterSaga";
import GetCateGorySaga from "./GetCategorySaga";
import SubCateGorySaga from "./SubCategorySaga";
import AddNoteSaga from "./AddNoteSaga";
import GetNotesSaga from "./GetNotesSaga";
import EditNotesSaga from "./EditNotesSaga";
import DeleteNoteSaga from "./DeleteNoteSaga";
import GetQuestionsSaga from "./GetQuestionsSaga";
import ExploreSaga from "./ExploreSaga";
import EditProfileSaga from "./EditProfileSaga";
import AddQuoteSaga from "./AddQuoteSaga";
import GetQuoteSaga from "./GetQuoteSaga";
import EditQuoteSaga from "./EditQuoteSaga";
import DeleteQuoteSaga from "./DeleteQuoteSaga";
import VideolistSaga from "./VideoSaga";
import LikeSaga from "./LikeSaga";
import ReviewSaga from "./ReviewSaga";
import AudioSaga from "./AudioSaga";
import favMediaSaga from "./FavMediaSaga";
import BGImageSaga from "./BGImageSaga";
import ViewSaga from "./ViewSaga";
import HistorySaga from "./HistorySaga";
import TrainerSaga from "./TrainerSaga";
import TrainerReviewSaga from "./TrainerReview";
import RecoMediaSaga from "./RecoMediaSaga";
import TherapistBookSaga from "./TherapistBookingSaga";
import BookingStatusSaga from "./BookingStatusSaga";
import SelectDurationSaga from "./SelectDurationSaga";
import RescheduleAppointmentSaga from "./RescheduleAppoinmentSaga";
import CancelAppointmentSaga from "./CancelAppintmentSaga";
import ProfileDetailsSaga from "./ProfileDetailsSaga";

export default function* rootSaga() {
  console.log("rootSaga", rootSaga);
  yield all([
    LoginSaga(),
    RegisterSaga(),
    GetCateGorySaga(),
    SubCateGorySaga(),
    AddNoteSaga(),
    GetNotesSaga(),
    EditNotesSaga(),
    DeleteNoteSaga(),
    GetQuestionsSaga(),
    ExploreSaga(),
    EditProfileSaga(),
    AddQuoteSaga(),
    GetQuoteSaga(),
    EditQuoteSaga(),
    DeleteQuoteSaga(),
    VideolistSaga(),
    LikeSaga(),
    ReviewSaga(),
    AudioSaga(),
    favMediaSaga(),
    BGImageSaga(),
    ViewSaga(),
    HistorySaga(),
    TrainerSaga(),
    TrainerReviewSaga(),
    RecoMediaSaga(),
    TherapistBookSaga(),
    BookingStatusSaga(),
    SelectDurationSaga(),
    RescheduleAppointmentSaga(),
    CancelAppointmentSaga(),
    ProfileDetailsSaga(),
  ]);
}
