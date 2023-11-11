import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { TRAINERREVIEW_REQUEST, TRAINERREVIEW_SUCCESS, TRAINERREVIEW_FAILED } from '../action/types';

export function* TrainerReviewAsyn({ params }) {
    try {
        const response = yield call(Api.TrainerReview, params);
        yield put({ type: TRAINERREVIEW_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: TRAINERREVIEW_FAILED, payload: e });
    }
}

export function* TrainerReviewSaga() {
    yield takeEvery(TRAINERREVIEW_REQUEST, TrainerReviewAsyn);
}

export default TrainerReviewSaga;