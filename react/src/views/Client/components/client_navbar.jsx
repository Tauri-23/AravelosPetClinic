import { Link } from "react-router-dom";

export default function ClientNavbar({activeNavLink, onLogout}) {
    return(
        <nav className="client-navbar">
            <img src="/assets/media/logos/paw.png" className="client-navbar-logo" alt="logo"/>

            <div className="client-navbar-links">

                <Link to={'/ClientIndex'} className={`client-navbar-link ${activeNavLink === "Home" ? "active" : ""}`}>
                    Home
                </Link>
                <Link to={'BookAppointment'} className={`client-navbar-link ${activeNavLink === "Appointments" ? "active" : ""}`}>
                    Appointments
                </Link>
                <Link to={'ClientContactUs'} className={`client-navbar-link ${activeNavLink === "Contact Us" ? "active" : ""}`}>
                    Contact Us
                </Link>
                <Link to={'ClientuserProfile'} className={`client-navbar-link ${activeNavLink === "Profile" ? "active" : ""}`}>
                    Profile
                </Link>

            </div>

            <div className="nav1-sign">
                <Link to={''} className="nav1-link" onClick={onLogout}>Sign out</Link>
            </div>
        </nav>
    );
}