import { LIKE_SUCCESS, LIKE_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case LIKE_SUCCESS:
            return { LikeSuccess: true, data: action.payload };

        case LIKE_FAILED:
            return { LikeSuccess: false, error: action.payload };

        default:
            return state;

    }
}