import { SUBCATEGORY_REQUEST } from "./types";

export const SubCateGoryAction = (params) => {
  // console.log("SubCateGoryAction", params);
  return  {
      type: SUBCATEGORY_REQUEST,
      params,  
  };
};
