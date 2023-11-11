import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { CANCELAPPOINTMENT_REQUEST, CANCELAPPOINTMENT_SUCCESS, CANCELAPPOINTMENT_FAILED } from '../action/types';

export function* CancelAppointmentAsyn({ params }) {
    try {
        const response = yield call(Api.CancelAppointment, params);
        yield put({ type: CANCELAPPOINTMENT_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: CANCELAPPOINTMENT_FAILED, payload: e });
    }
}

export function* CancelAppointmentSaga() {
    yield takeEvery(CANCELAPPOINTMENT_REQUEST, CancelAppointmentAsyn);
}

export default CancelAppointmentSaga;