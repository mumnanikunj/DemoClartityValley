import { GETNOTES_REQUEST } from './types';

export const GetNotesAction = params => {
    // console.log('GetCateGoryAction', params);
    return {
        type: GETNOTES_REQUEST,
        params,
    };
};