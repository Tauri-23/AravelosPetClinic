import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { fetchAllAppointmentsWhereStatus } from "../../../services/AppointmentServices";
import { Spin } from "antd";
import { notify } from "../../../assets/js/utils";
import { useModal } from "../../../contexts/ModalContext";
import axiosClient from "../../../axios-client";
import { fetchAllPetTypesWithBreeds } from "../../../services/PetServices";
import { fetchAllClinicServices } from "../../../services/ClinicServicesServices";

export default function AdminAppointmentDefault() {
    const {showModal} = useModal();

    const {setActiveNavLink} = useOutletContext();
    const [activeTab, setActiveTab] = useState("Pending");
    const [pendingAppointments, setPendingAppointments] = useState(null);
    const [approvedAppointments, setApprovedAppointments] = useState(null);
    const [completedAppointments, setCompletedAppointments] = useState(null);
    const [canceledAppointments, setCanceledAppointments] = useState(null);

    const [petTypes, setPetTypes] = useState(null);
    const [services, setServices] = useState(null);


    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Appointments");

        const getAll = async() => {
            try {
                const [pendingDb, approvedDb, completedDb, cancelledDb, petTypesDb, serviceTypesDb] = await Promise.all([
                    fetchAllAppointmentsWhereStatus("Pending"),
                    fetchAllAppointmentsWhereStatus("Approved"),
                    fetchAllAppointmentsWhereStatus("Completed"),
                    fetchAllAppointmentsWhereStatus("Cancelled"),
                    fetchAllPetTypesWithBreeds(),
                    fetchAllClinicServices()
                ]);
                setPendingAppointments(pendingDb);
                setApprovedAppointments(approvedDb);
                setCompletedAppointments(completedDb);
                setCanceledAppointments(cancelledDb);
                setPetTypes(petTypesDb);
                setServices(serviceTypesDb);
            } catch (error) {
                notify("error", "Something went wrong.")
                console.error(error);
            }
        }
        getAll();
    }, []);



    /**
     * Handlers
     */
    const handleAddOtcApt = () => {
        showModal("AdminBookAppointmentModal", {
            petTypes,
            services,
            handleAddOtcAptPost: (data) => {
                const formData = new FormData();
                formData.append("otcClient", data.otcClient);
                formData.append("otcPetName", data.otcPetName);
                formData.append("otcPetType", data.otcPetType);
                formData.append("otcPetBreed", data.otcPetBreed);
                formData.append("service", data.service);
                formData.append("serviceType", data.serviceType);

                axiosClient.post("/create-otc-appointment", formData)
                .then(({data}) => {
                    if(data.status === 200) {
                        setPendingAppointments(data.pendingAppointments);
                    }
                    notify(data.status === 200 ? "success" : "error", data.message, "top-center", 3000);
                })
                .catch(error => {
                    console.error(error);
                    notify("error", "Server Error", "top-center", 3000);
                })
            }
        })
    }



    /**
     * Render
     */
    return(
        <div className="content1 compressed">
            {(pendingAppointments !== null && approvedAppointments !== null && 
            completedAppointments !== null && canceledAppointments !== null && 
            petTypes && services)
            ? (
                <>
                    <div className="mar-bottom-1 d-flex justify-content-between align-items-center">
                        <h3 className="fw-bold">Appointments</h3>
                        <button className="primary-btn-blue1" onClick={handleAddOtcApt}>Add Appointment</button>
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
    )
}