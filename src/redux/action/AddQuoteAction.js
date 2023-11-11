import { ADDQUOTE_REQUEST } from "./types";

export const AddQuoteAction = (params) => {
    // console.log('AddQuoteAction',params)
  return  {
      type: ADDQUOTE_REQUEST,
      params,  
  };
};
