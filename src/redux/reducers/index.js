import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import CategoryReducer from "./categoryReducer";
import ImageReducer from "./imageReducer";

const appReducer = combineReducers({
  UserReducer: UserReducer,
  CategoryReducer: CategoryReducer,
  ImageReducer : ImageReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
