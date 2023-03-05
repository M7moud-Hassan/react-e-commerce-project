let isAdminReducer= (state=false,action)=>{
    if(action.type=="IS_ADMIN"){
        state = action.payload
    }
    return state;
}
export default isAdminReducer