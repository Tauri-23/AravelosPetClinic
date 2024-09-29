import "../assets/css/calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);
const events = [
    {
        start: moment("2024-09-29T15:00:00").toDate(),
        end: moment("2024-09-29T11:00:00").toDate(),
        title: "hahaha"
    }
];

export default function ClientCalendar({ onDateSelect, calendarView, CustomToolbar }) { // Accept the view as a prop
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

        const selectedDate = start.toISOString(); // Get ISO string for full date
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
