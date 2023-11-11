import { ADDNOTE_REQUEST } from "./types";

export const AddNoteAction = (params) => {
  // console.log('AddNotesAction',params)
  return  {
      type: ADDNOTE_REQUEST,
      params,  
  };
};
