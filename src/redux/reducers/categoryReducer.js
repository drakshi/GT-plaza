import { UPDATE_CATEGORIES } from "../types";

let cloneObject = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};

let initialState = { get_categories: [] };

export default function CategoryReducer(state,action)
{
  switch (action.type){
    case UPDATE_CATEGORIES:
      initialState = cloneObject(state);
      if (action.data !== null) {
        initialState = Object.assign({}, initialState, {
          ...state,
          get_categories: action.data ? action.data : [],
        });
      }

      return initialState;

    default:
      return state || initialState
  }
}
