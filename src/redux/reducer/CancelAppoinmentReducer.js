import { CANCELAPPOINTMENT_SUCCESS, CANCELAPPOINTMENT_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case CANCELAPPOINTMENT_SUCCESS:
            return { CancelAppointmnetSuccess: true, data: action.payload };

        case CANCELAPPOINTMENT_FAILED:
            return { CancelAppointmnetSuccess: false, error: action.payload };

        default:
            return state;

    }
}   