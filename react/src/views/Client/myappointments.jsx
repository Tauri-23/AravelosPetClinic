import React from 'react'
import { Link } from 'react-router-dom';
import "../../assets/css/app.css";

export default function MyAppointments() {
  return (

    <div className = "page">
        <div className="bg book-appointment gen-margin">
            <div className="mini-nav bottom-margin"><div className="anybody medium bold">My Appointment</div><div className="separator"></div><Link to={'../BookAppointment'}><div className="anybody small sem-bold">Book Appointment</div></Link></div>
        </div>
    </div>
  )
}
