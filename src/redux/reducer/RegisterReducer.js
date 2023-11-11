import { REGISTER_SUCCESS, REGISTER_FAILED } from "../action/types";

const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { RegisterSuccess: true, data: action.payload };

    case REGISTER_FAILED:
      return { RegisterSuccess: false, error: action.payload };

    default:
      return state;
  }
};
