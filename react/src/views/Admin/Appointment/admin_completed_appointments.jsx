import { useEffect, useState } from "react"
import { fetchAllAppointmentsWhereStatus } from "../../../services/AppointmentServices";
import { useModal } from "../../../contexts/ModalContext";
import { formatDate } from "../../../assets/js/utils";
import { useOutletContext } from "react-router-dom";

export default function AdminCompletedAppointments() {
    const {setActiveTab} = useOutletContext();
    const {showModal} = useModal();
    const [appointments, setAppointments] = useState(null);



    /**
     * Fetch All necessary data
     */
    useEffect(() => {
        const getAll = async() => {
            const data = await fetchAllAppointmentsWhereStatus("Completed");
            setAppointments(data);
        }
        setActiveTab("Completed");
        getAll();
    }, []);



    /**
     * Handlers
     */
    const handleAppointmentRecordClick = (appointment) => {
        showModal('AppointmentRecordModalAdmin1', {appointment, handleCancel, handleApprovePage});
    }
    
    const handleCancel = (recordId) =>{
        const handleFunction = "handleCancelPost";
        if (isEmptyOrSpaces(String(recordId))) {
            console.error("No appointment selected for cancellation.");
            return;
        }
        showModal('ConfirmActionModal1',  {handlePost:handleCancelPost, recordId, handleFunction});
    }



    /**
     * Render
     */
    return(
        <>
            <div className="myappt headers small-form d-flex bottom-margin-s">
                <div className='detailHeader column semi-bold'>Pet Name</div>
                <div className='detailHeader column semi-bold'>Appointment Type</div>
                <div className='detailHeader column semi-bold'>Date Completed</div>
            </div>
            <div className="myappt small-form">
                    {!appointments && (
                        <>Loading...</>
                    )}
                    
                    {appointments?.length > 0 && appointments.map(appointment => (
                        <div key={appointment.id} className='appt-record-three rejected' onClick={() => handleAppointmentRecordClick(appointment)}>
                            <div className='content-deet'>{appointment.pet.name}</div>
                            <div className='content-deet'>{appointment.service}</div>
                            <div className='content-deet'>{formatDate(appointment.completed_at)}</div>
                        </div>
                    ))}

                    {appointments?.length < 1 && (
                        <>No Appointments</>
                    )}
            </div>
        </>
    )
}