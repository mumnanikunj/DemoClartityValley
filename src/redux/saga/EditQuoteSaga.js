import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { EDITQUOTE_REQUEST, EDITQUOTE_SUCCESS, EDITQUOTE_FAILED } from '../action/types';

export function* EditQuoteAsyn({ params }) {
    try {
        const response = yield call(Api.EditQuote, params);
        yield put({ type: EDITQUOTE_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: EDITQUOTE_FAILED, payload: e });
    }
}

export function* EditQuoteSaga() {
    yield takeEvery(EDITQUOTE_REQUEST, EditQuoteAsyn);
}

export default EditQuoteSaga;