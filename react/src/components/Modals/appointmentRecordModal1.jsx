import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import Button from '../button';
export default function AppointmentRecordModal1({recordPetName, recordPetPic, recordService, serviceOptions, recordSchedule, recordRequestDate, recordCancelDate, recordApprovedDate, recordRejectDate, recordReason, recordStatus, onClose, handleCancel}) {
    const serviceLabel = serviceOptions?.find(option => option.id === recordService)?.label || "Unknown Service";
    const renderDetails = () => {
        switch(recordStatus){
            case 'Pending':
                return (
                    <div className='flex-grow'>
                        <div className='schedule bold inter d-flex'>
                            Schedule:
                            <div className='left-margin-s normal'>
                                {new Date(recordSchedule).toLocaleString('en-US', {
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
                            <button className='primary-btn-blue1 w-100' onClick={handleCancel}>
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
                                {new Date(recordSchedule).toLocaleString('en-US', {
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
                            <button className='primary-btn-blue1 w-100' onClick={onClose} handleCancel={handleCancel}>
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
                                {new Date(recordSchedule).toLocaleString('en-US', {
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
                                {new Date(recordSchedule).toLocaleString('en-US', {
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
                                {new Date(recordCancelDate).toLocaleString('en-US', {
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
                                {recordReason}
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
                                {new Date(recordSchedule).toLocaleString('en-US', {
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
                                {new Date(recordRejectDate).toLocaleString('en-US', {
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
                                {recordReason}
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
            <div className="modal-content1">
                <div className="circle-btn1 semi-medium-f">
                    <Icon.X className="pointer" onClick={onClose} />
                </div>
                <div className='semi-bold semi-medium-f anybody border-bottom bottom-margin-s'>Appointment Details</div>
                <div className='d-flex'>
                    <div className='petPictureCont right-margin'><img className="circle petPicture" src={`/assets/media/pets/${recordPetPic}`}/></div>
                    <div className='appt-details top-margin-s'>
                        <div className='pet-name bold inter d-flex'>Pet: <div className='left-margin-s normal'>{recordPetName}</div></div>
                        <div className='service bold inter d-flex'>Service: <div className='left-margin-s normal'>{serviceLabel}</div></div>
                        {renderDetails()}
                    </div>
                </div>

            </div>
        </div>
  )
}
