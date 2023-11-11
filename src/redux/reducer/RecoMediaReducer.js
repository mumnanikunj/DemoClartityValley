import { RECOMEDIA_SUCCESS, RECOMEDIA_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {    
    switch (action.type) {
        case RECOMEDIA_SUCCESS:
            return { RecommendedSuccess: true, data: action.payload };

        case RECOMEDIA_FAILED:
            return { RecommendedSuccess: false, error: action.payload };

        default:
            return state;

    }
}