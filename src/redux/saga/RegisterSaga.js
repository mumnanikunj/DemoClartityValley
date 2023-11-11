import { put, call, takeEvery, take } from "redux-saga/effects";

import Api from "../../common/Api";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "../action/types";

export function* RegisterAsyn({ params }) {
  try {
    const response = yield call(Api.Register, params);
    yield put({ type: REGISTER_SUCCESS, payload: response });
  } catch (e) {
    yield put({ type: REGISTER_FAILED, payload: e });
  }
}

export function* RegisterSaga() {
  yield takeEvery(REGISTER_REQUEST, RegisterAsyn);
}

export default RegisterSaga;
