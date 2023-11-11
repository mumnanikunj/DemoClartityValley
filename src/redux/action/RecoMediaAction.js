import { RECOMEDIA_REQUEST } from './types';

export const RecoMediaAction = params => {    
    return {
        type: RECOMEDIA_REQUEST,
        params,
    };
};