import { TRAINERREVIEW_SUCCESS, TRAINERREVIEW_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case TRAINERREVIEW_SUCCESS:
            return { TrainerReviewSuccess: true, data: action.payload };

        case TRAINERREVIEW_FAILED:
            return { TrainerReviewSuccess: false, error: action.payload };

        default:
            return state;

    }
}