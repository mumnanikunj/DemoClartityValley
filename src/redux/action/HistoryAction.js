import { HISTORY_REQUEST } from "./types";

export const HistoryAction = (params) => {
  // console.log("HistoryAction", params);
  return  {
      type: HISTORY_REQUEST,
      params,  
  };
};
