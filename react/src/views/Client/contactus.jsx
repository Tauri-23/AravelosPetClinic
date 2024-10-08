import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../assets/css/app.css";
import "../../assets/css/contactus.css";

export default function ClientContactUs() {
    return (
        <div className="guest-contact-page page inter">
            <div className="contact-header anybody bold medium-f bottom-margin-s">Contact Us</div> {/* Add the header */}
            <div className="guest-contact-us">
                <div className="guest-contact-box">
                    <div className="guest-contact-icon">📍</div>
                    <div className="bold s-align-center semi-medium-f">ADDRESS</div>
                    <p>Weifield Group Contracting</p>
                    <p>6950 S. Jordan Road, Centennial, CO 80112</p>
                    <p>Northern Division Office: 1270 Automation Drive, Windsor, CO 80550</p>
                    <p>Wyoming Office: 308 Southwest Dr., Cheyenne, WY 82007</p>
                    <div className="map-container">
                        <img src="/assets/media/pictures/map.svg" alt="Map" className="map" />
                    </div>
                </div>
                <div className="guest-contact-box">
                    <div className="guest-contact-icon">📞</div>
                    <div className="bold s-align-center semi-medium-f">PHONE</div>
                    <p>Weifield Group Contracting</p>
                    <p>303.428.2011 phone</p>
                    <p>303.202.0466 facsimile</p>
                    <p>24/7 Service Department</p>
                    <p>(Press 2 for emergency calls)</p>
                </div>
                <div className="guest-contact-box">
                    <div className="guest-contact-icon">✉️</div>
                    <div className="bold s-align-center semi-medium-f">EMAIL</div>
                    <p>Request for Proposal: info@weifieldgroup.com</p>
                    <p>Bid Opportunities: estimating@weifieldgroup.com</p>
                    <p>Service Calls: service@weifieldcontracting.com</p>
                    <p>Employment Opportunities: careers@weifieldcontracting.com</p>
                </div>
            </div>
        </div>
    );
}
