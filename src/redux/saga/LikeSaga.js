import { put, call, takeEvery, take } from "redux-saga/effects";

import Api from "../../common/Api";
import { LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILED } from "../action/types";

export function* LikeAsyn({ params }) {
  try {
    console.log("Likesaga", params);
    const response = yield call(Api.Like, params);
    yield put({ type: LIKE_SUCCESS, payload: response });
  } catch (e) {
    yield put({ type: LIKE_FAILED, payload: e });
  }
}

export function* LikeSaga() {
  yield takeEvery(LIKE_REQUEST, LikeAsyn);
}

export default LikeSaga;
