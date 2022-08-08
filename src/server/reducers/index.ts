import { combineReducers } from "../../flux";
import { reducer as postReducer } from "./post";

export const reducers = combineReducers([postReducer]);
