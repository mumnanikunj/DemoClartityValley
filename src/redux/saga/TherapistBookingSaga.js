import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { BOOKINGTHERAPIST_REQUEST, BOOKINGTHERAPIST_SUCCESS, BOOKINGTHERAPIST_FAILED } from '../action/types';

export function* TherapistBookAsyn({ params }) {
    try {
        const response = yield call(Api.TherapistBook, params);
        yield put({ type: BOOKINGTHERAPIST_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: BOOKINGTHERAPIST_FAILED, payload: e });
    }
}

export function* TherapistBookSaga() {
    yield takeEvery(BOOKINGTHERAPIST_REQUEST, TherapistBookAsyn);
}

export default TherapistBookSaga;