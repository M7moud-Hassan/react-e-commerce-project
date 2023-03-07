import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../network/axiosInstance";
import FilterUsersAction from "../../redux/actions/user/filterUsersAction";
import UserCard from "./userCard";

function AllUsers(){
    const [users,setUsers]=useState(useSelector(state=>state.filterUsers));
    // console.log(props,"props")
    // console.log(users,"----------users")
    const filter = useSelector(state=>state.filterUsers);
    useEffect(()=>{
        setUsers(filter);
    });
    // useEffect(()=>{
    //     if(props.filter.role != -1 || props.filter.isDeleted != -1 || props.filter.usernameOrEmail != ""){
    //     axiosInstance.get("User")
    //     .then((res)=>{
    //         let usersResponse = res.data;
    //         if(props.filter.role != -1){
    //             usersResponse = usersResponse.filter(user=>user.role == props.filter.role);
    //         }
    //         else if(props.filter.isDeleted != -1){
    //             usersResponse = usersResponse.filter(user=>user.isDeleted == props.filter.isDeleted);
    //         }
    //         else if(props.filter.usernameOrEmail != ""){
    //             usersResponse = usersResponse.filter(user=>user.userName.includes(props.filter.usernameOrEmail) || user.email.includes(props.filter.usernameOrEmail));
    //         }
    //         setUsers(usersResponse);
    //     })
    // }else{
    //     // alert("No Filter")
       
    //         axiosInstance.get("User")
    //         .then((res)=>{
    //             let usersResponse = res.data;
    //             setUsers(usersResponse);
    //         })
    // }

    // },[]);

    //   console.log(users)
    return  <>
    {users.map((user,index) => <UserCard key={index} user={user}/>)}
    {/* {users.map((user,index) => <UserCard key={index}/>)} */}
    
    </>
}
export default AllUsers