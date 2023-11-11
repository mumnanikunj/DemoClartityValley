import { ADDQUOTE_SUCCESS, ADDQUOTE_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case ADDQUOTE_SUCCESS:
            return { AddQuoteSuccess: true, data: action.payload };

        case ADDQUOTE_FAILED:
            return { AddQuoteSuccess: false, error: action.payload };

        default:
            return state;

    }
}