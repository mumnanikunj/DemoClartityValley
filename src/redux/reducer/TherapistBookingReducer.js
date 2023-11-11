import { BOOKINGTHERAPIST_SUCCESS, BOOKINGTHERAPIST_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case BOOKINGTHERAPIST_SUCCESS:
            return { BookingTherapistSuccess: true, data: action.payload };

        case BOOKINGTHERAPIST_FAILED:
            return { BokoingTherapistSuccess: false, error: action.payload };

        default:
            return state;

    }
}