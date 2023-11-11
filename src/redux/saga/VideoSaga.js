import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { VIDEOLIST_REQUEST, VIDEOLIST_SUCCESS, VIDEOLIST_FAILED } from '../action/types';

export function* VideolistAsyn({ params }) {
    try {
        const response = yield call(Api.VideoList, params);
        yield put({ type: VIDEOLIST_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: VIDEOLIST_FAILED, payload: e });
    }
}

export function* VideolistSaga() {
    yield takeEvery(VIDEOLIST_REQUEST, VideolistAsyn);
}

export default VideolistSaga;