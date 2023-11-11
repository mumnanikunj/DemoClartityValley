import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { BOOKINGSTATUS_REQUEST, BOOKINGSTATUS_SUCCESS, BOOKINGSTATUS_FAILED } from '../action/types';

export function* BookingStatusAsyn({ params }) {
    try {
        const response = yield call(Api.BookingStatus, params);
        yield put({ type: BOOKINGSTATUS_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: BOOKINGSTATUS_FAILED, payload: e });
    }
}

export function* BookingStatusSaga() {
    yield takeEvery(BOOKINGSTATUS_REQUEST, BookingStatusAsyn);
}

export default BookingStatusSaga;