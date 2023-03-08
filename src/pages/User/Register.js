import { useState } from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import { axiosInstance } from '../../network/axiosInstance';
import style from './login.module.css'
function Register() {
    const navigate = useNavigate();
    const genderList = ["Male","Female"];
    const[message,setMessage]=useState("");
    const[user,setUser]=useState({
        userName:"",
        gender:"none",
        email:"",
        image:"",
        password:"",
        confirmPassword:"",
        phone:"",
        role:"user",
        isDeleted:false
    })
    const[isUserChange,setIsUserChaged]=useState({
        userName:false,
        gender:false,
        email:false,
        image:false,
        password:false,
        confirmPassword:false,
        phone:false,
    })
    const[userError,setUserError]=useState({
        userName:null,
        gender:null,
        email:null,
        image:null,
        password:null,
        confirmPassword:null,
        phone:null,
    })
    let changeUserData = (e)=>{
        if(e.target.name=='username'){
            let userNameValue = e.target.value.trim();
            setIsUserChaged({...isUserChange,userName:true});
            setUser({...user,userName:userNameValue});
            if(userNameValue.length==0){
                setUserError({...userError,userName:"Username is required"})
            }else if(userNameValue.length<5){
                setUserError({...userError,userName:"Username is must be more than 5 letters"})
            }else if(userNameValue.length>50){
                setUserError({...userError,userName:"Username is must be less than 50 letters"})
            }else{
                setUserError({...userError,userName:null})
            }
        }else if(e.target.name=='email'){
            let emailValue = e.target.value.trim();
            setIsUserChaged({...isUserChange,email:true});
            setUser({...user,email:emailValue});
            if(emailValue.length==0){
                setUserError({...userError,email:"Email is required"})
            }else if(!emailValue.includes("@") || !emailValue.includes(".") || emailValue.length<10){
                setUserError({...userError,email:"Enter Valid Email!"})
            }else{
                setUserError({...userError,email:null})
            }
        }
        else if(e.target.name=='phone'){
            let phoneValue = e.target.value.trim();
            setIsUserChaged({...isUserChange,phone:true});
            setUser({...user,phone:phoneValue});
            if(phoneValue.length==0){
                setUserError({...userError,phone:"Phone is required"})
            }else if(phoneValue.length<11 || phoneValue.length>11){
                setUserError({...userError,phone:"Enter Valid Phone!"})
            }else{
                setUserError({...userError,phone:null})
            }
        }
        else if(e.target.name=='image' && e.target.value.length){
            let fileType = e.target.files[0].type;
            setIsUserChaged({...isUserChange,image:true});
            // setUser({...user,image:e.target.value});
            uploadImage(e);
            if(!(fileType === "image/jpeg" || fileType === "image/jpg" || fileType === "image/png")){
                setUserError({...userError,image:"Valid Format Are jpg | jpeg | png"})
            }else{
                setUserError({...userError,image:null})
            }
        }else if(e.target.name=='gender'){
            let genderValue = e.target.value; 
            setIsUserChaged({...isUserChange,gender:true});
            setUser({...user,gender:genderValue});
            if(genderValue == -1){
                setUserError({...userError,gender:"You Must Choose Gender !"});
            }else{
                setUserError({...userError,gender:null});
            }
        }
        else if(e.target.name=='password'){
            let passValue = e.target.value; 
            setIsUserChaged({...isUserChange,password:true});
            setUser({...user,password:passValue});
            if(passValue.trim().length<6){
                setUserError({...userError,password:"Password at least 6 characters !"});
            }else{
                setUserError({...userError,password:null});
            }
        }
        else if(e.target.name=='confirmPassword'){
            let confirmPasswordValue = e.target.value; 
            setIsUserChaged({...isUserChange,confirmPassword:true});
            setUser({...user,confirmPassword:confirmPasswordValue});
            // if(confirmPasswordValue.trim().length<6){
            //     setUserError({...userError,confirmPassword:"Confirm password at least 6 characters !"});
            // }
            // if(userError.password==null && isUserChange.password==true && user.password!==user.confirmPassword){
            //     setUserError({...userError,confirmPassword:"Confirm password must match password!"});
            // }
            // else if(userError.password==null && isUserChange.password==true && user.password==user.confirmPassword){
            //     setIsUserChaged({...isUserChange,confirmPassword:true});
            //     setUserError({...userError,confirmPassword:null});
            // }
            // else{
            //     setUserError({...userError,confirmPassword:null});
            //     setIsUserChaged({...isUserChange,confirmPassword:false});
            // }
        }
    }
    function uploadImage( e) {
        const files = e.target.files;
        const file = files[0];
        getBase64(file);
      };
      function getBase64 (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
           setUser({...user,image: reader.result});
        };
      };
    const isvalidForm = () => {
        if(!isUserChange.userName || !isUserChange.email || !isUserChange.phone 
            || !isUserChange.password || !isUserChange.confirmPassword  ||  !isUserChange.gender ||  !isUserChange.image ){
            return false
        }
        if(userError.userName!=null || userError.email!=null  || userError.phone!=null  
            || userError.password!=null || userError.gender!=null ||  userError.image!=null ){
            return false;
        }
        return true;
    }
    let [passwordType,setPasswordType] = useState("password")
    let [passBtnKeyword,setPassBtnKeyword] = useState("Show");
    let passwordToggle = ()=>{
        let passElem = document.getElementById("password");
        passElem.type == "password"?setPasswordType("text"):setPasswordType("password");
        passElem.type == "password"?setPassBtnKeyword("Hide"):setPassBtnKeyword("Show");
    }
    let [confirmPasswordType,setconfirmPasswordType] = useState("password")
    let [confirmPassBtnKeyword,setconfirmPassBtnKeyword] = useState("Show");
    let confirmPasswordToggle = ()=>{
        let passElem = document.getElementById("confirmPassword");
        passElem.type == "password"?setconfirmPasswordType("text"):setconfirmPasswordType("password");
        passElem.type == "password"?setconfirmPassBtnKeyword("Hide"):setconfirmPassBtnKeyword("Show");
    }

    let register = (e) => {
        e.preventDefault();
        if(user.password==user.confirmPassword){
        axiosInstance.get("User")
            .then(res => {
                let emailIsExists = res.data.find(currentUser =>{return currentUser.email == user.email});
                console.log("_______________________________________________");
                console.log(res.data);
                console.log(emailIsExists,"boolean");
                if (emailIsExists) {
                    setMessage("#  Email Already Exists !");
                } 
                else {
                    axiosInstance.post("User", user)
                        .then(response => {
                            alert("Register Done !");
                            navigate('/login')
                        })
                        .catch(error => alert("Error"))    
                }
            })
            .catch(error=> alert("Error !"));
        }else{
            alert("password and confirm not matched")
        }
    }
    return (
        <div className={`d-flex  h-100 ${style.registerBgColor}`}>
            <div className={`${style.loginPageSection} w-25`}></div>
            <div className={`w-50 m-auto mt-0 pt-3 pb-3 `}>
                <div className={`w-100 m-auto ${style.formBgColor}  shadow  p-4 pt-5 pb-5  `}>
                <h3 className={`${style.resiterationHeader} `}>Create Your Account Free ....</h3>
                <small className='d-block text-danger pt-2 pb-2'>{message}</small>
                    <form className={``} style={{color:'#340744'}} onSubmit={(e)=>register(e)} encType="multipart/form-data">
                        <div className='form-group mb-2 mt-3'>
                            <label htmlFor='username'>Username</label>
                            <input type="text" placeholder="Enter Username" name='username' id='username' onChange={(e)=>changeUserData(e)} value={user.userName} className={` ${isUserChange.userName==true && (userError.userName==null ? 'is-valid':'is-invalid') } form-control `} />
                            <small className='d-block text-danger'>{userError.userName}</small>
                        </div>
                        <div className='form-group mb-2'>
                            <label htmlFor='email'>E-mail</label>
                            <input type="email" name='email' placeholder="Enter Your E-mail Address" id='email' onChange={(e)=>changeUserData(e)} value={user.email} className={` ${isUserChange.email==true && (userError.email==null ? 'is-valid':'is-invalid') } form-control `} />
                            <small className='d-block text-danger'>{userError.email}</small>
                        </div>
                        <div className="col-auto mb-2">
                            <label className="sr-only" htmlFor="phone">Phone</label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className={`${style.hintLabel} input-group-text`}>+20</div>
                                </div>
                                <input type="text" name='phone' id='phone' placeholder="Enter Your Phone Number" onChange={(e)=>changeUserData(e)} value={user.phone} className={` ${isUserChange.phone==true && (userError.phone==null ? 'is-valid':'is-invalid') } form-control `} />
                            </div>
                            <small className='d-block text-danger'>{userError.phone}</small>
                        </div>


                        <div className='d-flex mb-2'>
                        <div className='form-group w-50 p-1'>
                            <label htmlFor='image'>Choose your image</label>
                            <input type="file" name='image' id='image' onChange={(e)=>changeUserData(e)}  className={` ${isUserChange.image==true && (userError.image==null ? 'is-valid':'is-invalid') } form-control `} />
                            <small className='d-block text-danger'>{userError.image}</small>
                        </div>
                        <div className='form-group w-50 p-1'>
                            <label htmlFor='gender'>Select your gender</label>
                            <select name='gender' id='gender' onChange={(e)=>changeUserData(e)} value={user.gender} className={` ${isUserChange.gender==true && (userError.gender==null ? 'is-valid':'is-invalid') } form-control `}>
                                <option value="-1">Select Your Gender ...</option>
                                    {
                                        genderList.map(
                                            (gen, index) =>  <option key={index} value={gen}>{gen}</option>)
                                    }
                            </select>
                            <small className='d-block text-danger'>{userError.gender}</small>
                        </div>
                        </div>



                        <div className="col-auto mb-2">
                            <label className="sr-only" htmlFor="password">Password</label>
                            <div className="input-group mb-2">
                                <input type={passwordType} name='password' id='password' placeholder="Enter Your password" onChange={(e)=>changeUserData(e)} value={user.password} className={` ${isUserChange.password==true && (userError.password==null ? 'is-valid':'is-invalid') } form-control `} />
                                <div className="input-group-prepend">
                                    <div className={`input-group-text ${style.btnLabel}`}onClick={()=>passwordToggle()} style={{cursor: "pointer"}}>{passBtnKeyword}</div>
                                </div>
                            </div>
                            <small className='d-block text-danger'>{userError.password}</small>
                        </div>

                        <div className="col-auto mb-2">
                            <label className="sr-only" htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-group mb-2">
                                <input type={confirmPasswordType} name='confirmPassword' id='confirmPassword' placeholder="Confirm Your password" onChange={(e)=>changeUserData(e)} value={user.confirmPassword} className={`form-control`} />
                                <div className="input-group-prepend">
                                    <div className={`input-group-text ${style.btnLabel}`}onClick={()=>confirmPasswordToggle()} style={{cursor: "pointer"}}>{passBtnKeyword}</div>
                                </div>
                            </div>
                            <small className='d-block text-danger'>{userError.confirmPassword}</small>
                        </div>

                        <div className='form-group mb-2 mt-3'>
                            <input type="submit" disabled={!isvalidForm()} value="Create Account" className={`${style.formBtn} form-control`} />
                        </div>

                        <div className='d-flex mt-3'>
                        <div className='form-group w-50'>
                            Already have Account, <NavLink to="/login" className="form-countrol text-decoration-none"> Login Page</NavLink>
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
export default Register