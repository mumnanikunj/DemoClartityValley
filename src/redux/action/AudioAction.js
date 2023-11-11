import { AUDIO_REQUEST } from "./types";

export const AudioAction = (params) => {
    // console.log('Audioparams',params)
  return  {
      type: AUDIO_REQUEST,
      params,  
  };
};
