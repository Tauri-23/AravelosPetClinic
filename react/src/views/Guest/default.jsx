import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "../../contexts/ModalContext";
import ModalManager from "../../managers/modalManager";
import GuestNavbar from "./components/guest_navbar";



export default function GuestDefault() {
    const location = useLocation();
    const {token, setUser, userType, setUserType, setToken} = useStateContext();
    const url = location.pathname;
    const [activeNavLink, setActiveNavLink] = useState("Home");

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

        <ModalProvider>
            <div className="position-relative">
                <ModalManager/>

                <GuestNavbar activeNavLink={activeNavLink}/>

                <Outlet context={{
                    activeNavLink, setActiveNavLink
                }}/>

                <ToastContainer/>
            </div>
        </ModalProvider>

    );
}
