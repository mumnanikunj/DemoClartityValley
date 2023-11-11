import { combineReducers } from "redux";

import LoginReducer from "./LoginReducer";
import RegisterReducer from "./RegisterReducer";
import GetCatagoryReducer from "./GetCatagoryReducer";
import SubCategoryReducer from "./SubCategoryReducer";
import AddNoteReducer from "./AddNoteReducer";
import GetNotesReducer from "./GetNotesReducer";
import EditNotesReducer from "./EditNotesReducer";
import DeleteNoteReducer from "./DeleteNoteReducer";
import GetQuestionsReducer from "./GetQuestionsReducer";
import ExploreReducer from "./ExploreReducer";
import EditProfileReducer from "./EditProfileReducer";
import AddQuoteReducer from "./AddQuoteReducer";
import GetQuoteReducer from "./GetQuoteReducer";
import DeleteQuoteReducer from "./DeleteQuoteReducer";
import EditQuoteReducer from "./EditQuoteReducer";
import VideoReducer from "./VideoReducer";
import ReviewReducer from "./ReviewReducer";
import LikeReducer from "./LikeReducer";
import AudioReducer from "./AudioReducer";
import FavMediaReducer from "./FavMediaReducer";
import BGImageReducer from "./BGImageReducer";
import ViewReducer from "./ViewReducer";
import HistoryReducer from "./HistoryReducer";
import TrainerReducer from "./TrainerReducer";
import TrainerReviewReducer from "./TrainerReviewReducer";
import RecoMediaReducer from "./RecoMediaReducer";
import TherapistBookingReducer from "./TherapistBookingReducer";
import BookingStatusReducer from "./BookingStatusReducer";
import SelectDurationReducer from "./SelectDurationReducer";
import RescheduleAppointmetReducer from "./RescheduleAppointmetReducer";
import CancelAppoinmentReducer from "./CancelAppoinmentReducer";
import ProfileDetailsReducer from "./ProfileDetailsReducer";

export default combineReducers({
  Login: LoginReducer,
  Register: RegisterReducer,
  GetCategory: GetCatagoryReducer,
  SubCategory: SubCategoryReducer,
  AddNote: AddNoteReducer,
  GetNotes: GetNotesReducer,
  EditNotes: EditNotesReducer,
  DeleteNote: DeleteNoteReducer,
  GetQuestion: GetQuestionsReducer,
  ExploreTopic: ExploreReducer,
  EditProfile: EditProfileReducer,
  AddQuote: AddQuoteReducer,
  GetQuote: GetQuoteReducer,
  EditQuote: EditQuoteReducer,
  DeleteQuote: DeleteQuoteReducer,
  VideoList: VideoReducer,
  Review: ReviewReducer,
  Like: LikeReducer,
  Audio: AudioReducer,
  FavMedia: FavMediaReducer,
  BGImage: BGImageReducer,
  View: ViewReducer,
  History: HistoryReducer,
  Trainer: TrainerReducer,
  TrainerReview: TrainerReviewReducer,
  RecoMedia: RecoMediaReducer,
  TherapistBooking: TherapistBookingReducer,
  BookingStatus: BookingStatusReducer,
  SelectDuration: SelectDurationReducer,
  RescheduleAppoinment: RescheduleAppointmetReducer,
  CancelAppoinment: CancelAppoinmentReducer,
  ProfileDetails: ProfileDetailsReducer,
});
