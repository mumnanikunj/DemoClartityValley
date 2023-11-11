import { ADDNOTE_SUCCESS, ADDNOTE_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case ADDNOTE_SUCCESS:
            return { AddNoteSuccess: true, data: action.payload };

        case ADDNOTE_FAILED:
            return { AddNoteSuccess: false, error: action.payload };

        default:
            return state;

    }
}