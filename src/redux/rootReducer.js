import { combineReducers } from "redux";
import isAdminReducer from "./reducers/user/isAdminReducer";

let rootReducer = combineReducers({
    isAdmin: isAdminReducer
});
export default rootReducer;