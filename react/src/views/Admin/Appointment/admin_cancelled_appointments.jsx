import { useEffect, useState } from "react"
import { fetchAllAppointmentsWhereStatus } from "../../../services/AppointmentServices";
import { useModal } from "../../../contexts/ModalContext";
import { formatDate } from "../../../assets/js/utils";
import { useOutletContext } from "react-router-dom";

export default function AdminCancelledAppointments() {
    const {setActiveTab} = useOutletContext();
    const {showModal} = useModal();
    const [appointments, setAppointments] = useState(null);



    /**
     * Fetch All necessary data
     */
    useEffect(() => {
        const getAll = async() => {
            const data = await fetchAllAppointmentsWhereStatus("Cancelled");
            setAppointments(data);
        }
        setActiveTab("Cancelled")
        getAll();
    }, []);



    /**
     * Handlers
     */
    const handleAppointmentRecordClick = (record) => {
        showModal('AppointmentRecordModalAdmin1', {record, handleCancel});
    }

    const handleApprovePage = (recordId) =>{
        navigate(`/AdminIndex/ClinicCalendar/ApproveAppointment/${recordId}`);
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



    /**
     * Render
     */
    return(
        <>
            <div className="myappt headers small-form d-flex bottom-margin-s">
                <div className='detailHeader column semi-bold'>Pet Name</div>
                <div className='detailHeader column semi-bold'>Appointment Type</div>
                <div className='detailHeader column semi-bold'>Requested Schedule</div>
                <div className='detailHeader column semi-bold'>Date Cancelled</div>
                <div className='detailHeader column semi-bold'>Reason</div>
            </div>
            <div className="myappt small-form">
                    {!appointments && (
                        <>Loading...</>
                    )}

                    {appointments?.length > 0 && appointments.map(appointment => (
                        <div key={appointment.id} className='appt-record-five rejected' onClick={() => handleAppointmentRecordClick(appointment)}>
                            <div className='content-deet'>{appointment.pet.name}</div>
                            <div className='content-deet'>{appointment.service}</div>
                            <div className='content-deet'>{appointment.date_time}</div>
                            <div className='content-deet'>{formatDate(appointment.cancelled_at)}</div>
                            <div className='content-deet'>{appointment.reason}</div>
                        </div>
                    ))}

                    {appointments?.length < 1 && (
                        <>No Appointments</>
                    )}
            </div>
        </>
    )
}
