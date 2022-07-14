import {UPDATE_USER_INFO,MULTI_IMAGES} from "../types";

export const setUserInfo = (data) => {
  return (dispatch) => {
    return dispatch({
      type: UPDATE_USER_INFO,
      data: data
    });
  }
};


export const addImages = (data) => {
  return (dispatch) => {
    return dispatch({
      type: MULTI_IMAGES,
      data:data
    });
  }
};