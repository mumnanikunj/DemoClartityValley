import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { BGIMAGE_REQUEST, BGIMAGE_SUCCESS, BGIMAGE_FAILED } from '../action/types';

export function* BGImageAsyn({ params }) {
    try {
        const response = yield call(Api.BGImage, params);
        yield put({ type: BGIMAGE_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: BGIMAGE_FAILED, payload: e });
    }
}

export function* BGImageSaga() {
    yield takeEvery(BGIMAGE_REQUEST, BGImageAsyn);
}

export default BGImageSaga;