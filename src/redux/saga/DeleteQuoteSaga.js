import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { DELETEQUOTE_REQUEST, DELETEQUOTE_SUCCESS, DELETEQUOTE_FAILED } from '../action/types';

export function* DeleteQuoteAsyn({ params }) {
    try {
        const response = yield call(Api.DeleteQuote, params);
        yield put({ type: DELETEQUOTE_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: DELETEQUOTE_FAILED, payload: e });
    }
}

export function* DeleteQuoteSaga() {
    yield takeEvery(DELETEQUOTE_REQUEST, DeleteQuoteAsyn);
}

export default DeleteQuoteSaga;