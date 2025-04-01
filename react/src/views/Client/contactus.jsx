import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../assets/css/app.css";
import "../../assets/css/contactus.css";

export default function ClientContactUs() {
    const {setActiveNavLink} = useOutletContext();



    /**
     * OnMount
     */
    useEffect(() => {
        setActiveNavLink("Contact Us");
    }, []);



    /**
     * Render
     */
    return (

        <div className="guest-contact-page page inter">
            <div className="contact-header anybody bold medium-f bottom-margin-s">Contact Us</div> {/* Add the header */}
            <div className="guest-contact-us">
                <div className="guest-contact-box">
                    <div className="guest-contact-icon">📍</div>
                    <div className="bold s-align-center semi-medium-f">ADDRESS</div>
                    <p>Arevalo's Animal Clinic</p>
                    <p>108 E. Cornejo Brgy. 162, Malibay, Pasay City</p>
                    <div className="map-container">
                        <img src="/assets/media/pictures/map.svg" alt="Map" className="map" />
                    </div>
                </div>
                <div className="guest-contact-box">
                    <div className="guest-contact-icon">📞</div>
                    <div className="bold s-align-center semi-medium-f">PHONE</div>
                    <p>Arevalo's Animal Clinic</p>
                    <p>303.428.2011 phone</p>
                </div>
                <div className="guest-contact-box">
                    <div className="guest-contact-icon">✉️</div>
                    <div className="bold s-align-center semi-medium-f">EMAIL</div>
                    <p>arevalosanimalclinic@gmail.com</p>
                </div>
            </div>
        </div>
    );
}
