import { Link } from "react-router-dom";

export default function GuestNavbar({activeNavLink}) {
    return(
        <nav className="client-navbar">
            <img src="/assets/media/logos/paw.png" className="client-navbar-logo" alt="logo"/>

            <div className="client-navbar-links">

                <Link to={'/'} className={`client-navbar-link ${activeNavLink === "Home" ? "active" : ""}`}>
                    Home
                </Link>
                    <Link to={'/GuestContactUs'} className={`client-navbar-link ${activeNavLink === "Contact Us" ? "active" : ""}`}>
                    Contact Us
                </Link>
            </div>
            <Link to={'/Sign'}>
                <button className="primary-btn-blue1">Sign In</button>
            </Link>
        </nav>
    );
}
