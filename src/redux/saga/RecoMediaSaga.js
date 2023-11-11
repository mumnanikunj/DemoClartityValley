import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { RECOMEDIA_REQUEST, RECOMEDIA_SUCCESS, RECOMEDIA_FAILED } from '../action/types';

export function* RecoMediaAsyn({ params }) {
    try {        
        const response = yield call(Api.RecoMediaCollecation, params);
        yield put({ type: RECOMEDIA_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: RECOMEDIA_FAILED, payload: e });
    }
}

export function* RecoMediaSaga() {
    yield takeEvery(RECOMEDIA_REQUEST, RecoMediaAsyn);
}

export default RecoMediaSaga;