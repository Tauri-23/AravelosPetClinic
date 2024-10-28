import "../assets/css/calendar.css";
import "../assets/css/app.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { fetchAllAppointments } from "../services/AppointmentServices";

export default function AdminCalendar({ onDateSelect, initialView='month', CustomToolbar, onSelectEvent }) {
    const {user} = useStateContext();
    const localizer = momentLocalizer(moment);

    const [appointments, setAppointments] = useState([]);
    const [events, setEvents] = useState([]);
    const [calendarView, setCalendarView] = useState(initialView); // Add state for calendarView

    const handleViewChange = (view) => {
        setCalendarView(view); // Update the calendar view state
    };
    useEffect(() => {
        const getAllAppointments = async() => {
            try {
                const data = await fetchAllAppointments(user.id);
                setAppointments(data)
            } catch(error) {console.error(error)}
        }

        getAllAppointments();
    }, []);

    useEffect(() => {
        setEvents(appointments.map(appointment => {
            // Initialize the service variable
            let service = appointment.service; // Default to the raw service value

            // Format the service name based on the appointment type
            if (appointment.service === "checkup") {
                service = "Check-up";
            } else if (appointment.service === "grooming") {
                service = "Grooming";
            } else if (appointment.service === "deworming") {
                service = "Deworming";
            } else if (appointment.service === "parasiticControl") {
                service = "Parasitic Control";
            }

            // Create the event object
            let event = {
                start: moment(appointment.date_time, "YYYY-MM-DD HH:mm:ss", "Asia/Manila").toDate(),
                end: moment(appointment.date_time, "YYYY-MM-DD HH:mm:ss", "Asia/Manila").toDate(),
                title: `${service}`, // Use the formatted service name
                resource: `${appointment.id}`
            };

            return event; // Return the modified event object
        }));
    }, [appointments]);


    useEffect(() => {
        console.log(appointments);
    }, [appointments]);
    useEffect(() => {
        console.log(events);
    }, [events]);

    const dayPropGetter = (date) => {
        const day = date.getDay();
        const now = moment().tz("Asia/Manila");
        const currentDate = moment(date).tz("Asia/Manila");
        const twoDaysFromNow = now.clone().add(2, 'days');

        let style = {};

        if (day === 2 || currentDate.isSameOrBefore(twoDaysFromNow)) {
            style = {
                backgroundColor: '#f0f0f0',
                color: '#ccc',
                pointerEvents: 'none',
            };
        }
        return { style };
    };

    const handleSelectSlot = ({ start }) => {
        const selectedDay = start.getDay();
        const now = moment().tz("Asia/Manila");
        const selectedDate = moment(start).tz("Asia/Manila");
        const twoDaysFromNow = now.clone().add(2, 'days');

        if (selectedDay === 2 || selectedDate.isSameOrBefore(twoDaysFromNow)) {
            return; // Exit if the selected day is Tuesday or within 2 days from now
        }

        const isoSelectedDate = selectedDate.toISOString();
        onDateSelect(isoSelectedDate);
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
            view={calendarView} // Use the state variable for the view
            onView={handleViewChange} // Update view when changed
            onSelectEvent={onSelectEvent} // Pass the onSelectEvent handler here
            min={new Date(2024, 0, 1, 8, 0)}
            max={new Date(2025, 0, 1, 15, 0)}
            components={{
                toolbar: (props) => <CustomToolbar {...props} onViewChange={handleViewChange} />, // Pass handleViewChange to the toolbar
            }}
        />
    );
}

AdminCalendar.propTypes = {
    onDateSelect: PropTypes.func,
    calendarView: PropTypes.string,
    CustomToolbar: PropTypes.elementType,
    onSelectEvent: PropTypes.func,
    onDoubleClickEvent: PropTypes.func,
};
