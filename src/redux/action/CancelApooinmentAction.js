import { CANCELAPPOINTMENT_REQUEST } from "./types";

export const CancelApooinmentAction = (params) => {
  return  {
      type: CANCELAPPOINTMENT_REQUEST,
      params,  
  };
};
