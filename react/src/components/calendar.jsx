import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Component } from "react";
const localizer = momentLocalizer(moment);
const events =[
    {
        start: moment("2024-09-29T19:00:00").toDate(),
        end: moment("2024-09-29T23:00:00").toDate(),
        title:"hahaha"
    }
]
export default function ClientCalendar(){
    return(
        <Calendar events={events} localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}/>
    );
}
