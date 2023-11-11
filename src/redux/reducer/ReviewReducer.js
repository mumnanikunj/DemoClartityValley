import { REVIEW_SUCCESS, REVIEW_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case REVIEW_SUCCESS:
            return { ReviewSuccess: true, data: action.payload };

        case REVIEW_FAILED:
            return { ReviewSuccess: false, error: action.payload };

        default:
            return state;

    }
}