import "../assets/css/calendar.css";
import "../assets/css/app.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { fetchAllClientAppointments } from "../services/AppointmentServices";

export default function ClientCalendar({ onDateSelect, calendarView, CustomToolbar }) {
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
            start: moment(appointment.date_time, "YYYY-MM-DD HH:mm:ss","Asia/Manila").toDate(),
            end: moment(appointment.date_time, "YYYY-MM-DD HH:mm:ss","Asia/Manila").toDate(),
            title: `${appointment.service} ${appointment.pet}`
        })));
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
            min={new Date(2024, 0, 1, 8, 0)}
            max={new Date(2025, 0, 1, 15, 0)}
            view={calendarView}
            components={{
                toolbar: CustomToolbar,
            }}
        />
    );
}

ClientCalendar.propTypes = {
    onDateSelect: PropTypes.func.isRequired,
    calendarView: PropTypes.string.isRequired,
    CustomToolbar: PropTypes.elementType,
};
