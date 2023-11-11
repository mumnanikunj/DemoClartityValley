import { LOGIN_REQUEST } from './types';

export const LoginAction = params => {
    // console.log('LoginAction', params);
    return {
        type: LOGIN_REQUEST,
        params,
    };
};