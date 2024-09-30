import "../assets/css/calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { fetchAllClientAppointments } from "../services/AppointmentServices";


// const events = [
//     {
//         start: moment("2024-09-29T15:00:00").toDate(),
//         end: moment("2024-09-29T11:00:00").toDate(),
//         title: "hahaha"
//     }
// ];


export default function ClientCalendar({ onDateSelect, calendarView, CustomToolbar }) { // Accept the view as a prop
    const {user} = useStateContext();
    const localizer = momentLocalizer(moment);

    const [appointments, setAppointments] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getAllAppointments = async() => {
            try {
                const data = await fetchAllClientAppointments(user.id);
                setAppointments(data)
            } catch(error) {console.error(error)}
        }

        getAllAppointments();
    }, []);

    useEffect(() => {
        setEvents(appointments.map(appointment => ({
            start: moment(appointment.date_time, "YYYY-MM-DD HH:mm:ss","Asia/Manila").toDate(), // Format and convert to Date
            end: moment(appointment.date_time, "YYYY-MM-DD HH:mm:ss","Asia/Manila").toDate(),   // Same for end
            title: `${appointment.service} ${appointment.pet}`
        })));
    }, [appointments]);


    /*
    | Debugging
    */
    useEffect(() => {
        console.log(appointments);
    }, [appointments]);
    useEffect(() => {
        console.log(events);
    }, [events]);

    const dayPropGetter = (date) => {
        const day = date.getDay();
        let style = {};

        if (day === 2) {
            style = {
                backgroundColor: '#f0f0f0',
                color: '#ccc',
                pointerEvents: 'none',
            };
        }
        return { style };
    };

    const handleSelectSlot = ({ start, end }) => {
        const selectedDay = start.getDay();

        if (selectedDay === 2) {
            return; // Exit if the selected day is Tuesday
        }

        const selectedDate = moment.tz(start, "Asia/Manila").toISOString();
        onDateSelect(selectedDate); // Call the callback function with the selected date
    };

    return (
        <Calendar
            events={events}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 470 }}
            dayPropGetter={dayPropGetter}
            selectable
            onSelectSlot={handleSelectSlot}
            min={new Date(2024, 0, 1, 8, 0)} // 8:00 AM
            max={new Date(2025, 0, 1, 15, 0)} // 3:00 PM
            view={calendarView} // Dynamically set the view (day or week)
            components={{
                toolbar: CustomToolbar, // Replace toolbar with CustomToolbar
            }}
        />
    );
}

ClientCalendar.propTypes = {
    onDateSelect: PropTypes.func.isRequired,
    calendarView: PropTypes.string.isRequired,
    CustomToolbar: PropTypes.elementType, // Optional
};
