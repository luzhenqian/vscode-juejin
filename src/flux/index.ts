import { Action, Dispatch, Reducer } from "../types";

export function createDispatch(reducer: Reducer) {
  function dispatch(action: Action) {
    reducer(action, dispatch);
  }
  return dispatch;
}

export function combineReducers(...reducers: Reducer[]) {
  return (action: Action, dispatch: Dispatch) =>
    reducers.forEach((reducer) => reducer(action, dispatch));
}
