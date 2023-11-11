import { EDITQUOTE_SUCCESS, EDITQUOTE_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case EDITQUOTE_SUCCESS:
            return { EditQuoteSuccess: true, data: action.payload };

        case EDITQUOTE_FAILED:
            return { EditQuoteSuccess: false, error: action.payload };

        default:
            return state;

    }
}