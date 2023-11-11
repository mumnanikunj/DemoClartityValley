import { EDITPROFILE_SUCCESS, EDITPROFILE_FAILED } from "../action/types";

const INTIAL_STATE = {}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case EDITPROFILE_SUCCESS:
            return { EditProfileSuccess: true, data: action.payload };

        case EDITPROFILE_FAILED:
            return { EditProfileSuccess: false, error: action.payload };

        default:
            return state;

    }
}