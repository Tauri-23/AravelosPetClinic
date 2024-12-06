import { useEffect, useState } from "react"
import { fetchAllAppointmentsWhereStatus } from "../../../services/AppointmentServices";
import { useModal } from "../../../contexts/ModalContext";
import { formatDate, isEmptyOrSpaces, notify } from "../../../assets/js/utils";
import { useOutletContext } from "react-router-dom";
import axiosClient from "../../../axios-client";

export default function AdminApprovedAppointments() {
    const {setActiveTab} = useOutletContext();
    const {showModal} = useModal();
    const [appointments, setAppointments] = useState(null);



    /**
     * Fetch All necessary data
     */
    useEffect(() => {
        const getAll = async() => {
            const data = await fetchAllAppointmentsWhereStatus("Approved");
            setAppointments(data);
        }
        setActiveTab("Approved");
        getAll();
    }, []);



    /**
     * Handlers
     */
    const handleAppointmentRecordClick = (record) => {
        showModal('AppointmentRecordModalAdmin1', {record, handleCancel, handleMComplete});
    }
    
    const handleCancel = (recordId) =>{
        console.log(recordId);
        const handleFunction = "handleCancelPost";
        if (isEmptyOrSpaces(String(recordId))) {
            console.error("No appointment selected for cancellation.");
            return;
        }
        showModal('ConfirmActionModal1',  {handlePost:handleCancelPost, recordId, handleFunction});
    }

    const handleCancelPost =(appointmentId, recordReason) => {
        const formData = new FormData();
        formData.append('appointmentId', appointmentId);
        formData.append('reason', recordReason || 'No reason provided.');

        axiosClient.post(`/cancel-appointment`, formData)
        .then(({ data }) => {
            if(data.status === 200) {
                setAppointments(prev => prev.filter(appointment => appointment.id != appointmentId));
            }
            notify(data.status === 200 ? 'status' : 'error', data.message, 'top-center', 3000);
        }).catch(error => {
            console.error(error);
        });
    }

    const handleMComplete = (appointmentId) => {
        const formData = new FormData();
        formData.append('appointmentId', appointmentId);

        axiosClient.post(`/m-complete-appointment`, formData)
        .then(({ data }) => {
            console.log(data);
            if(data.status === 200) {
                setAppointments(prev => prev.filter(appointment => appointment.id != appointmentId));
            }
            notify(data.status === 200 ? 'status' : 'error', data.message, 'top-center', 3000);
        }).catch(error => {
            console.error(error);
        });
    }



    /**
     * Render
     */
    return(
        <>
            <div className="myappt headers small-form d-flex bottom-margin-s">
                <div className='detailHeader column semi-bold'>Pet Name</div>
                <div className='detailHeader column semi-bold'>Appointment Type</div>
                <div className='detailHeader column semi-bold'>Scheduled Date</div>
                <div className='detailHeader column semi-bold'>Date Approved</div>
            </div>
            <div className="myappt small-form">
                    {!appointments && (
                        <>Loading...</>
                    )}
                    
                    {appointments?.length > 0 && appointments.map(appointment => (
                        <div key={appointment.id} className='appt-record-four approved' onClick={() => handleAppointmentRecordClick(appointment)}>
                            <div className='content-deet'>{appointment.pet.name}</div>
                            <div className='content-deet'>{appointment.service}</div>
                            <div className='content-deet'>{formatDate(appointment.date_time)}</div>
                            <div className='content-deet'>{formatDate(appointment.approved_at)}</div>
                        </div>
                    ))}

                    {appointments?.length < 1 && (
                        <>No Appointments</>
                    )}
            </div>
        </>
    )
}