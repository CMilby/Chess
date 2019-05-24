import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { systemReducer } from "./system/reducers";
import { modalReducer } from "./modal/reducers";

const rootReducer = combineReducers({
  system: systemReducer,
  modal: modalReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  return createStore(rootReducer, applyMiddleware(...middlewares));
}
