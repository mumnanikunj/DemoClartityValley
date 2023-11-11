import { put, call, takeEvery, take } from "redux-saga/effects";

import Api from "../../common/Api";
import {
  RESCHEDULEAPPOINTMENT_REQUEST,
  RESCHEDULEAPPOINTMENT_SUCCESS,
  RESCHEDULEAPPOINTMENT_FAILED,
} from "../action/types";

export function* RescheduleAppointmentAsyn({ params }) {
  try {
    const response = yield call(Api.RescheduleAppointment, params);
    yield put({ type: RESCHEDULEAPPOINTMENT_SUCCESS, payload: response });
  } catch (e) {
    yield put({ type: RESCHEDULEAPPOINTMENT_FAILED, payload: e });
  }
}

export function* RescheduleAppointmentSaga() {
  yield takeEvery(RESCHEDULEAPPOINTMENT_REQUEST, RescheduleAppointmentAsyn);
}

export default RescheduleAppointmentSaga;
