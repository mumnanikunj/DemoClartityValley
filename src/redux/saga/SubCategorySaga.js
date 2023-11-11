import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { SUBCATEGORY_REQUEST, SUBCATEGORY_SUCCESS, SUBCATEGORY_FAILED } from '../action/types';

export function* SubCateGoryAsyn({ params }) {
    try {
        const response = yield call(Api.SubCategory, params);
        yield put({ type: SUBCATEGORY_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: SUBCATEGORY_FAILED, payload: e });
    }
}

export function* SubCateGorySaga() {
    yield takeEvery(SUBCATEGORY_REQUEST, SubCateGoryAsyn);
}

export default SubCateGorySaga;