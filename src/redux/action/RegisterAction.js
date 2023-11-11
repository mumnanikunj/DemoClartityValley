import { REGISTER_REQUEST } from "./types";

export const RegisterAction = (params) => {
  return {
    type: REGISTER_REQUEST,
    params,
  };
};
