import { DELETENOTE_SUCCESS, DELETENOTE_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case DELETENOTE_SUCCESS:
            return { DeleteNoteSuccess: true, data: action.payload };

        case DELETENOTE_FAILED:
            return { DeleteNoteSuccess: false, error: action.payload };

        default:
            return state;

    }
}