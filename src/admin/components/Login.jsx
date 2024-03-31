import React, { useContext, useEffect, useState } from "react";
import axiosConfig from "../../utils/AxiosConfig";
import { authStore } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
    const {auth,setAuth}=useContext(authStore)
  const [user, setUser] = useState({});
const navigate=useNavigate()


useEffect(()=>{
    if(auth){
        navigate('/dashbordAdmin')  }
},[auth])
  const hundleLogin = (e) => {
    e.preventDefault();
    axiosConfig.post("/login", user).then((res)=>{
if(res.data.status==="success"){
setAuth(res.data.data)
navigate('/dashbordAdmin')

}
else{
    console.log("eerrrr");
    toast.error('sothing went Wrong')
}



    }).catch((err)=>{    
        console.log(err);
        toast.error('sothing went Wrong')
    })
  };
  return (
    <div className="login-admin">
      <form onSubmit={hundleLogin}>
        <div>
        <label htmlFor="">Email</label>
        <input
          type="email"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        /></div>
      <div> <label htmlFor="">Password</label>
        <input
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        /></div> 
        <input type="submit" />
      </form>
    </div>
  );
}

export default Login;
