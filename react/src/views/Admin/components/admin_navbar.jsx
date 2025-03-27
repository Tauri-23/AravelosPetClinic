import { Link, useLocation } from "react-router-dom";


export default function AdminNavbar({activeNavLink, onLogout}) {

    const location = useLocation();

    return(
        <nav className="admin-navbar">
            <div className="nav1-sign">
                <button onClick={onLogout} className="primary-btn-red1">Sign Out</button>
            </div>
        </nav>
    );
}
