import { SELECTDURATION_REQUEST } from "./types";

export const SelectDurationAction = (params) => {
  console.log("SelectDurationAction", params);
  return  {
      type: SELECTDURATION_REQUEST,
      params,  
  };
};
