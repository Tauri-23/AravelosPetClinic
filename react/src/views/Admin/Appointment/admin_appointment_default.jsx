import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { fetchAllAppointmentsWhereStatus } from "../../../services/AppointmentServices";

export default function AdminAppointmentDefault() {
    const [activeTab, setActiveTab] = useState("Pending");
    const [pendingAppointments, setPendingAppointments] = useState(null);
    const [approvedAppointments, setApprovedAppointments] = useState(null);



    /**
     * Onmount
     */
    useEffect(() => {
        const getAll = async() => {
            try {
                const [pendingDb, approvedDb] = await Promise.all([
                    fetchAllAppointmentsWhereStatus("Pending"),
                    fetchAllAppointmentsWhereStatus("Approved")
                ]);
                setPendingAppointments(pendingDb.length);
                setApprovedAppointments(approvedDb.length);
            } catch (error) {
                console.error(error);
            }
        }
        getAll();
    }, []);

    return(
        <div className="page inter">
            {(pendingAppointments !== null && approvedAppointments !== null)
            ? (
                <div className="bg book-appointment gen-margin">
                    <div className="mini-nav bottom-margin">
                        <div className="anybody medium-f bold">Appointments</div>
                        <div className="separator left-margin-s right-margin-s"></div>
                        <Link to={'../ClinicCalendar'}>
                            <div className="anybody small-f semi-bold">Clinic Calendar</div>
                        </Link>
                    </div>

                    <div className="myappt small-form bottom-margin-s text-center">
                        <div className='myappt-navigation d-flex '>
                            <Link to={''} className="anybody semi-bold right-margin">
                                <div className="a-tab">
                                    Pending
                                    {pendingAppointments > 0 && (<div className="notif-circle">{pendingAppointments}</div>)}
                                    <div className={`nav1-line${activeTab === "Pending" ? " active" : ""}`}></div>
                                </div>
                            </Link>
                            <Link to={'Approved'} className="anybody semi-bold right-margin">
                                <div className="a-tab">
                                    Approved
                                    {approvedAppointments > 0 && (<div className="notif-circle">{approvedAppointments}</div>)}
                                    <div className={`nav1-line${activeTab === "Approved" ? " active" : ""}`}></div>
                                </div>
                            </Link>
                            <Link to={'Completed'} className="anybody semi-bold right-margin">
                                <div className="a-tab">
                                    Completed
                                    <div className={`nav1-line${activeTab === "Completed" ? " active" : ""}`}></div>
                                </div>
                            </Link>
                            <Link to={'Cancelled'} className="anybody semi-bold right-margin">
                                <div className="a-tab">
                                    Cancelled
                                    <div className={`nav1-line${activeTab === "Cancelled" ? " active" : ""}`}></div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <Outlet context={{setActiveTab}}/>         
                </div>
            )
            : (<>Loading</>)}
        </div>
    )
}