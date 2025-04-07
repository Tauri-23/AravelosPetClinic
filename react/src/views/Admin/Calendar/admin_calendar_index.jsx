import { useEffect, useState } from "react";
import CalendarCustom from "../../../components/Calendars/CalendarCustom";
import { fetchAllAppointmentsWhereStatus } from "../../../services/AppointmentServices";
import { useOutletContext } from "react-router-dom";
import React from "react";
import AdminCalendarEventInfo from "../../../components/adminCalendarEventInfo";

export default function AdminCalendarIndex() {
    const {setActiveNavLink} = useOutletContext();
    const [selectedAppointments, setSelectedAppointments] = useState([]);

    const [appointments, setAppointments] = useState(null);



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Calendar");

        const getAll = async() => {
            const data = await fetchAllAppointmentsWhereStatus("Approved");

            setAppointments(data);
        }

        getAll();
    }, []);



    /**
     * Render
     */
    return(
        <div className="content1 compressed">
            <h1 className="fw-bold mar-bottom-1">Calendar</h1>

            
            <div className="d-flex gap1">
                <CalendarCustom width={"calc(100% - 600px)"} setSelectedAppointments={setSelectedAppointments} appointments={appointments || []}/>

                <div className="container1"
                style={{width: 600, height: 800, overflowY: "auto"}}>
                    {selectedAppointments.length < 1
                    ? (
                        <>No Appointments</>
                    )
                    : selectedAppointments.map(apt => (
                        <div className="mar-bottom-3">
                            <AdminCalendarEventInfo
                                appointment={apt}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}