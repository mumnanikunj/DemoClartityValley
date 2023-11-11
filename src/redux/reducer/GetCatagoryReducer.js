import { GETCATEGORY_SUCCESS, GETCATEGORY_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case GETCATEGORY_SUCCESS:
            return { GetCategorySuccess: true, data: action.payload };

        case GETCATEGORY_FAILED:
            return { GetCategorySuccess: false, error: action.payload };

        default:
            return state;

    }
}