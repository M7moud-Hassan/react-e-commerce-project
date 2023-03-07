import { axiosInstance } from "../../../network/axiosInstance"

const FilterUsersAction = (userDetails)=>dispatch=>{
    return axiosInstance.get("User")
    .then((user)=>{
        // console.log(user.data)
        let usersResponse = user.data;
        console.log(usersResponse,"rsponse before filteration");
        console.log("----------------------------------------");
            if(userDetails.role != -1){
                usersResponse = usersResponse.filter(user=>user.role == userDetails.role);
                console.log(usersResponse,"Role");
            }
             if(JSON.parse(userDetails.isDeleted)==true || JSON.parse(userDetails.isDeleted) == false){
                console.log(userDetails.isDeleted,"isDeleted");
                usersResponse = usersResponse.filter(user=>user.isDeleted == JSON.parse(userDetails.isDeleted));
                console.log(usersResponse,"isDeleted");
            }
             if(userDetails.usernameOrEmail.length>0){
                usersResponse = usersResponse.filter(user=>user.userName.toLowerCase().includes(userDetails.usernameOrEmail.toLowerCase()) || user.email.toLowerCase().includes(userDetails.usernameOrEmail.toLowerCase()));
                console.log(usersResponse,"usernameOrEmail");
            }else{
                console.log("No filter Data Sent !")
            }
            console.log("User Action fired --------");
            console.log(usersResponse);
        return dispatch({
        type:"FILTER_USRS",
        payload:usersResponse
    })})
    .catch(error=>{
        // alert("Error from filter action");
        console.log("Error from filter action"+"_____________"+error);
    })
}
export default FilterUsersAction