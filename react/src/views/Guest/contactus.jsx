import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/contactus.css";


export default function GuestContactUs() {
    return(
        <div className = "contact-us">
            <div className = "container">
                <div className = "left">
                    <div className = "big bold anybody">Find us at</div>
                    <div className = "small-f anybody">1300, 108 E Cornejo St, Pasay, Metro Manila</div>
                    <div className = "small-f anybody">8854 2539 / 0929 3143616</div>
                    <img src="/assets/media/pictures/clinicpic.svg" className="clinic"/>
                </div>
                <div className = "right">
                    <img src="/assets/media/pictures/map.svg" className="map"/>
                </div>
            </div>
        </div>
    );
}
