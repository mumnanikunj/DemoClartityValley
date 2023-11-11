import { GETQUOTE_SUCCESS, GETQUOTE_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case GETQUOTE_SUCCESS:
            return { GetQuoteSuccess: true, data: action.payload };

        case GETQUOTE_FAILED:
            return { GetQuoteSuccess: false, error: action.payload };

        default:
            return state;

    }
}