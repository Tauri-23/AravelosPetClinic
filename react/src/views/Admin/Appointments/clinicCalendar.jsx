import React, { useCallback } from "react";
import AdminCalendar from "../../../components/adminCalendar.jsx";
import CustomToolbar from "../../../components/custom_toolbar.jsx";
import { useEffect, useState } from "react";
import { fetchAllAppointmentsWhereStatus, fetchAppointmentDetails } from "../../../services/AppointmentServices.jsx";
import "../../../assets/css/clinicCalendar.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons"; // Solid icons
import { far } from "@fortawesome/free-regular-svg-icons"; // Regular icons
import { fab } from "@fortawesome/free-brands-svg-icons"; // Brand icons
import AdminCalendarEventInfo from "../../../components/adminCalendarEventInfo.jsx";
import { useOutletContext } from "react-router-dom";

library.add(fas, far, fab);
function ClinicCalendar() {
    const {setActiveNavLink} = useOutletContext();
    const [selectedAppointment, setSelectedAppointment] = useState(null); // State for selected appointment
    const [appointments, setAppointments] = useState(null);



    /**
     * Scripts for onmount
     */
    useEffect(() => {
        setActiveNavLink("Calendar");
        const getAll = async() => {
            try {
                const data = await fetchAllAppointmentsWhereStatus("Approved");
                setAppointments(data);
            } catch (error) {
                console.error(error);
            }
        }
        getAll();
    }, []);



    /**
     * Handlers
     */
    const onSelectEvent = useCallback(async(calEvent) => {
        if (calEvent) {
            try {
                const data = await fetchAppointmentDetails(
                    calEvent.resource
                );
                setSelectedAppointment(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
    }, []);



    /**
     * Render
     */
    return (
        <div className="content1 compressed">
            {appointments
            ? (
                <div className="d-flex inter">
                    <AdminCalendar
                        CustomToolbar={CustomToolbar}
                        onSelectEvent={onSelectEvent} // Pass the custom toolbar here
                        appointments={appointments}
                        onDateSelect={() => setSelectedAppointment(null)}
                    />
                    <div className="small-form">
                        {selectedAppointment
                        ? (
                            <AdminCalendarEventInfo
                                appointment={selectedAppointment}
                            />
                        )
                        : (
                            <>No Appointment Selected</>
                        )}
                    </div>
                    
                </div>
            )
            : (<>Loading...</>)}
        </div>
    );
}

export default ClinicCalendar;
