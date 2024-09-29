import "../assets/css/calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);
const events = [
    {
        start: moment("2024-09-29T19:00:00").toDate(),
        end: moment("2024-09-29T23:00:00").toDate(),
        title: "hahaha"
    }
];

export default function ClientCalendar({ onDateSelect }) { // Accept the callback as a prop
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
        />
    );
}
