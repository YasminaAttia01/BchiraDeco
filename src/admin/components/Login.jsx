import React, { useContext, useEffect, useState } from "react";
import axiosConfig from "../../utils/AxiosConfig";
import { authStore } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import image from "../../assets/apropos4.png";

function Login() {
  const { auth, setAuth } = useContext(authStore);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/dashbordAdmin");
    }
  }, [auth]);
  const hundleLogin = (e) => {
    e.preventDefault();
    toast.promise(
      axiosConfig.post("/login", user).then((res) => {

          setAuth(res.data.data);
          navigate("/dashbordAdmin");
        
      }),
      {
        pending:"loading",
        error:"some thing want wrong"
      }
    );
  };
  return (
    <div className="login-admin">
      <form>
        <header>
          <h2>LOGIN</h2>
          <p>
            Veuillez saisir vos identifiants pour accéder à l'interface
            administrateur.
          </p>
        </header>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="">Password</label>
          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div>
          <button onClick={hundleLogin}>submit</button>
        </div>
      </form>
      <img src={image} alt="" />
    </div>
  );
}

export default Login;
