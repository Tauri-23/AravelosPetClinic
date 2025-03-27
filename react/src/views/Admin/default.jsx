import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/navbar.css";
import AdminNavbar from "./components/admin_navbar";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "../../contexts/ModalContext";
import ModalManager from "../../managers/modalManager";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import AdminSideNav from "./components/admin_sidenav";

export default function AdminDefault () {
    const { user, userType, token, setUserType, setUser, setToken } = useStateContext();
    const [activeNavLink, setActiveNavLink] = useState("Dashboard");



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
    if (!token || userType !== 'admin') {
        return <Navigate to="/" />;
    }



    /**
     * Render
     */
    return(
        <ModalProvider>
            <div className="position-relative">
                <ModalManager/>
                <AdminNavbar activeNavLink={activeNavLink} onLogout={onLogout}/>
                <AdminSideNav activeNavLink={activeNavLink}/>

                {/* Children Elements */}
                <Outlet context={{setActiveNavLink}}/>
                

                <ToastContainer/>
            </div>
        </ModalProvider>
    );
}
