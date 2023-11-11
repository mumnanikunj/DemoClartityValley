import { GETQUESTIONS_SUCCESS, GETQUESTIONS_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case GETQUESTIONS_SUCCESS:
            return { GetQuestionsSuccess: true, data: action.payload };

        case GETQUESTIONS_FAILED:
            return { GetQuestionsSuccess: false, error: action.payload };

        default:
            return state;

    }
}