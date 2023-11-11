import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { EXPLORETOPIC_REQUEST, EXPLORETOPIC_SUCCESS, EXPLORETOPIC_FAILED } from '../action/types';

export function* ExploreAsyn({ params }) {
    try {
        const response = yield call(Api.ExploreTopic, params);
        yield put({ type: EXPLORETOPIC_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: EXPLORETOPIC_FAILED, payload: e });
    }
}

export function* ExploreSaga() {
    yield takeEvery(EXPLORETOPIC_REQUEST, ExploreAsyn);
}

export default ExploreSaga;