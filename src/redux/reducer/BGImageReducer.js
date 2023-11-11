import { BGIMAGE_SUCCESS, BGIMAGE_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case BGIMAGE_SUCCESS:
            return { BGImageSuccess: true, data: action.payload };

        case BGIMAGE_FAILED:
            return { BGImageSuccess: false, error: action.payload };

        default:
            return state;

    }
}   