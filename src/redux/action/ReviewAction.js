import { REVIEW_REQUEST } from "./types";

export const ReviewAction = (params) => {
    // console.log('ReviewAction',params)
  return {
    type: REVIEW_REQUEST,
    params,
  };
};
