import { SUBCATEGORY_SUCCESS, SUBCATEGORY_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case SUBCATEGORY_SUCCESS:
            return { SubCategorySuccess: true, data: action.payload };

        case SUBCATEGORY_FAILED:
            return { SubCategorySuccess: false, error: action.payload };

        default:
            return state;

    }
}