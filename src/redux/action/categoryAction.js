import {UPDATE_CATEGORIES} from "../types";

export const setCategories = (data) => {
  return (dispatch) => {
    return dispatch({
      type: UPDATE_CATEGORIES,
      data: data
    });
  }
};
