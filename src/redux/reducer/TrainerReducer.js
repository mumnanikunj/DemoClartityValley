import { TRAINER_SUCCESS, TRAINER_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case TRAINER_SUCCESS:
            return { TrainerSuccess: true, data: action.payload };

        case TRAINER_FAILED:
            return { TrainerSuccess: false, error: action.payload };

        default:
            return state;

    }
}