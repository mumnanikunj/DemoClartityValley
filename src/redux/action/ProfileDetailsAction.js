import { PROFILEDETAILS_REQUEST } from "./types";

export const ProfileDetailsAction = (params) => {
  return {
    type: PROFILEDETAILS_REQUEST,
    params,
  };
};
