import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../network/axiosInstance';
import style from './userProfile.module.css';

function UserProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [isUserChange, setIsUserChaged] = useState({
        image: false,
        password: false,
        phone: false
    })
    const [userError, setUserError] = useState({
        image: null,
        password: null,
        phone: null
    })
    useEffect(() => {
        axiosInstance.get(`User/${userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                alert("Error Occurs !");
            })
    }, []);
    let updateUserData = (e) => {
        if (e.target.name == 'phone') {
            let phoneValue = e.target.value.trim();
            setIsUserChaged({ ...isUserChange, phone: true });
            setUser({ ...user, phone: phoneValue });
            if (phoneValue.length == 0) {
                setUserError({ ...userError, phone: "Phone is required" })
            } else if (phoneValue.length < 11 || phoneValue.length > 11) {
                setUserError({ ...userError, phone: "Enter Valid Phone!" })
            } else {
                setUserError({ ...userError, phone: null })
            }
        } else if (e.target.name == 'image' && e.target.value.length) {
            let fileType = e.target.files[0].type;
            setIsUserChaged({ ...isUserChange, image: true });
            // setUser({...user,image:e.target.value});
            uploadImage(e);
            if (!(fileType === "image/jpeg" || fileType === "image/jpg" || fileType === "image/png")) {
                setUserError({ ...userError, image: "Valid Format Are jpg | jpeg | png" })
            } else {
                setUserError({ ...userError, image: null })
            }
        } else if (e.target.name == 'password') {
            let passValue = e.target.value;
            setIsUserChaged({ ...isUserChange, password: true });
            setUser({ ...user, password: passValue });
            if (passValue.trim().length < 6) {
                setUserError({ ...userError, password: "Password at least 6 characters !" });
            } else {
                setUserError({ ...userError, password: null });
            }
        }
    }
    function uploadImage(e) {
        const files = e.target.files;
        const file = files[0];
        getBase64(file);
    };
    function getBase64(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setUser({ ...user, image: reader.result });
        };
    };
    let [passwordType, setPasswordType] = useState("password")
    let [passBtnKeyword, setPassBtnKeyword] = useState("Show");
    let passwordToggle = () => {
        let passElem = document.getElementById("password");
        passElem.type == "password" ? setPasswordType("text") : setPasswordType("password");
        passElem.type == "password" ? setPassBtnKeyword("Hide") : setPassBtnKeyword("Show");
    }
    const isvalidForm = () => {
        if (!isUserChange.phone && !isUserChange.password ) {
            return false
        }
        if (userError.phone != null || userError.password != null) {
            return false;
        }
        return true;
    }
    const isImageChangedAndValid = ()=>{
        return isUserChange.image && userError.image == null; 
    }
    let saveNewImage = ()=>{
        if(isImageChangedAndValid()){
            axiosInstance.put(`User/${userId}`,{...user,image:user.image})
            .then(res=>{
                alert("Image Update SuccessFully");
                setIsUserChaged({...isUserChange,image:false});
                setUserError({...userError,image:null});
            })
            .catch(error=>{
                alert("Error Occurs !");
            })
        }
    }
    let saveChanges = ()=>{
        // if(isUserChange.phone || isUserChange.password && (userError.phone &&userError.password)){
        if(isvalidForm()){
            axiosInstance.put(`User/${userId}`,{...user,password:user.password,phone:user.phone})
            .then(res=>{
                alert("Update SuccessFully");
            })
            .catch(error=>{
                alert("Error Occurs !");
            })
        }
    }
    return (
        <>
            <div className={`${style.outerContainer} container-fluid`}>
                <div className='row g-0'>
                    <div className={`col-12 col-md-12 ${style.profileSection}`}>
                        <div className={`${style.profileHeader}`}>
                            <h3>Profile</h3>
                            <p>Manage your details, view your tier status and change your password .</p>
                        </div>
                        <div className='row'>
                            <div className='col-md-4'>
                                <img src={user.image} className={`${style.imageProfile}`} />
                                <div className={`${style.userNameEmailSection}`}>
                                    <div className={``}>{user.userName}</div>
                                    <div className={``}>{user.email}</div>
                                </div>
                            </div>
                            <div className='col-md-8'>
                                <div className={`${style.fieldSection}`}>
                                    <div className="col-auto mb-2">
                                        <label className="sr-only" htmlFor="phone">Update Phone Number</label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className={`${style.hintLabel} input-group-text`}>+20</div>
                                            </div>
                                            <input type="text" name='phone' id='phone' placeholder="Enter Your Phone Number" onChange={(e) => updateUserData(e)} value={user.phone} className={` ${isUserChange.phone == true && (userError.phone == null ? 'is-valid' : 'is-invalid')} form-control `} />
                                        </div>
                                        <small className='d-block text-danger'>{userError.phone}</small>
                                    </div>
                                    <div className='col-12'>
                                        <div className="col-auto mb-2">
                                            <label className="sr-only" htmlFor="password">change Password</label>
                                            <div className="input-group mb-2">
                                                <input type={passwordType} name='password' id='password' placeholder="Enter Your password" onChange={(e) => updateUserData(e)} value={user.password} className={` ${isUserChange.password == true && (userError.password == null ? 'is-valid' : 'is-invalid')} form-control `} />
                                                <div className="input-group-prepend">
                                                    <div className={`input-group-text ${style.btnLabel}`} onClick={() => passwordToggle()} style={{ cursor: "pointer" }}>{passBtnKeyword}</div>
                                                </div>
                                            </div>
                                            <small className='d-block text-danger'>{userError.password}</small>
                                        </div>
                                    </div>
                                    <input type="button" disabled={!isvalidForm()}  className={`form-control mt-5 ${style.saveChangeButton}`} value="Save Changes" onClick={()=>{saveChanges()}} />
                                </div>
                                <div className={`${style.fieldSection}`}>
                                    <div className='row'>
                                        <div className='col-12 col-md-8'>
                                            <div className='form-group p-1'>
                                                <label htmlFor='image'>Update your image</label>
                                                <input type="file" name='image' id='image' onChange={(e) => updateUserData(e)} className={` ${isUserChange.image == true && (userError.image == null ? 'is-valid' : 'is-invalid')} form-control `} />
                                                <small className='d-block text-danger'>{userError.image}</small>
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-4'>
                                            <div className='form-group p-1'>
                                                <label htmlFor='gender'>Your Gender</label>
                                                <input type="text" name='gender' id='gender' value={user.gender} readOnly className={`form-control`} />
                                            </div>
                                        </div>
                                    </div>
                                    <input type="button" disabled={!isImageChangedAndValid()}  className={`form-control mt-5 ${style.saveChangeButton}`} value="change Image" onClick={()=>{saveNewImage()}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
// {user.id}
//                     {user.userName}
//                     {user.phone}
//                     {user.password}
export default UserProfile
