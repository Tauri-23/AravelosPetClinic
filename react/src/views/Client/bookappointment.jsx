import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/bookappointment.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import ClientCalendar from "../../components/calendar.jsx";

export default function BookAppointment() {
    return(
        <div className="book-appointment gen-margin">
         <ClientCalendar />
        </div>

    );
}
