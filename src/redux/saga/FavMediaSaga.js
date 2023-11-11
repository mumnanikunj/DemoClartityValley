import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { FAVMEDIALIST_REQUEST, FAVMEDIALIST_SUCCESS, FAVMEDIALIST_FAILED } from '../action/types';

export function* favMediaAsyn({ params }) {
    try {
        const response = yield call(Api.favMedia, params);
        // console.log('FavSaga',response)
        yield put({ type: FAVMEDIALIST_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: FAVMEDIALIST_FAILED, payload: e });
    }
}

export function* favMediaSaga() {
    yield takeEvery(FAVMEDIALIST_REQUEST, favMediaAsyn);
}

export default favMediaSaga;