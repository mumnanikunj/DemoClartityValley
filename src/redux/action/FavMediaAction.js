import { FAVMEDIALIST_REQUEST } from "./types";

export const FavMediaAction = (params) => {
    // console.log('FavMEdiaListAction',params)
  return  {
      type: FAVMEDIALIST_REQUEST,
      params,  
  };
};
