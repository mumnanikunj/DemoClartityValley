import { VIDEOLIST_REQUEST } from "./types";

export const VideoAction = (params) => {
  // console.log("VideoAction", params);
  return  {
      type: VIDEOLIST_REQUEST,
      params,  
  };
};
