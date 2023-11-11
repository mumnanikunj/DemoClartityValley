import { TRAINERREVIEW_REQUEST } from "./types";

export const TrainerReviewAction = (params) => {
  // console.log("TrainerReviewAction", params);
  return  {
      type: TRAINERREVIEW_REQUEST,
      params,  
  };
};
