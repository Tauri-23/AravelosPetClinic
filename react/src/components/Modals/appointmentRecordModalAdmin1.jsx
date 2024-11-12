import React from 'react'
import * as Icon from 'react-bootstrap-icons'
export default function AppointmentRecordModalAdmin1({
    record, onClose, handleCancel, handleApprovePage
}) {
    const serviceOptions = [
        { id: "checkup", label: "Check-up" },
        { id: "deworming", label: "Deworming" },
        { id: "grooming", label: "Grooming" },
        { id: "parasiticControl", label: "Parasitic Control" },
        { id: "vaccination", label: "Vaccination" },
    ];
    const serviceLabel = serviceOptions?.find(option => option.id === record.service)?.label || "Unknown Service";
    const renderDetails = () => {
        switch(record.status){
            case 'Pending':
                return (
                    <div className='flex-grow'>
                        <div className='schedule bold inter d-flex'>
                            Schedule:
                            <div className='left-margin-s normal'>
                            {new Date(record.date_time).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                ...(new Date(record.date_time).getHours() === 0 && new Date(record.date_time).getMinutes() === 0
                                    ? {}
                                    : {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                    }),
                            })}
                            </div>
                        </div>
                        <div className='btn-row'>
                            <button className='sub-button right-margin-s w-100' onClick={(e) => handleCancel(record.id,record.reason)}>
                            Cancel Appointment
                            </button>
                            <button className='primary-btn-blue1 left-margin-s w-100' onClick={(e) => {handleApprovePage(record.id); onClose()}}>
                                Approve Appointment
                            </button>
                        </div>
                    </div>
                )
            case 'Approved':
                return (
                    <div className='flex-grow'>
                        <div className='schedule bold inter d-flex'>
                            Schedule:
                            <div className='left-margin-s normal'>
                            {new Date(record.date_time).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                ...(new Date(record.date_time).getHours() === 0 && new Date(record.date_time).getMinutes() === 0
                                    ? {}
                                    : {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                    }),
                            })}
                            </div>
                        </div>
                        <div className='btn-row'>
                            <button className='sub-button right-margin-s w-100' onClick={(e) => handleCancel(record.id,record.reason)}>
                                Cancel Appointment
                            </button>
                            <button className='primary-btn-blue1 left-margin-s w-100' onClick={(e) => handleMComplete(record.id)}>
                                Mark as Completed
                            </button>
                        </div>
                    </div>
                )
            case 'Completed':
                return (
                    <div className='flex-grow'>
                        <div className='schedule bold inter d-flex'>
                            Schedule:
                            <div className='left-margin-s normal'>
                            {new Date(record.date_time).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                ...(new Date(record.date_time).getHours() === 0 && new Date(record.date_time).getMinutes() === 0
                                    ? {}
                                    : {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                    }),
                            })}
                            </div>
                        </div>
                        {/* <div className='btn-row'>
                            <button className='primary-btn-blue1' onClick={onClose}>
                                Cancel Appointment
                            </button>
                        </div> */}
                    </div>
                )
            case 'Cancelled':
                return (
                    <div className='flex-grow'>
                        <div className='schedule bold inter d-flex'>
                            Schedule:
                            <div className='left-margin-s normal'>
                            {new Date(record.date_time).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                ...(new Date(record.date_time).getHours() === 0 && new Date(record.date_time).getMinutes() === 0
                                    ? {}
                                    : {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                    }),
                            })}
                            </div>
                        </div>
                        <div className='date-cancelled bold inter d-flex'>
                            Date Cancelled:
                            <div className='left-margin-s normal'>
                                {new Date(record.cancelled_at).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                    timeZone: 'Asia/Manila'
                                })}
                            </div>
                        </div>
                        <div className='reason bold inter'>
                            Reason:
                            <div className='normal reasonCont'>
                                {record.reason}
                            </div>
                        </div>
                        {/* <div className='btn-row'>
                            <button className='primary-btn-blue1' onClick={onClose}>
                                Cancel Appointment
                            </button>
                        </div> */}
                    </div>
                )
        }
    };
  return (
    <div className="modal1"> {/* Updated modal2 class for consistency */}
            <div className="appRecModal modal-content1">
                <div className="circle-btn1 semi-medium-f">
                    <Icon.X className="pointer" onClick={onClose} />
                </div>
                <div className='semi-bold semi-medium-f anybody border-bottom bottom-margin-s'>Appointment Details</div>
                <div className='d-flex'>
                    <div className='petPictureCont right-margin'><img className="circle petPicture" src={`/assets/media/pets/${record.pet.picture}`}/></div>
                    <div className='appt-details top-margin-s'>
                        <div className='bold inter d-flex'>Pet: <div className='left-margin-s normal'>{record.pet.name}</div></div>
                        <div className='bold inter d-flex'>Gender: <div className='left-margin-s normal'>{record.pet.gender.charAt(0).toUpperCase() + record.pet.gender.slice(1)}</div></div>
                        <div className='bold inter d-flex'>Breed: <div className='left-margin-s normal'>{record.pet.breed.charAt(0).toUpperCase() + record.pet.breed.slice(1)}{" "}({record.pet.type})</div></div>
                        <div className='bold inter d-flex'>Birthdate: <div className='left-margin-s normal'>{new Date(record.pet.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}{' '}
                        ({new Date().getFullYear() - new Date(record.pet.dob).getFullYear() - (new Date().getMonth() < new Date(record.pet.dob).getMonth() || (new Date().getMonth() === new Date(record.pet.dob).getMonth() && new Date().getDate() < new Date(record.pet.dob).getDate()) ? 1 : 0)} yrs old)</div></div>
                        <div className='service bold inter d-flex'>Service: <div className='left-margin-s normal'>{serviceLabel}</div></div>
                        {renderDetails()}
                    </div>
                </div>

            </div>
        </div>
  )
}
