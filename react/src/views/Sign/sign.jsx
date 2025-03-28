import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/sign.css";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { notify } from "../../assets/js/utils.jsx";
import {Input}  from "antd";


export default function Sign() {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const {setUser, setToken, setUserType} = useStateContext();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");


    /**
     * Refs
     */
    const fnameRef = useRef(null);
    const mnameRef = useRef(null);
    const lnameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);



    /**
     * Handlers
     */

    const handleSignInClick = () => {
    setIsSignUp(false);
    };

    const handleSignupPost = (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append('fname', fnameRef.current.value);
        formData.append('mname', mnameRef.current.value || null);
        formData.append('lname', lnameRef.current.value);
        formData.append('email', emailRef.current.value);
        formData.append('password', passwordRef.current.value);
        formData.append('phone', phoneRef.current.value);


        axiosClient.post('/signup', formData)
        .then(({data}) => {
        setUser(data.user);
        setToken(data.token);
        setUserType(data.user_type);
        if(data.status === 200) {
            alert(data.message);
        } else {
            alert(data.message);
        }
        }).catch(error => console.error(error));
    }

    const handleSigninPost = (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append('email', loginEmail);
    formData.append('password', loginPass);

    axiosClient.post('/login', formData)
    .then(({data}) => {
        setUser(data.user);
        setToken(data.token);
        setUserType(data.user_type);
        if(data.status === 200) {
        notify('success', data.message, 'top-center', 3000);
        } else {
        notify('error', data.message, 'top-center', 3000);
        }
    }).catch(error => console.error(error));
    }




    /**
     * Render
     */
    return (
    <div className="signin-child">
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
        
        {/* SignUpContainer */}
        <div className={`form-container sign-up-container ${isSignUp ? 'active' : ''}`}>
            <form onSubmit={handleSignupPost}>
            <h1 style={{ marginBottom: '20px' }}>Sign Up</h1>
            <input ref={fnameRef} type="text" placeholder="First Name"  required/>
            <input ref={mnameRef} type="text" placeholder="Middle Name (Optional)"/>
            <input ref={lnameRef} type="text" placeholder="Last Name" />
            <input ref={phoneRef} type="tel" pattern ="09[0-9]{9}" placeholder="Contact Number"  required/>
            <input ref={emailRef} type="email" placeholder="Email"  required/>
            <input ref={passwordRef} type="password" placeholder="Password"  required/>
            <button type="submit">Sign Up</button>
            </form>
        </div>

        {/* SignIn */}
        <div className={`form-container sign-in-container ${!isSignUp ? 'active' : ''}`}>
            <form onSubmit={handleSigninPost}>
                <h1 style={{ marginBottom: '20px' }}>Sign In</h1>
                <div className="d-flex flex-direction-y gap3 w-100">
                    <Input
                    type="email"
                    size="large"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    
                    <Input.Password
                    size="large"
                    placeholder="password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    />
                </div>
                <Link to='/ForgotPassword'>Forgot your password?</Link>
                <button type="submit">Sign In</button>
            </form>
        </div>

        <div className="overlay-container">
            <div className="overlay">
            <div className="overlay-panel overlay-left">
                <h1 className="white">Welcome Back!</h1>
                <p className="white">To keep connected with us please login with your personal info</p>
                <button className="ghost" onClick={() => setIsSignUp(false)}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
                <h3 className="white">Don't have an account?</h3>
                <p className="white">Sign up now to ensure your pet receives the best care at Arevalo's Animal Clinic!</p>
                <button className="ghost" onClick={() => setIsSignUp(true)}>Sign Up</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    );
}
