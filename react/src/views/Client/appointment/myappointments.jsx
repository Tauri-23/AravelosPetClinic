import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import "../../../assets/css/myappointments.css";
import { notify } from "../../../assets/js/utils.jsx";
import { useStateContext } from '../../../contexts/ContextProvider';
import { fetchAllClientAppointments } from '../../../services/AppointmentServices.jsx';
import axiosClient from '../../../axios-client.js';
import AppointmentRecord from '../../../components/appointmentRecord.jsx';
import { useModal } from '../../../contexts/ModalContext.jsx';
import { isEmptyOrSpaces } from '../../../assets/js/utils.jsx';


export default function MyAppointments() {
    const {showModal} = useModal();
    const { user } = useStateContext();
    const location = useLocation();
    const url = location.pathname;
    const [activeTab, setActiveTab] = useState("Pending");
    const [appointments, setAppointments] = useState([]);



    /**
     * Onmount
     */
    useEffect(() => {
        const getAllAppointments = async () => {
            try {
                const data = await fetchAllClientAppointments(user.id);
                setAppointments(data);
            } catch (error) {
                console.error(error);
            }
        };

        getAllAppointments();
    }, []);



    /**
     * Handlers
     */
    const handleAppointmentRecordClick = (record)=> {
        showModal('AppointmentRecordModal1', {record, handleCancel})
    }
    
    const handleCancel = (recordId) =>{
        const handleFunction = "handleCancelPost";

        if (isEmptyOrSpaces(String(recordId))) {
            console.error("No appointment selected for cancellation.");
            return;
        }

        showModal('ConfirmActionModal1',  {
            handlePost: (recordId, recordReason) => {
                const formData=new FormData();
                formData.append('appointmentId', recordId);
                formData.append('reason', recordReason || 'No reason provided.');
        
                const canceledRecord = appointments.find(record => record.id === recordId);
                console.log(recordId);
                axiosClient.post(`/cancel-appointment`, formData)
                    .then(({ data }) => {
                        if (data.status === 200) {
                            notify('success', data.message, 'top-center', 3000);
                            // Remove the canceled appointment from the current list
                            setAppointments(prev => prev.filter(record => record.id !== recordId));
        
                            // Add the canceled appointment back with status updated to 'Cancelled'
                            setAppointments(prev => [...prev, { ...canceledRecord, status: 'Cancelled', cancelled_at: new Date().toISOString(), reason: recordReason || 'No reason provided.' }]);
        
                            // Optionally switch to the 'Cancelled' tab to reflect the change
                            setActiveTab('Cancelled');
        
        
                            //setAppointments(prev => prev.filter(record => record.id !== recordId)); // Remove the canceled appointment from state
                        } else {
                            notify('error', data.message + record.id, 'top-center', 3000);
                        }
                    }).catch(error => {
                        console.error(error);
                        notify('error', data.message, 'top-center', 3000);
                    });
            }, 
            recordId, 
            handleFunction
        });
    }




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
                                <div className="a-tab" onClick={() => setActiveTab("Pending")}>
                                    Pending
                                    <div className={`nav1-line${activeTab === "Pending" ? " active" : ""}`}></div>
                                </div>
                            </Link>
                            <Link to={''} className="anybody semi-bold right-margin">
                                <div className="a-tab" onClick={() => setActiveTab("Approved")}>
                                Approved
                                    <div className={`nav1-line${activeTab === "Approved" ? " active" : ""}`}></div>
                                </div>
                            </Link>
                            <Link to={''} className="anybody semi-bold right-margin">
                                <div className="a-tab" onClick={() => setActiveTab("Completed")}>
                                    Completed
                                    <div className={`nav1-line${activeTab === "Completed" ? " active" : ""}`}></div>
                                </div>
                            </Link>
                            <Link to={''} className="anybody semi-bold right-margin">
                                <div className="a-tab" onClick={() => setActiveTab("Cancelled")}>
                                    Cancelled
                                    <div className={`nav1-line${activeTab === "Cancelled" ? " active" : ""}`}></div>
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
                                    <AppointmentRecord key={record.id}
                                    handleAppointmentRecordClick={handleAppointmentRecordClick}
                                    record={record}
                                    handleCancel={(e) => handleCancel(record.id, e)}/>
                                )
                            )
                        }
                </div>

            </div>
        </div>
    )
}
