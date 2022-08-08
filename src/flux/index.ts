import { Action, Reducer } from "../types";

export function createDispatch(reducer: (action: Action) => any) {
  function dispatch(action: Action) {
    reducer(action);
  }
  return dispatch;
}

export function combineReducers(reducers: Reducer[]) {
  return (action: Action) => reducers.forEach((reducer) => reducer(action));
}
