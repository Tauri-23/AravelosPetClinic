import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/navbar.css";
import AdminNavbar from "../../components/admin_navbar";

export default function AdminDefault () {
    const [name, setName] = useState("Airich");
    const [tempName, setTempName] = useState("");

    const updateInDb = () => {
        alert(`Updated to the database: ${name}`);
    }
    
    return(
        <>
            <AdminNavbar/>

            {/* Children Elements */}
            <Outlet context={{
                name, setName,
                tempName, setTempName
            }}/>


            
            <button onClick={updateInDb}>Save to Db</button> 
        </>
    );
}
