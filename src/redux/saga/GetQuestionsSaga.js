import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { GETQUESTIONS_REQUEST, GETQUESTIONS_SUCCESS, GETQUESTIONS_FAILED } from '../action/types';

export function* GetQuestionsAsyn({ params }) {
    try {
        const response = yield call(Api.GetQuestions, params);
        yield put({ type: GETQUESTIONS_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GETQUESTIONS_FAILED, payload: e });
    }
}

export function* GetQuestionsSaga() {
    yield takeEvery(GETQUESTIONS_REQUEST, GetQuestionsAsyn);
}

export default GetQuestionsSaga;