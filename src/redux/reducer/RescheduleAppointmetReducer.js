import { RESCHEDULEAPPOINTMENT_SUCCESS, RESCHEDULEAPPOINTMENT_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case RESCHEDULEAPPOINTMENT_SUCCESS:
            return { RescheduleAppoinmentSuccess: true, data: action.payload };

        case RESCHEDULEAPPOINTMENT_FAILED:
            return { RescheduleAppoinmentSuccess: false, error: action.payload };

        default:
            return state;
    }
}