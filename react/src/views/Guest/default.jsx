import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { ToastContainer } from "react-toastify";


export default function GuestDefault() {
    const location = useLocation();
    const {token, setUser, userType, setUserType, setToken} = useStateContext();
    const url = location.pathname;

    useEffect(() => {
        console.log(token);
        if(token) {
            axiosClient.get('/user')
            .then(({data}) => {
                setUserType(data.user_type);
                setUser(data.user);
            }).catch((error) => {
                if (error.response && error.response.status === 401) {
                    setUserType(null);
                    setUser({});
                    setToken(null);
                }
            });
        }
    }, []);

    if(token) {
        console.log(userType);
        if (userType === 'client') {
            return <Navigate to="/ClientIndex" />;
        }
        else if(userType === 'admin') {
            return <Navigate to="/AdminIndex" />;
        }
    }
    
    return(
        <>
        <div className="nav nav1">
        <div className="nav1-logo-div">
        <img src="/assets/media/logos/paw.png" className="nav1-logo" alt="logo"/>
        </div>
        <div className="nav1-links">
             <Link to={'/'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/home.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Home</p><div className={`nav1-line${url === "/" ? " active" : ""}`} ></div></div></Link>
             <Link to={'/GuestContactUs'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/user.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Contact Us</p><div className={`nav1-line${url === "/GuestContactUs" ? " active" : ""}`} ></div></div></Link>
        </div>

          <div className="nav1-sign">
            <Link to={'/Sign'} className="nav1-link">Sign In</Link>
        </div>
        </div>
        <Outlet/>
        <ToastContainer/>
        </>

    );
}
