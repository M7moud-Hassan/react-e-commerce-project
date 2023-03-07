import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import FilterUsersAction from "../../redux/actions/user/filterUsersAction";
import AllUsers from "./AllUsers";
import style from './login.module.css'

function Users() {
    const selector = useSelector(state=>state.filterUsers).length
    const [usersCount,setUsersCount]=useState(selector);
    // const usersCount=876;
    const[userDetails,setUserDetails]=useState({
        usernameOrEmail:"",
        role:"-1",
        isDeleted:"-1"
    });
    const userActiveStateList = [false,true];
    const userRoleList = ["user","admin"];
    let changeFilter = (e)=>{
        if(e.target.name=="role"){
            setUserDetails({...userDetails,role:e.target.value})
        }else if(e.target.name=="isDeleted"){
            setUserDetails({...userDetails, isDeleted:e.target.value})
        }else if(e.target.name=="usernameOrEmail"){
            setUserDetails({...userDetails, usernameOrEmail:e.target.value})
        }
    }

    const dispatch = useDispatch();
    // useEffect(()=>{
    //     dispatch(FilterUsersAction(userDetails))
    // },[]);
    useEffect(()=>{
        dispatch(FilterUsersAction(userDetails))
        setUsersCount(selector);
    },[])
    useEffect(()=>{
        setUsersCount(selector);
    })
    

    const search = ()=>{
        console.log(`role : ${userDetails.role} - isActive: ${userDetails.isDeleted} - username or Email ${userDetails.usernameOrEmail}`)
        if(userDetails.role != -1 || userDetails.isDeleted != -1 || userDetails.usernameOrEmail){
            dispatch(FilterUsersAction(userDetails))
        }else{
            dispatch(FilterUsersAction(userDetails))
        }
    }
    return (
        <div className="container">
            <div className="jumbotron jumbotron-fluid">
                <div className="container text-center text-capitalize pt-5">
                    <h1 className="display-4 fw-bolder ">Website Users</h1>
                    <p className="lead text-muted">As admin, you can discover, navigate and filter users, so that you can update user status and change user role from ordinary user to be admin in a the website , and many more ... </p>
                </div>
                <div className="row mt-5">
                    <div className="col-12 col-md-4 col-lg-4 text-center shadow p-2">
                        <h2 className="">Result</h2>
                        <p className="lead">{usersCount}</p>
                    </div>
                    <div className="col-12 col-md-8 col-lg-8">
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <select className="form-control" name="role" value={userDetails.role} onChange={(e)=>changeFilter(e)}>
                                        <option value="-1">Select User Role ...</option>
                                        {
                                            userRoleList.map((role,index)=><option key={index} value={role}>{role.toUpperCase()}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                            <select className="form-control" name="isDeleted" value={userDetails.isDeleted} onChange={(e)=>changeFilter(e)}>
                                        <option value="-1">Select User State ...</option>
                                        {
                                            userActiveStateList.map((state,index)=><option key={index} value={state}>{state?"In-Active":"Active"}</option>)
                                        }
                                    </select>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-6">
                                <input type="search" autoComplete="off" value={userDetails.usernameOrEmail} name="usernameOrEmail" placeholder="Search By Username or Email .." className="form-control" onChange={(e)=>changeFilter(e)}/> 
                            </div>
                            <div className="col-6">
                            <input type="button" onClick={()=>{search()}}  value="Search" className={`${style.formBtn} form-control`} />
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="m-5 mt-3"/>
                {/* <AllUsers filter={userDetails}/> */}
                <AllUsers />
            </div>
        </div>
    )
}
export default Users