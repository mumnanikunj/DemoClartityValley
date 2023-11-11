import { PROFILEDETAILS_SUCCESS, PROFILEDETAILS_FAILED } from "../action/types";

const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case PROFILEDETAILS_SUCCESS:
      return { LoginSuccess: true, data: action.payload };

    case PROFILEDETAILS_FAILED:
      return { LoginSuccess: false, error: action.payload };

    default:
      return state;
  }
};
