import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../../../assets/css/myappointments.css";
import { notify } from "../../../assets/js/utils.jsx";
import { useStateContext } from '../../../contexts/ContextProvider';
import { fetchAllAppointments } from '../../../services/AppointmentServices.jsx';
import axiosClient from '../../../axios-client.js';
import AppointmentRecordAdmin from '../../../components/appointmentRecordAdmin.jsx';
import { useModal } from '../../../contexts/ModalContext.jsx';
import { isEmptyOrSpaces } from '../../../assets/js/utils.jsx';

export default function Appointments() {
    const {showModal} = useModal();
    const { user } = useStateContext();
    const location = useLocation();
    const url = location.pathname;
    const [activeTab, setActiveTab] = useState("Pending");
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    const serviceOptions = [
        { id: "checkup", label: "Check-up" },
        { id: "deworming", label: "Deworming" },
        { id: "grooming", label: "Grooming" },
        { id: "parasiticControl", label: "Parasitic Control" },
        { id: "vaccination", label: "Vaccination" },
    ];

    useEffect(() => {
        const getAllAppointments = async () => {
            try {
                const data = await fetchAllAppointments();
                setAppointments(data);
                console.log(data); // Log the received appointments
            } catch (error) {
                console.error(error);
            }
        };

        getAllAppointments();
    }, []);


    /*
    | Debugging
    */
    useEffect(() => {
        console.log(appointments);
    }, [appointments])




    
    
    const handleApprovePost =(recordId) => {

        const formData=new FormData();
        formData.append('appointmentId', recordId);

        const approvedRecord = appointments.find(record => record.id === recordId);
        console.log(recordId);
        axiosClient.post(`/approve-appointment`, formData)
        .then(({ data }) => {
            if (data.status === 200) {
                notify('success', data.message, 'top-center', 3000);
                setAppointments(prev => prev.filter(record => record.id !== recordId));

                setAppointments(prev => [...prev, { ...approvedRecord, status: 'Approved', approved_at: new Date().toISOString()}]);

                setActiveTab('Approved');


            } else {
                notify('error', data.message + record.id, 'top-center', 3000);
            }
        }).catch(error => {
            console.error(error);
            notify('error', data.message, 'top-center', 3000);
        });
    }

    const handleCancelPost =(recordId, recordReason) => {

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
    }

    const handleApprovePage = (recordId) =>{
        navigate(`/AdminIndex/ClinicCalendar/ApproveAppointment/${recordId}`);
    }

    const renderHeaders = () => {
        switch (activeTab) {
            case "Pending":
                return (
                    <>
                    </>
                );
            case "Approved":
                return (
                    <>
                    </>
                );
            case "Completed":
                return (
                    <>
                    </>
                );
            case "Cancelled":
                return (
                    <>
                    </>
                );
            default:
                return null;
        }
    };


    
    /**
     * Render
     */
    return (
        <div className = "page inter">
            
        </div>
    )
}
