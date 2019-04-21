import { combineReducers } from "redux";

import userReducer from "./userReducer";
import productReducer from "./productReducer";
import playerReducer from "./playerReducer";

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  player: playerReducer
});

export default rootReducer;
