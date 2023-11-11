import { EXPLORETOPIC_SUCCESS, EXPLORETOPIC_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case EXPLORETOPIC_SUCCESS:
            return { ExploreTopicSuccess: true, data: action.payload };

        case EXPLORETOPIC_FAILED:
            return { ExploreTopicSuccess: false, error: action.payload };

        default:
            return state;

    }
}       