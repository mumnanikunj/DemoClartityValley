import { GETNOTES_SUCCESS, GETNOTES_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case GETNOTES_SUCCESS:
            return { GetNotesSuccess: true, data: action.payload };

        case GETNOTES_FAILED:
            return { GetNotesSuccess: false, error: action.payload };

        default:
            return state;

    }
}