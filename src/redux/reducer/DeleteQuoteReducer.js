import { DELETEQUOTE_SUCCESS, DELETEQUOTE_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case DELETEQUOTE_SUCCESS:
            return { DeleteQuoteSuccess: true, data: action.payload };

        case DELETEQUOTE_FAILED:
            return { DeleteQuoteSuccess: false, error: action.payload };

        default:
            return state;

    }
}