import { TRAINER_REQUEST } from "./types";

export const TrainerAction = (params) => {
  // console.log("TrainerAction", params);
  return  {
      type: TRAINER_REQUEST,
      params,  
  };
};
