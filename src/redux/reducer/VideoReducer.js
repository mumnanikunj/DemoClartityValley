import { VIDEOLIST_SUCCESS, VIDEOLIST_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case VIDEOLIST_SUCCESS:
            return { VideoListSuccess: true, data: action.payload };

        case VIDEOLIST_FAILED:
            return { VideoListSuccess: false, error: action.payload };

        default:
            return state;
    }
}   