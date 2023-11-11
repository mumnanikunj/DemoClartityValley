import { put, call, takeEvery, take } from "redux-saga/effects";

import Api from "../../common/Api";
import {
  EDITPROFILE_REQUEST,
  EDITPROFILE_SUCCESS,
  EDITPROFILE_FAILED,
} from "../action/types";

export function* EditProfileAsyn({ params }) {
  try {
    const response = yield call(Api.EditProfile, params);
    yield put({ type: EDITPROFILE_SUCCESS, payload: response });
  } catch (e) {
    yield put({ type: EDITPROFILE_FAILED, payload: e });
  }
}

export function* EditProfileSaga() {
  yield takeEvery(EDITPROFILE_REQUEST, EditProfileAsyn);
}

export default EditProfileSaga;
