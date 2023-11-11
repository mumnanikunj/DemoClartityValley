import { DELETEQUOTE_REQUEST } from "./types";

export const DeleteQuoteAction = (params) => {
    // console.log('DeleteQuoteAction',params)
  return  {
      type: DELETEQUOTE_REQUEST,
      params,  
  };
};
