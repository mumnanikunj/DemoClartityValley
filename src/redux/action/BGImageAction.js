import { BGIMAGE_REQUEST } from "./types";

export const BGImageAction = (params) => {
  return  {
      type: BGIMAGE_REQUEST,
      params,  
  };
};
