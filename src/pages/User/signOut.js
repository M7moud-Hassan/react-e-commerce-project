import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function SignOut(){
    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.removeItem("userId");
        sessionStorage.removeItem("userId");
        navigate("/login");
    },[])
    return 
}
export default SignOut;