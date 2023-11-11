import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { VIEWMEDIA_REQUEST, VIEWMEDIA_SUCCESS, VIEWMEDIA_FAILED } from '../action/types';

export function* ViewMediaAsyn({ params }) {
    try {
        const response = yield call(Api.ViewMedia, params);
        yield put({ type: VIEWMEDIA_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: VIEWMEDIA_FAILED, payload: e });
    }
}

export function* ViewMediaSaga() {
    yield takeEvery(VIEWMEDIA_REQUEST, ViewMediaAsyn);
}

export default ViewMediaSaga;