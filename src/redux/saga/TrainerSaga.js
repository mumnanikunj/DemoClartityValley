import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { TRAINER_REQUEST, TRAINER_SUCCESS, TRAINER_FAILED } from '../action/types';

export function* TrainerAsyn({ params }) {
    try {
        const response = yield call(Api.Trainer, params);
        yield put({ type: TRAINER_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: TRAINER_FAILED, payload: e });
    }
}

export function* TrainerSaga() {
    yield takeEvery(TRAINER_REQUEST, TrainerAsyn);
}

export default TrainerSaga;