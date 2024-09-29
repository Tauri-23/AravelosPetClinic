import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/navbar.css";
import AdminNavbar from "../../components/admin_navbar";

export default function AdminDefault () {
    
    return(
        <>
            <AdminNavbar/>

            {/* Children Elements */}
            <Outlet/>
        </>
    );
}
