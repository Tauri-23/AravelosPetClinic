import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/navbar.css";
import AdminNavbar from "../../components/admin_navbar";
import { ToastContainer } from "react-toastify";

export default function AdminDefault () {
    
    return(
        <div className="position-relative">
            <AdminNavbar/>

            {/* Children Elements */}
            <Outlet/>

            <ToastContainer/>
        </div>
    );
}
