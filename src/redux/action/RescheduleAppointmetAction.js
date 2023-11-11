import { RESCHEDULEAPPOINTMENT_REQUEST } from "./types";

export const RescheduleAppoinmentAction = (params) => {
  return {
    type: RESCHEDULEAPPOINTMENT_REQUEST,
    params,
  };
};
