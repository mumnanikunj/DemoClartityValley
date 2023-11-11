import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { AUDIO_REQUEST, AUDIO_SUCCESS, AUDIO_FAILED } from '../action/types';

export function* AudioAsyn({ params }) {
    try {
        const response = yield call(Api.AudioList, params);
        yield put({ type: AUDIO_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: AUDIO_FAILED, payload: e });
    }
}

export function* AudioSaga() {
    yield takeEvery(AUDIO_REQUEST, AudioAsyn);
}

export default AudioSaga;