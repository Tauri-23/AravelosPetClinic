import { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { fetchAllClientAppointmentsWhereClientIdAndStatus } from "../../../services/AppointmentServices";
import { Spin } from "antd";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function ClientAppointmentsDefault() {
    const {user} = useStateContext();
    const {setActiveNavLink} = useOutletContext();

    const [activeTab, setActiveTab] = useState("Pending");
    const [pendingAppointments, setPendingAppointments] = useState(null);
    const [approvedAppointments, setApprovedAppointments] = useState(null);
    const [completedAppointments, setCompletedAppointments] = useState(null);
    const [canceledAppointments, setCanceledAppointments] = useState(null);



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Appointments");

        const getAll = async() => {
            const [pendingAptDb, approvedAptDb, completedAptDb, canceledAptDb] = await Promise.all([
                fetchAllClientAppointmentsWhereClientIdAndStatus(user.id, "Pending"),
                fetchAllClientAppointmentsWhereClientIdAndStatus(user.id, "Approved"),
                fetchAllClientAppointmentsWhereClientIdAndStatus(user.id, "Completed"),
                fetchAllClientAppointmentsWhereClientIdAndStatus(user.id, "Cancelled"),
            ]);

            setPendingAppointments(pendingAptDb);
            setApprovedAppointments(approvedAptDb);
            setCompletedAppointments(completedAptDb);
            setCanceledAppointments(canceledAptDb);
        }

        getAll();
    }, []);



    /**
     * Render
     */
    return(
        <div className="content1">
            {(pendingAppointments !== null && approvedAppointments !== null &&
            completedAppointments !== null && canceledAppointments  !== null)
            ? (
                <>
                    <div className="mar-bottom-1 d-flex justify-content-between align-items-center">
                        <h3 className="fw-bold">Appointments</h3>
                        <button className="primary-btn-blue1">Add Appointment</button>
                    </div>

                    <div className="d-flex gap3 mar-bottom-1">
                        <Link to={''} 
                        className={`${activeTab === "Pending" ? "primary" : "secondary"}-btn-blue1`}>
                            Pending {pendingAppointments.length > 0 ? pendingAppointments.length : ""}
                        </Link>
                        <Link to={'Approved'} 
                        className={`${activeTab === "Approved" ? "primary" : "secondary"}-btn-blue1`}>
                            Approved {approvedAppointments.length > 0 ? approvedAppointments.length : ""}
                        </Link>
                        <Link to={'Completed'} 
                        className={`${activeTab === "Completed" ? "primary" : "secondary"}-btn-blue1`}>
                            Completed {completedAppointments.length > 0 ? completedAppointments.length : ""}
                        </Link>
                        <Link to={'Cancelled'} 
                        className={`${activeTab === "Cancelled" ? "primary" : "secondary"}-btn-blue1`}>
                            Cancelled {canceledAppointments.length > 0 ? canceledAppointments.length : ""}
                        </Link>
                    </div>

                    <Outlet context={{
                        setActiveTab,
                        pendingAppointments, setPendingAppointments,
                        approvedAppointments, setApprovedAppointments,
                        completedAppointments, setCompletedAppointments,
                        canceledAppointments, setCanceledAppointments
                    }}/>
                </>
            )
            : (<Spin size="large"/>)}
        </div>
    );
}