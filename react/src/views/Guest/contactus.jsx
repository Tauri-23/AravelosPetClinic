import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/contactus.css";


export default function GuestContactUs() {
    return (
        <div className="contact-us">
            <div className="container">
                <div className="left">
                    <div className="big-f bold anybody">Find us at</div>
                    <div className="small-f anybody">Weifield Group Contracting</div>
                    <div className="small-f anybody">6950 S. Jordan Road, Centennial, CO 80112</div>
                    <div className="small-f anybody">Northern Division Office: 1270 Automation Drive, Windsor, CO 80550</div>
                    <div className="small-f anybody">Wyoming Office: 308 Southwest Dr., Cheyenne, WY 82007</div>
                    <div className="small-f anybody">Phone: 303.428.2011 / 303.202.0466</div>
                    <div className="small-f anybody">24/7 Service: (Then press 2 for emergency calls)</div>
                    <img src="/assets/media/pictures/clinicpic.svg" alt="Clinic" className="clinic" />
                </div>
                <div className="right">
                    <img src="/assets/media/pictures/map.svg" alt="Map" className="map" />
                </div>
            </div>
        </div>
    );
}