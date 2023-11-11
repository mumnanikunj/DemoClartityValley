import { VIEWMEDIA_SUCCESS, VIEWMEDIA_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case VIEWMEDIA_SUCCESS:
            return { ViewMediaSuccess: true, data: action.payload };

        case VIEWMEDIA_FAILED:
            return { ViewMediaSuccess: false, error: action.payload };

        default:
            return state;
    }
}   