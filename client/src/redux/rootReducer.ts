import { combineReducers } from "redux";
import { alertReducer } from "./alertReducer";
import { todoReducer } from "./todoReducer";

export const rootReducer = combineReducers({
  todoReducer,
  alertReducer
});
