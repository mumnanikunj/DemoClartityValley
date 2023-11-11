import { GETCATEGORY_REQUEST } from './types';

export const GetCateGoryAction = params => {
    // console.log('GetCateGoryAction', params);
    return {
        type: GETCATEGORY_REQUEST,
        params,
    };
};