import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import api from '../apis/contacts';
import useAuth from "./useAuth";
import "./login.css";

function Login() {
    const {setAuth} = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const navigation = useNavigate();
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  useEffect(() => {
    setErrorMessages({})
  }, [user,pwd]) 

  const handleSubmit = async(event) => {
    //Prevent page reload
    event.preventDefault();
    var { uname, pass } = document.forms[0];
    let username = uname.value;
    let password = pass.value;
    // Find user login info
    try {
      const response = await api.post('/auth/post', JSON.stringify({username,password}),
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: false
        }
        );
        const user_name = response?.data?.name;
        uname.value ='';
        pass.value = '';
        setAuth({user_name});
        navigation(from, {replace: true});
    } catch (error) {
      if(!error?.response){
        setErrorMessages({ name: "pass", message: errors.pass });
      }else if (error.response?.status == 401){
        setErrorMessages({ name: "pass", message: errors.pass });
      }
    }

    // Compare user info
    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     console.log(location.state.from.pathname);
    //     login();
    //     navigation(location.state.from.pathname);
    //   }
    // } else {
    //   // Username not found
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required onChange={(e)=> setUser(e.target.value)} />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required onChange={(e)=> setPwd    (e.target.value)} />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
}

export default Login;
