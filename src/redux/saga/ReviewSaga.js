import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { REVIEW_REQUEST, REVIEW_SUCCESS, REVIEW_FAILED } from '../action/types';

export function* ReviewAsyn({ params }) {
    try {
        const response = yield call(Api.Review, params);
        yield put({ type: REVIEW_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: REVIEW_FAILED, payload: e });
    }
}

export function* ReviewSaga() {
    yield takeEvery(REVIEW_REQUEST, ReviewAsyn);
}

export default ReviewSaga;