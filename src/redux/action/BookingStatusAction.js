import { BOOKINGSTATUS_REQUEST } from "./types";

export const BookingStatusAction = (params) => {
  return  {
      type: BOOKINGSTATUS_REQUEST,
      params,  
  };
};
