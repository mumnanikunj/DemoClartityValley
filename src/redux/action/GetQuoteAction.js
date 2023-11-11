import { GETQUOTE_REQUEST } from "./types";

export const GetQuoteAction = (params) => {
  // console.log("GetQuoteAction", params);
  return  {
      type: GETQUOTE_REQUEST,
      params,  
  };
};
