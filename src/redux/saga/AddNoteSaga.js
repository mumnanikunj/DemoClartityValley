import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { ADDNOTE_REQUEST, ADDNOTE_SUCCESS, ADDNOTE_FAILED } from '../action/types';

export function* AddNoteAsyn({ params }) {
    try {
        const response = yield call(Api.AddNote, params);
        yield put({ type: ADDNOTE_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: ADDNOTE_FAILED, payload: e });
    }
}

export function* AddNoteSaga() {
    yield takeEvery(ADDNOTE_REQUEST, AddNoteAsyn);
}

export default AddNoteSaga;