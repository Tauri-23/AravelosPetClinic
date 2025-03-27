import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import AdminCalendar from "../../../components/adminCalendar.jsx";
import CustomToolbar from "../../../components/custom_toolbar.jsx";
import { useEffect, useState } from "react";
import { fetchAllAppointmentsWhereStatus, fetchAppointmentDetails } from "../../../services/AppointmentServices.jsx";
import "../../../assets/css/clinicCalendar.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons"; // Solid icons
import { far } from "@fortawesome/free-regular-svg-icons"; // Regular icons
import { fab } from "@fortawesome/free-brands-svg-icons"; // Brand icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminCalendarEventInfo from "../../../components/adminCalendarEventInfo.jsx";

library.add(fas, far, fab);
function ClinicCalendar() {
    const [selectedAppointment, setSelectedAppointment] = useState(null); // State for selected appointment
    const [appointments, setAppointments] = useState(null);



    /**
     * Scripts for onmount
     */
    useEffect(() => {
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
                <div className="bg gen-margin">
                    <div className="mini-nav bottom-margin-s">
                        <div className="anybody medium-f bold">Clinic Calendar</div>
                        <div className="separator left-margin-s right-margin-s"></div>
                        <Link to={"/AdminIndex/Appointments"}>
                            <div className="anybody small-f semi-bold">
                                Appointments
                            </div>
                        </Link>
                    </div>

                    <div className="grid inter">
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
                </div>
            )
            : (<>Loading...</>)}
        </div>
    );
}

export default ClinicCalendar;
