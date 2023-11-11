import { EXPLORETOPIC_REQUEST } from "./types";

export const ExploreAction = (params) => {
    // console.log('ExploreTopicAction',ExploreAction)
  return  {
      type: EXPLORETOPIC_REQUEST,
      params,  
  };
};
