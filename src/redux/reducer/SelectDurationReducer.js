import { SELECTDURATION_SUCCESS, SELECTDURATION_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case SELECTDURATION_SUCCESS:
            return { SelectDurationSuccess: true, data: action.payload };

        case SELECTDURATION_FAILED:
            return { SelectDurationSuccess: false, error: action.payload };

        default:
            return state;
    }
}