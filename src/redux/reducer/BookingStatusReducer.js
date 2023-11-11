import { BOOKINGSTATUS_SUCCESS, BOOKINGSTATUS_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case BOOKINGSTATUS_SUCCESS:
            return { BookingStatusSuccess: true, data: action.payload };

        case BOOKINGSTATUS_FAILED:
            return { BookingStatusSuccess: false, error: action.payload };

        default:
            return state;

    }
}   