import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import style from './login.module.css'
import { axiosInstance } from '../../network/axiosInstance';
function Login() {
    const navigate = useNavigate();
    const genderList = ["Male","Female"];
    const[user,setUser]=useState({
        email:"",
        password:"",
        rememberMe:false
    })
    const[message,setMessage]=useState("");
    let changeUserData = (e)=>{
        if(e.target.name=='email'){
            setUser({...user,email:e.target.value});
        }else if(e.target.name=='password'){
            setUser({...user,password:e.target.value});
        }else{
            setUser({...user,rememberMe:!e.target.checked});
        }
    }
    let [passwordType,setPasswordType] = useState("password")
    let [passBtnKeyword,setPassBtnKeyword] = useState("Show");
    let passwordToggle = ()=>{
        let passElem = document.getElementById("password");
        passElem.type == "password"?setPasswordType("text"):setPasswordType("password");
        passElem.type == "password"?setPassBtnKeyword("Hide"):setPassBtnKeyword("Show");
    }
    let login = (e)=> {
        e.preventDefault();
        axiosInstance.get("/User")
        .then(res=>{
            let users = res.data;
            let foundedUser = users.find(u=>{
                return u.email == user.email && u.password == user.password;
            })
            if(foundedUser){
                setMessage("Login Successfully");
                user.rememberMe? localStorage.setItem("userId",foundedUser.id):sessionStorage.setItem("userId",foundedUser.id);
            }else{
                setMessage("# E-mail or password is incorrect");
            }
        })
        .catch(error=>{

        })
    }
    return (
        <div className={`d-flex h-100 ${style.registerBgColor}`}>
            <div className={`${style.loginPageSection} w-25`}></div>
            <div className={`w-50 m-auto mt-5 mb-5 pb-5 pt-3  `}>
                <div className={`w-100 m-auto ${style.formBgColor}  shadow  p-5 pt-5 mt-5  `}>
                <h3 className={`${style.resiterationHeader}  mb-3`}>Login Here ...</h3>
                <small className='d-block text-danger pt-2 pb-2'>{message}</small>
                    <form className={``} style={{color:'#340744'}} onSubmit={(e)=>login(e)} encType="multipart/form-data">
                        <div className='form-group mb-2'>
                            <label htmlFor='email'>E-mail</label>
                            <input type="email" placeholder="Enter Your E-mail Address" name='email' id='email' onChange={(e)=>changeUserData(e)} value={user.email} className={` form-control `} />
                            {/* <small className='d-block text-danger'>{userError.email}</small> */}
                        </div>
                        <div className="col-auto mb-2">
                            <label className="sr-only" htmlFor="password">Password</label>
                            <div className="input-group mb-2">
                                <input type={passwordType} name='password' id='password' placeholder="Enter Your password" onChange={(e)=>changeUserData(e)} value={user.password} className={` form-control `} />
                                <div className="input-group-prepend">
                                    <div className={`input-group-text ${style.btnLabel}`} onClick={()=>passwordToggle()} style={{cursor: "pointer"}}>{passBtnKeyword}</div>
                                </div>
                            </div>
                            {/* <small className='d-block text-danger'>{userError.password}</small> */}
                        </div>
                        <div className="form-check mt-3">
                            <input className={`form-check-input ${style.rememberMe}`} onChange={(e)=>changeUserData(e)}  type="checkbox" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">
                                Remember Me .
                            </label>
                        </div>
                        <div className='form-group mb-2 mt-3'>
                            <input type="submit" disabled={user.email.length==0 || user.password.length==0}  value="Create Account" className={`${style.formBtn} form-control`} />
                        </div>

                        <div className='d-flex mt-3'>
                        <div className='form-group w-50'>
                            Create Account, <NavLink to="/register" className="form-countrol text-decoration-none"> register Page</NavLink>
                        </div>
                        <div className='form-group w-50'>
                            May Be Later, <NavLink to="/" className="form-countrol text-decoration-none"> Go Home</NavLink>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login