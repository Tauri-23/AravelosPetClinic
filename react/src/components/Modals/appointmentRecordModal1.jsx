import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import Button from '../button';
import { useEffect } from'react';
export default function AppointmentRecordModal1({
    record, onClose, handleCancel
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
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                    timeZone: 'Asia/Manila'
                                })}
                            </div>
                        </div>
                        <div className='btn-row'>
                            <button className='primary-btn-blue1 w-100' onClick={(e) => handleCancel(record.id,record.reason)}>
                                Cancel Appointment
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
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                    timeZone: 'Asia/Manila'
                                })}
                            </div>
                        </div>
                        <div className='btn-row'>
                            <button className='primary-btn-blue1 w-100' onClick={(e) => handleCancel(record.id, record.reason)}>
                                Cancel Appointment
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
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                    timeZone: 'Asia/Manila'
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
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                    timeZone: 'Asia/Manila'
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
            case 'Rejected':
                return (
                    <div className='flex-grow'>
                        <div className='schedule bold inter d-flex'>
                            Schedule:
                            <div className='left-margin-s normal'>
                                {new Date(record.date_time).toLocaleString('en-US', {
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
                        <div className='date-rejected bold inter d-flex'>
                            Date Rejected:
                            <div className='left-margin-s normal'>
                                {new Date(record.rejected_at).toLocaleString('en-US', {
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
                        <div className='pet-name bold inter d-flex'>Pet: <div className='left-margin-s normal'>{record.pet.name}</div></div>
                        <div className='service bold inter d-flex'>Service: <div className='left-margin-s normal'>{serviceLabel}</div></div>
                        {renderDetails()}
                    </div>
                </div>

            </div>
        </div>
  )
}
