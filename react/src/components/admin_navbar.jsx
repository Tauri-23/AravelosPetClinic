import { Link, useLocation } from "react-router-dom";

export default function AdminNavbar({onLogout}) {

    const location = useLocation();

    return(
        <div className="nav nav1">
            <div className="nav1-logo-div">
            <img src="/assets/media/logos/paw.png" className="nav1-logo" alt="logo"/>
            </div>
            <div className="nav1-links">
                <Link to={'/AdminIndex'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/home.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Home</p><div className={`nav1-line${location.pathname === "/AdminIndex" ? " active" : ""}`} ></div></div></Link>
                <Link to={'/AdminIndex/ClinicCalendar'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/appointment.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Appointments</p><div className={`nav1-line${location.pathname === "/" ? " active" : ""}`} ></div></div></Link>
                <Link to={'/AdminIndex/ManageProfiles'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/user.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Users</p><div className={`nav1-line${location.pathname === "/" ? " active" : ""}`} ></div></div></Link>
                <Link to={'/AdminIndex/AdminFeedback'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/feedback.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Feedbacks</p><div className={`nav1-line${location.pathname === "/" ? " active" : ""}`} ></div></div></Link>
                <Link to={'InventoryTracking'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/appointment.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Inventory Tracking</p><div className={`nav1-line${location.pathname === "/InventoryTracking" ? " active" : ""}`} ></div></div></Link>

            </div>

            <div className="nav1-sign">
                <div onClick={onLogout} className="pointer bold nav1-link">Sign Out</div>
            </div>
        </div>
    );
}
