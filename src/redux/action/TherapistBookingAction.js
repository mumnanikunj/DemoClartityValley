import { BOOKINGTHERAPIST_REQUEST } from "./types";

export const  TherapistBookingAction = (params) => {
  // console.log("TrainerAction", params);
  return  {
      type: BOOKINGTHERAPIST_REQUEST,
      params,  
  };
};
