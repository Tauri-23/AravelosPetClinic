import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import "../../../assets/css/myappointments.css";
import { useStateContext } from '../../../contexts/ContextProvider';
import { fetchAllClientAppointments } from '../../../services/AppointmentServices.jsx';
import axiosClient from '../../../axios-client.js';
import { fetchAllPetsWhereClient } from '../../../services/PetServices';
import AppointmentRecord from '../../../components/appointmentRecord.jsx';
import { useModal } from '../../../contexts/ModalContext.jsx';
import Button from '../../../components/button.jsx';


export default function MyAppointments() {
    const {showModal} = useModal();
    const { user, userType, token, setUserType, setUser, setToken } = useStateContext();
    const location = useLocation();
    const url = location.pathname;
    const [activeTab, setActiveTab] = useState("Pending");
    const [appointments, setAppointments] = useState([]);
    const [pets, setPets] = useState(null);
    const serviceOptions = [
        { id: "checkup", label: "Check-up" },
        { id: "deworming", label: "Deworming" },
        { id: "grooming", label: "Grooming" },
        { id: "parasiticControl", label: "Parasitic Control" },
        { id: "vaccination", label: "Vaccination" },
    ];

    const handleAppointmentRecordClick = (recordPetName, recordPetPic, recordService, serviceOptions, recordSchedule, recordRequestDate, recordCancelDate, recordApprovedDate, recordRejectDate, recordReason, recordStatus)=> {
        showModal('AppointmentRecordModal1', {recordPetName, recordPetPic, recordService, serviceOptions, recordSchedule, recordRequestDate, recordCancelDate, recordApprovedDate, recordRejectDate, recordReason, recordStatus})
        console.log("Appointment Record Clicked", recordPetName, recordService, serviceOptions, recordSchedule, recordRequestDate, recordCancelDate, recordApprovedDate, recordRejectDate, recordReason, recordStatus);
    }

    useEffect(() => {
        const getAllPets = async() => {
          try {
            const data = await fetchAllPetsWhereClient(user.id);
            setPets(data);
          } catch (error) {
            console.error(error);
          }
        }

        getAllPets();
      }, []);
    useEffect(() => {
        const getAllAppointments = async () => {
            try {
                if (user && user.id) { // Ensure user and user ID exist
                    const data = await fetchAllClientAppointments(user.id); // Pass clientId here
                    setAppointments(data);
                    console.log(data); // Log the received appointments
                } else {
                    console.log("User not found or user ID is missing");
                }
            } catch (error) {
                console.error(error);
            }
        };

        getAllAppointments(); // Call the function directly
    }, [user]); // Add user as a dependency


      const renderHeaders = () => {
        switch (activeTab) {
            case "Pending":
                return (
                    <>
                        <div className='detailHeader column semi-bold'>Pet Name</div>
                        <div className='detailHeader column semi-bold'>Appointment Type</div>
                        <div className='detailHeader column semi-bold'>Requested Schedule</div>
                    </>
                );
            case "Approved":
                return (
                    <>
                        <div className='detailHeader column semi-bold'>Pet Name</div>
                        <div className='detailHeader column semi-bold'>Appointment Type</div>
                        <div className='detailHeader column semi-bold'>Scheduled Date</div>
                        <div className='detailHeader column semi-bold'>Date Approved</div>
                    </>
                );
            case "Completed":
                return (
                    <>
                        <div className='detailHeader column semi-bold'>Pet Name</div>
                        <div className='detailHeader column semi-bold'>Appointment Type</div>
                        <div className='detailHeader column semi-bold'>Date Completed</div>
                    </>
                );
            case "Cancelled":
                return (
                    <>
                        <div className='detailHeader column semi-bold'>Pet Name</div>
                        <div className='detailHeader column semi-bold'>Appointment Type</div>
                        <div className='detailHeader column semi-bold'>Requested Schedule</div>
                        <div className='detailHeader column semi-bold'>Date Cancelled</div>
                        <div className='detailHeader column semi-bold'>Reason</div>
                    </>
                );
            case "Rejected":
                return (
                    <>
                        <div className='detailHeader column semi-bold'>Pet Name</div>
                        <div className='detailHeader column semi-bold'>Appointment Type</div>
                        <div className='detailHeader column semi-bold'>Requested Schedule</div>
                        <div className='detailHeader column semi-bold'>Date Rejected</div>
                        <div className='detailHeader column semi-bold'>Reason</div>
                    </>
                );
            default:
                return null;
        }
    };

  return (

    <div className = "page inter">
        <div className="bg book-appointment gen-margin">
            <div className="mini-nav bottom-margin"><div className="anybody medium-f bold">My Appointments</div><div className="separator left-margin-s right-margin-s"></div><Link to={'../BookAppointment'}><div className="anybody small-f semi-bold">Book Appointment</div></Link></div>
            <div className="myappt small-form bottom-margin-s">
                <div className="text-center">
                    <div className='myappt-navigation d-flex '>
                        <Link to={''} className="anybody semi-bold right-margin">
                            <div onClick={() => setActiveTab("Pending")}>
                                Pending
                                <div className={`nav1-line${activeTab === "Pending" ? " active" : ""}`}></div>
                            </div>
                        </Link>
                        <Link to={''} className="anybody semi-bold right-margin">
                            <div onClick={() => setActiveTab("Approved")}>
                            Approved
                                <div className={`nav1-line${activeTab === "Approved" ? " active" : ""}`}></div>
                            </div>
                        </Link>
                        <Link to={''} className="anybody semi-bold right-margin">
                            <div onClick={() => setActiveTab("Completed")}>
                                Completed
                                <div className={`nav1-line${activeTab === "Completed" ? " active" : ""}`}></div>
                            </div>
                        </Link>
                        <Link to={''} className="anybody semi-bold right-margin">
                            <div onClick={() => setActiveTab("Cancelled")}>
                                Cancelled
                                <div className={`nav1-line${activeTab === "Cancelled" ? " active" : ""}`}></div>
                            </div>
                        </Link>
                        <Link to={''} className="anybody semi-bold right-margin">
                            <div onClick={() => setActiveTab("Rejected")}>
                                Rejected
                                <div className={`nav1-line${activeTab === "Rejected" ? " active" : ""}`}></div>
                            </div>
                        </Link>
                    </div>
                    {/* <div className="anybody medium-f bold">No Appointments</div>
                    <div className="anybody semi-bold">You haven't made any appointments yet.</div>
                    <Link to={'../BookAppointment'}><button className="main-button">Book an Appointment</button></Link> */}
                </div>
            </div>
            <div className="myappt headers small-form d-flex bottom-margin-s">
                {renderHeaders()}
            </div>
            <div className="myappt small-form">
                    {appointments.length > 0 &&
                        appointments.map(record =>
                            record.status === activeTab && (
                                <AppointmentRecord key={record.id} handleAppointmentRecordClick={handleAppointmentRecordClick} recordPetPic={record.petPic} recordPetName={record.petName} recordService={record.service} serviceOptions={serviceOptions} recordSchedule={record.date_time} recordRequestDate={record.created_at} recordCancelDate={record.cancelled_at} recordApprovedDate={record.approved_at} recordRejectDate={record.rejected_at} recordReason={record.reason} recordStatus={record.status}/>
                                // <div className='appt-record' key={record.id}>
                                //     {serviceOptions.find(option => option.id === record.service)?.label}, {record.petName}, {record.date_time}
                                // </div>
                            )
                        )
                    }
            </div>

        </div>
    </div>
  )
}
