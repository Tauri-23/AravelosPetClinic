import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/navbar.css";

export default function GuestDefault() {
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
             <Link to={'/GuestIndex'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/home.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Home</p><div className={`nav1-line${url === "/" ? " active" : ""}`} ></div></div></Link>
             <Link to={'/GuestContactUs'} className="nav2-link"><div className="wx"><img src="/assets/media/icons/user.svg" className="nav1-icons" alt="logo"/></div><div className="nav1-link"><p>Contact Us</p><div className={`nav1-line${url === "/ClientIndex/GuestContactUs" ? " active" : ""}`} ></div></div></Link>
        </div>

          <div className="nav1-sign">
            <Link to={'/GuestIndex'} className="nav1-link">Sign In</Link>
        </div>
        </div>
        <Outlet/>
        </>

    );
}
