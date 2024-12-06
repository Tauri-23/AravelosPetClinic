import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../../../assets/css/approveAppointment.css";
import { fetchAppointmentDetails } from '../../../services/AppointmentServices';
import { fetchAllStaffs } from '../../../services/StaffServices.jsx';
import { formatDate, getAge, isEmptyOrSpaces, notify } from '../../../assets/js/utils.jsx';


export default function ApproveAppointment() {
    const {appointmentId} = useParams();

    const [selectedStaff, setSelectedStaff] = useState(null);

    const [staffs, setStaffs] = useState(null);
    const [appointment, setAppointment] = useState(null);


    /**
     * Fetch All necessary data
     */
    useEffect(() => {
        const getAll = async() => {
            try {
                const [appointmentDb, staffsDb] = await Promise.all([
                    fetchAppointmentDetails(appointmentId),
                    fetchAllStaffs()
                ]);
                setStaffs(staffsDb);
                setAppointment(appointmentDb);
            } catch (error) {
                console.error(error);
            }
        }

        getAll();
    }, []);



    /**
     * Debugging
     */
    useEffect(() => {
        console.log(selectedStaff)
    }, [selectedStaff]);



    /**
     * Handlers
     */
    const handleApprovePage = (appointmentId) => {
        const formData = new FormData();
        formData.append('appointmentId', appointmentId);

        axiosClient.post(`/approve-appointment`, formData)
        .then(({ data }) => {
            if (data.status === 200) {

            }

            notify(data.status === 200 ? 'success' : 'error', data.message, 'top-center', 3000);
        }).catch(error => {
            console.error(error);
            notify('error', data.message, 'top-center', 3000);
        });
    }



    /**
     * Render
     */
    return (
        <div className = "page approve-appt inter">
            {staffs && appointment
            ?(
                <>
                    <div className="gen-margin bg">
                        <div className='up'>
                            <div className="title-buttons d-flex justify-content-between w-100">
                                <div className='anybody bold medium-f'>
                                    Approve Appointment
                                </div>
                                <div className="d-flex">
                                    <button className='sub-button right-margin-s' onClick={(e) => handleCancel(record.id,record.reason)}>
                                        Cancel Appointment
                                    </button>
                                    <button 
                                    disabled={!selectedStaff}
                                    className={`primary-btn-blue1 ${selectedStaff ? "" : "disabled"} left-margin-s`} 
                                    onClick={() => handleApprovePage(appointment.id)}>
                                        Approve Appointment
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="down top-margin-s d-flex justify-content-between gap-4">

                            {/* Left Side */}
                            <div className="left side d-flex flex-column">

                                {/* Pet Information */}
                                <div className='details-appt up w-100 d-flex small-form'>
                                    <div className="left circle pic s-align-center position-relative d-flex align-items-center justify-content-center overflow-hidden">
                                        <img className='position-absolute h-100' src={`/assets/media/pets/${appointment.pet.picture}`} alt="pfp"/>
                                    </div>
                                    <div className="right left-margin align-self-end w-100">
                                        <div className="anybody bold semi-small-medium-f">
                                            {appointment.pet.name}
                                        </div>
                                        <div className="inter appt-detail-rows small-f">
                                            <div className='cont-row d-flex'>
                                                <div className='cont-lbl bold'>Service:</div>
                                                <div className='cont-dtl'>{appointment.service}</div>
                                            </div>
                                            <div className='cont-row d-flex'>
                                                <div className='cont-lbl bold'>Gender:</div>
                                                <div className='cont-dtl'>{appointment.pet.gender}</div>
                                            </div>
                                            <div className='cont-row d-flex'>
                                                <div className='cont-lbl bold'>Breed:</div>
                                                <div className='cont-dtl'>{appointment.pet.breed}</div>
                                            </div>
                                            <div className='cont-row d-flex'>
                                                <div className='cont-lbl bold'>Birthdate:</div>
                                                <div className='cont-dtl'>{formatDate(appointment.pet.dob)} ({getAge(appointment.pet.dob)} y/o)</div>
                                            </div>
                                            <div className='cont-row d-flex'>
                                                <div className='cont-lbl bold'>Schedule:</div>
                                                <div className='cont-dtl'>{formatDate(appointment.date_time)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Staffs */}
                                <div className='staff-appt down w-100 small-form'>
                                    <div className='up bold semi-small-medium-f anybody w-100 border-bottom bottom-margin-s'>
                                        Available Staffs
                                    </div>
                                    <div className="staff-list d-flex">
                                        {staffs.map(staff => (
                                            <div 
                                            key={staff.id} 
                                            className='staff-item d-flex flex-column justify-content-between' 
                                            onClick={() => setSelectedStaff(staff)}>
                                                <div className="left circle staff-pic m-auto">
                                                    <img className='position-absolute h-100' src={`/assets/media/pfp/${staff.picture}`} alt="pfp"/>
                                                </div>
                                                <div style={{marginTop: "10px"}}>
                                                    <div className="anybody bold small-f t-align-center">
                                                        Dr. {staff.fname} {staff.lname}
                                                    </div>
                                                    <div className="anybody small-f t-align-center">
                                                        {staff.role.role}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                            </div>

                            {/* Right Side */}
                            <div className='right side'>
                                <div className='small-form inventory-appt'>
                                    <div className="semi-small-medium-f" style={{marginBottom: "10px"}}>Assigned Staff</div>
                                    {!selectedStaff
                                    ? (
                                        <>Assign a staff for this appointment</>
                                    )
                                    : (                                        
                                        <div className='d-flex align-items-center w-100 justify-content-between'>
                                            <div className='d-flex align-items-center gap1'>
                                                <div className="left circle staff-pic">
                                                    <img className='position-absolute h-100' src={`/assets/media/pfp/${selectedStaff.picture}`} alt="pfp"/>
                                                </div>
                                                <div>
                                                    <div className="small-f fw-bold">{selectedStaff.fname} {selectedStaff.lname}</div>
                                                    <div className="semi-small-f">{selectedStaff.role.role}</div>
                                                </div>
                                            </div>
                                            <button className='primary-btn-red1' onClick={() => setSelectedStaff(null)}>Unassign</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            :(
                <>Loading...</>
            )}
        </div>
    )
}
