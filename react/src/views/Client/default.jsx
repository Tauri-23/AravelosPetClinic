import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/navbar.css";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "../../contexts/ModalContext";
import ModalManager from "../../managers/modalManager";
import ClientNavbar from "./components/client_navbar";

export default function ClientDefault () {
    const { userType, token, setUserType, setUser, setToken } = useStateContext();
    const [activeNavLink, setActiveNavLink] = useState("Home");



    /**
     * Onmount
     */
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



    /**
     * Render
     */
    return(
        <ModalProvider>
            <div className="position-relative">
                <ModalManager/>

                <ClientNavbar activeNavLink={activeNavLink} onLogout={onLogout}/>

                <Outlet context={{
                    activeNavLink, setActiveNavLink
                }}/>

                <ToastContainer/>
            </div>
        </ModalProvider>

    );
}
