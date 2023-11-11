import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { SELECTDURATION_REQUEST, SELECTDURATION_SUCCESS, SELECTDURATION_FAILED } from '../action/types';

export function* SelectDurationAsyn({ params }) {
    try {
        const response = yield call(Api.SelectDuration, params);
        console.log("selectDurationSaga",params)
        yield put({ type: SELECTDURATION_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: SELECTDURATION_FAILED, payload: e });
    }
}

export function* SelectDurationSaga() {
    yield takeEvery(SELECTDURATION_REQUEST, SelectDurationAsyn);
}

export default SelectDurationSaga;