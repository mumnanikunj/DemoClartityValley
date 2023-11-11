import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { GETQUOTE_REQUEST, GETQUOTE_SUCCESS, GETQUOTE_FAILED } from '../action/types';

export function* GetQuoteAsyn({ params }) {
    try {
        const response = yield call(Api.GetQuote, params);
        yield put({ type: GETQUOTE_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GETQUOTE_FAILED, payload: e });
    }
}

export function* GetQuoteSaga() {
    yield takeEvery(GETQUOTE_REQUEST, GetQuoteAsyn);
}

export default GetQuoteSaga;