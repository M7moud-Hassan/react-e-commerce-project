import { combineReducers } from "redux";
import FilterUsersReducers from "./reducers/user/filterUsersReducers";
import isAdminReducer from "./reducers/user/isAdminReducer";

let rootReducer = combineReducers({
    isAdmin: isAdminReducer,
    filterUsers : FilterUsersReducers
});
export default rootReducer;