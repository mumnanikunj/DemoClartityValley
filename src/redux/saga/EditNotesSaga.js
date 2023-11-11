import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { EDITNOTES_REQUEST, EDITNOTES_SUCCESS, EDITNOTES_FAILED } from '../action/types';

export function* EditNotesAsyn({ params }) {
    try {
        const response = yield call(Api.EditNotes, params);
        yield put({ type: EDITNOTES_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: EDITNOTES_FAILED, payload: e });
    }
}

export function* EditNotesSaga() {
    yield takeEvery(EDITNOTES_REQUEST, EditNotesAsyn);
}

export default EditNotesSaga;