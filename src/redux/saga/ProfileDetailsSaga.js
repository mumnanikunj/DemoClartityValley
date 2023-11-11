import { put, call, takeEvery, take } from "redux-saga/effects";

import Api from "../../common/Api";
import {
  PROFILEDETAILS_REQUEST,
  PROFILEDETAILS_SUCCESS,
  PROFILEDETAILS_FAILED,
} from "../action/types";

export function* ProfileDetailsSync({ params }) {
  try {
    const response = yield call(Api.ProfileDetails, params);
    yield put({ type: PROFILEDETAILS_SUCCESS, payload: response });
  } catch (e) {
    yield put({ type: PROFILEDETAILS_FAILED, payload: e });
  }
}

export function* ProfileDetailsSaga() {
  yield takeEvery(PROFILEDETAILS_REQUEST, ProfileDetailsSync);
}

export default ProfileDetailsSaga;
