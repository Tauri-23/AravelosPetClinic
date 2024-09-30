import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/navbar.css";
import AdminNavbar from "../../components/admin_navbar";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "../../contexts/ModalContext";
import ModalManager from "../../managers/ModalManager";

export default function AdminDefault () {
    
    return(
        <ModalProvider>
            <div className="position-relative">
                <ModalManager/>
                <AdminNavbar/>

                {/* Children Elements */}
                <Outlet/>

                <ToastContainer/>
            </div>
        </ModalProvider>
    );
}
