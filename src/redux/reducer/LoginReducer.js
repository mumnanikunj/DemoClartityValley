import { LOGIN_SUCCESS, LOGIN_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { LoginSuccess: true, data: action.payload };

        case LOGIN_FAILED:
            return { LoginSuccess: false, error: action.payload };

        default:
            return state;

    }
}