import { AUDIO_SUCCESS, AUDIO_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case AUDIO_SUCCESS:
            return { AudioSuccess: true, data: action.payload };

        case AUDIO_FAILED:
            return { AudioSuccess: false, error: action.payload };

        default:
            return state;

    }
}