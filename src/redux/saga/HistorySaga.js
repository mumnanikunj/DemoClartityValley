import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { HISTORY_REQUEST, HISTORY_SUCCESS, HISTORY_FAILED } from '../action/types';

export function* HistoryAsyn({ params }) {
    try {
        const response = yield call(Api.History, params);
        yield put({ type: HISTORY_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: HISTORY_FAILED, payload: e });
    }
}

export function* HistorySaga() {
    yield takeEvery(HISTORY_REQUEST, HistoryAsyn);
}

export default HistorySaga;