import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { GETCATEGORY_REQUEST, GETCATEGORY_SUCCESS, GETCATEGORY_FAILED } from '../action/types';

export function* GetCateGoryAsyn({ params }) {
    try {
        const response = yield call(Api.Category, params);
        yield put({ type: GETCATEGORY_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GETCATEGORY_FAILED, payload: e });
    }
}

export function* GetCateGorySaga() {
    yield takeEvery(GETCATEGORY_REQUEST, GetCateGoryAsyn);
}

export default GetCateGorySaga;