import { FAVMEDIALIST_SUCCESS, FAVMEDIALIST_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    // console.log('FavReducer',action)
    switch (action.type) {
        case FAVMEDIALIST_SUCCESS:
            return { FavMediaListSuccess: true, data: action.payload };

        case FAVMEDIALIST_FAILED:
            return { FavMediaListSuccess: false, error: action.payload };

        default:
            return state;

    }
}