import { VIEWMEDIA_REQUEST } from "./types";

export const ViewAction = (params) => {
  // console.log("ViewMediaAction", params);
  return  {
      type: VIEWMEDIA_REQUEST,
      params,  
  };
};
