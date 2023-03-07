function FilterUsersReducers(state = [], action){
    if(action.type=="FILTER_USRS"){
        console.log(action.payload,"payload in reducer")
        return action.payload;
    }
    return state;
}
export default FilterUsersReducers