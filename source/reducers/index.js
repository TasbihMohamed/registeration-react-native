import { combineReducers } from "redux";
import {
  // app,
  specializationsReducer,
  governoratesReducer,
  citiesReducer,
  joinRequestReducer,
  verifyRegisterationReducer,
  checkVerificationReducer,
  passwordReducer,
} from "../reducers/app";

const rootReducer = combineReducers({
  // app,
  specializationsReducer,
  governoratesReducer,
  citiesReducer,
  joinRequestReducer,
  verifyRegisterationReducer,
  checkVerificationReducer,
  passwordReducer,
});

export default rootReducer;
