import { DELETENOTE_REQUEST } from "./types";

export const DeleteNoteAction = (params) => {
  return  {
      type: DELETENOTE_REQUEST,
      params,  
  };
};
