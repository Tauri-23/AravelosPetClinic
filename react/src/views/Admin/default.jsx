import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/navbar.css";
import AdminNavbar from "../../components/admin_navbar";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "../../contexts/ModalContext";
import ModalManager from "../../managers/modalManager";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";

export default function AdminDefault () {
    const { user, userType, token, setUserType, setUser, setToken } = useStateContext();
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
    if (!token || userType !== 'admin') {
        return <Navigate to="/" />;
    }

    return(
        <ModalProvider>
            <div className="position-relative">
                <ModalManager/>
                <AdminNavbar onLogout={onLogout}/>

                {/* Children Elements */}
                <Outlet/>

                <ToastContainer/>
            </div>
        </ModalProvider>
    );
}
