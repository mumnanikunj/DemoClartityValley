import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { DELETENOTE_REQUEST, DELETENOTE_SUCCESS, DELETENOTE_FAILED } from '../action/types';

export function* DeleteNoteAsyn({ params }) {
    try {
        const response = yield call(Api.DeleteNote, params);
        yield put({ type: DELETENOTE_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: DELETENOTE_FAILED, payload: e });
    }
}

export function* DeleteNoteSaga() {
    yield takeEvery(DELETENOTE_REQUEST, DeleteNoteAsyn);
}

export default DeleteNoteSaga;