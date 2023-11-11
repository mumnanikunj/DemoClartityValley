import { GETQUESTIONS_REQUEST } from "./types";

export const GetQuestionsAction = (params) => {
  // console.log("GetQuestions", params);
  return  {
      type: GETQUESTIONS_REQUEST,
      params,  
  };
};
