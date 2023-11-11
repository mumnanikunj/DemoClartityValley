import { EDITPROFILE_REQUEST } from "./types";

export const EditProfileAction = (params) => {
  // console.log("EitProfileaction Call", params);
  return {
    type: EDITPROFILE_REQUEST,
    params,
  };
};
