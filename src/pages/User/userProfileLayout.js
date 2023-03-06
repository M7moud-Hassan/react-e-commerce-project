import { Link, Outlet, Route, Routes, useNavigate, useParams } from "react-router-dom"
import HomeLayout from "../../layouts/homeLayout"
import Login from "./login"
import Register from "./Register"
import UserProfile from "./userProfile"
import style from './profileLayout.module.css';
import { useEffect, useState } from "react"

function UserProfileLayout() {
    const [id,setId]=useState();
    let navigate = useNavigate();
    
    useEffect(()=>{
        setId(
            localStorage.getItem("userId")!=undefined ?
             localStorage.getItem("userId"):
             (sessionStorage.getItem("userId")!=undefined?sessionStorage.getItem("userId"):100)
             );
        // alert(`id = ${id}`)
        if(+id>10){
            navigate(`profile/${id}`);
        }else{
            navigate(`login`);
        }
    },[]);
    return (
        <>
            <div className={`container-fluid ${style.outerContainer}`}>
                <div className={`row  g-0`}>
                    <div className="col-12 col-md-3">
                        <div className={`${style.linksSection}`}>
                        <Link className={`${navData=>navData.isActive ?  style.redLeftBorder :'is-inactive'} ${style.navLink} ${style.sideLink}`} to="home">Wishlist</Link>
                        <Link className={`${style.navLink} ${style.sideLink}`} to="login">Orders</Link>
                        <Link className={`${style.navLink} ${style.sideLink}`} to="register">Card</Link>
                        <Link className={`${style.navLink} ${style.sideLink}`} to={`profile/${id}`}>Profile</Link>
                        </div>
                    </div>
                    <div className="col-12 col-md-9">
                        <Routes>
                            <Route path="profile/:userId" element={<UserProfile />} />
                            <Route path="home" element={<HomeLayout />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserProfileLayout