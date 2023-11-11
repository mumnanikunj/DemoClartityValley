import { LIKE_REQUEST } from './types';

export const LikeAction = params => {
    // console.log('LikeAction',params);
    return {
        type: LIKE_REQUEST,
        params,
    };
};