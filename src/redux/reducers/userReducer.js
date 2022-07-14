import { UPDATE_USER_INFO} from "../types";

let cloneObject = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};

let initialState = { logged_user_info: null };

export default function UserReducer(state,action)
{
  switch (action.type){
    case UPDATE_USER_INFO:
      initialState = cloneObject(state)
      if (action.data !== null) {
        initialState = Object.assign({}, initialState, {
          ...state,
          logged_user_info: action.data ? action.data : [],
        });
      }
      return initialState;

    default:
      return state || initialState
  }
}
