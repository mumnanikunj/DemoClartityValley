import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { GETNOTES_REQUEST, GETNOTES_SUCCESS, GETNOTES_FAILED } from '../action/types';

export function* GetNotesAsyn({ params }) {
    try {
        const response = yield call(Api.GetNotes, params);
        yield put({ type: GETNOTES_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GETNOTES_FAILED, payload: e });
    }
}

export function* GetNotesSaga() {
    yield takeEvery(GETNOTES_REQUEST, GetNotesAsyn);
}

export default GetNotesSaga;