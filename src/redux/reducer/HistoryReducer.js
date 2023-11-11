import { HISTORY_SUCCESS, HISTORY_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case HISTORY_SUCCESS:
            return { HistorySuccess: true, data: action.payload };

        case HISTORY_FAILED:
            return { HistorySuccess: false, error: action.payload };

        default:
            return state;

    }
}