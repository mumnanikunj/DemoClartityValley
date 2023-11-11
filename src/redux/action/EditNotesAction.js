import { EDITNOTES_REQUEST } from "./types";

export const EditNotesAction = (params) => {
  return  {
      type: EDITNOTES_REQUEST,
      params,  
  };
};
