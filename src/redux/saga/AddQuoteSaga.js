import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { ADDQUOTE_REQUEST, ADDQUOTE_SUCCESS, ADDQUOTE_FAILED } from '../action/types';

export function* AddQuoteAsyn({ params }) {
    try {
        const response = yield call(Api.AddQuote, params);
        console.log('Responce avoooooo',response)
        yield put({ type: ADDQUOTE_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: ADDQUOTE_FAILED, payload: e });
    }
}

export function* AddQuoteSaga() {
    yield takeEvery(ADDQUOTE_REQUEST, AddQuoteAsyn);
}

export default AddQuoteSaga;