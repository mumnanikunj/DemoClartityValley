import { EDITQUOTE_REQUEST } from "./types";

export const EditQuoteAction = (params) => {
    // console.log('EditQuoteAction',params)
  return  {
      type: EDITQUOTE_REQUEST,
      params,  
  };
};
