import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/navbar.css";

export default function AdminDefault () {
    const location = useLocation(); // once ready it returns the 'window.location' object
    const [url, setUrl] = useState(null);
    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);
    return(
        <><div className="nav nav1">
        <div className="nav1-logo-div">
        <img src="/assets/media/logos/paw.png" className="nav1-logo" alt="logo"/>
        </div>
        <div className="nav1-links">
             <Link to={'/AdminIndex'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/home.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Home</p><div className={`nav1-line${url === "/AdminIndex" ? " active" : ""}`} ></div></div></Link>
             <Link to={'/AdminIndex'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/appointment.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Appointments</p><div className={`nav1-line${url === "/" ? " active" : ""}`} ></div></div></Link>
             <Link to={'/AdminIndex'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/user.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Users</p><div className={`nav1-line${url === "/" ? " active" : ""}`} ></div></div></Link>
             <Link to={'/AdminIndex'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/feedback.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Feedbacks</p><div className={`nav1-line${url === "/" ? " active" : ""}`} ></div></div></Link>
             <Link to={'/InventoryTracking'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/appointment.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Inventory Tracking</p><div className={`nav1-line${url === "/InventoryTracking" ? " active" : ""}`} ></div></div></Link>

        </div>

          <div className="nav1-sign">
            <Link to={'/GuestIndex'} className="nav1-link">Sign In</Link>
        </div>
        </div>
        <Outlet/>
        </>

    );
}
