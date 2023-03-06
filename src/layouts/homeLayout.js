import {useEffect,useState} from 'react';
import { axiosInstance } from '../network/axiosInstance';
function HomeLayout(){
    const[image,setImage]=useState("");
    useEffect(()=>{
        axiosInstance.get("User/7")
        .then(res=>{
            setImage(res.data.image);
        })
        
    },[])
    return(
        <>
        <h1>HomeLayout Page Works</h1>
        <img src={image} width="300" height="300"/>
        </>
    )
}
export default HomeLayout