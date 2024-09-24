import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/navbar.css";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";

export default function ClientDefault () {
    const { user, userType, token, setUserType, setUser, setToken } = useStateContext();
    const location = useLocation();
    const url = location.pathname;


    useEffect(() => {
        if (token) {
            axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data.user);
            })
            .catch((error) => {
                console.error(error);
                if (error.response && error.response.status === 401) {
                    setUser({});
                    setToken(null);
                    setUserType(null);
                }
            });
        }
    }, []);


    const onLogout = (ev) => {
        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
                setUserType(null);
            });
    };

    // Handle redirection in the component body
    if (!token || userType !== 'client') {
        return <Navigate to="/" />;
    }


    return(
        <><div className="nav nav1">
        <div className="nav1-logo-div">
        <img src="/assets/media/logos/paw.png" className="nav1-logo" alt="logo"/>
        </div>
        <div className="nav1-links">
             <Link to={'/ClientIndex'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/home.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Home</p><div className={`nav1-line${url === "/ClientIndex" ? " active" : ""}`} ></div></div></Link>
             <Link to={'BookAppointment'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/appointment.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Book Appointment</p><div className={`nav1-line${url === "/ClientIndex/BookAppointment" ? " active" : ""}`} ></div></div></Link>
             <Link to={'ClientContactUs'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/user.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Contact Us</p><div className={`nav1-line${url === "/ClientIndex/ClientContactUs" ? " active" : ""}`} ></div></div></Link>

        </div>

        <div className="nav1-sign">
            <Link to={''} className="nav1-link" onClick={onLogout}>Sign out</Link>
        </div>
        </div>
        <Outlet/>
        </>

    );
}
