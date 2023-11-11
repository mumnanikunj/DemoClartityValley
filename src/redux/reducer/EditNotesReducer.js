import { EDITNOTES_SUCCESS, EDITNOTES_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case EDITNOTES_SUCCESS:
            return { EditNotesSuccess: true, data: action.payload };

        case EDITNOTES_FAILED:
            return { EditNotesSuccess: false, error: action.payload };

        default:
            return state;

    }
}