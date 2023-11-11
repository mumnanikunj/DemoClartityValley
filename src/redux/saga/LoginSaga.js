import { put, call, takeEvery, take } from 'redux-saga/effects';

import Api from '../../common/Api';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from '../action/types';

export function* LoginAsyn({ params }) {
    try {
        const response = yield call(Api.Login, params);
        yield put({ type: LOGIN_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: LOGIN_FAILED, payload: e });
    }
}

export function* LoginSaga() {
    yield takeEvery(LOGIN_REQUEST, LoginAsyn);
}

export default LoginSaga;