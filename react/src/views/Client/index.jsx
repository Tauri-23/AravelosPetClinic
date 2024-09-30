import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/index.css";

export default function ClientIndex() {
    return(

        <div className = "page">
            <div className= "index guest-index">
                <div className= "banner" >
                    <img src="/assets/media/pictures/dog.png" className="dog"/>
                    <div className = "banner-text">
                        <div className = "small1 anybody">Keepin' their furry tails waggin' at</div>
                        <div className = "big-f bold anybody">Arevalo's Animal Clinic</div>
                    </div>
                </div>
                <div className = "details-sec">
                    aaaa
                </div>
            </div>
        </div>
    );
}

