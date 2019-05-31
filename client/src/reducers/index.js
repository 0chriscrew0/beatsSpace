import { combineReducers } from "redux";

import userReducer from "./userReducer";
import productReducer from "./productReducer";
import playerReducer from "./playerReducer";
import siteReducer from "./siteReducer";

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  player: playerReducer,
  site: siteReducer
});

export default rootReducer;
