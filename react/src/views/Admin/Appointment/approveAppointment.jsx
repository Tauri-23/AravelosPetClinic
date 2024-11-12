import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import "../../../assets/css/approveAppointment.css";
import { notify } from "../../../assets/js/utils.jsx";
import { useStateContext } from '../../../contexts/ContextProvider';
import { fetchAllAppointments } from '../../../services/AppointmentServices.jsx';
import axiosClient from '../../../axios-client.js';
import { useModal } from '../../../contexts/ModalContext.jsx';
import { isEmptyOrSpaces } from '../../../assets/js/utils.jsx';


export default function ApproveAppointment(recordId) {
const [isStaffSelected, setStaffSelected]= useState(false);

const handleStaffClick = () => {
    setStaffSelected(!isStaffSelected);
};
  return (

    <div className = "page approve-appt inter">
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
                        <button className='primary-btn-blue1 left-margin-s' onClick={(e) => {handleApprovePage(record.id); onClose()}}>
                            Approve Appointment
                        </button>
                    </div>
                </div>
            </div>
            <div className="down top-margin-s d-flex justify-content-between gap-4">
                <div className="left side d-flex flex-column">
                    <div className='details-appt up w-100 d-flex small-form'>
                        <div className="left circle pic s-align-center">
                        </div>
                        <div className="right left-margin align-self-end w-100">
                            <div className="anybody bold semi-small-medium-f">
                                Piola
                            </div>
                            <div className="inter appt-detail-rows small-f">
                                <div className='cont-row d-flex'>
                                    <div className='cont-lbl bold'>Service:</div>
                                    <div className='cont-dtl'>Grooming</div>
                                </div>
                                <div className='cont-row d-flex'>
                                    <div className='cont-lbl bold'>Gender:</div>
                                    <div className='cont-dtl'>Female</div>
                                </div>
                                <div className='cont-row d-flex'>
                                    <div className='cont-lbl bold'>Breed:</div>
                                    <div className='cont-dtl'>Shih Tzu</div>
                                </div>
                                <div className='cont-row d-flex'>
                                    <div className='cont-lbl bold'>Birthdate:</div>
                                    <div className='cont-dtl'>February 12, 2022 (2 yrs old)</div>
                                </div>
                                <div className='cont-row d-flex'>
                                    <div className='cont-lbl bold'>Schedule:</div>
                                    <div className='cont-dtl'>December 3, 2024 at 12:00PM</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='staff-appt down w-100 small-form'>
                        <div className='up bold semi-small-medium-f anybody w-100 border-bottom bottom-margin-s'>
                            Assign Staff
                        </div>
                        <div className="staff-list d-flex">
                            <div className='staff-item d-flex flex-column justify-content-between' onClick={handleStaffClick}>
                                <div className="left circle staff-pic s-align-center">
                                </div>
                                <div>
                                    <div className="anybody bold small-f t-align-center">
                                        Dr. John Doe
                                    </div>
                                    <div className="anybody small-f t-align-center">
                                        Owner
                                    </div>
                                </div>
                            </div>
                            <div className='staff-item d-flex flex-column justify-content-between' onClick={handleStaffClick}>
                                <div className="left circle staff-pic s-align-center">
                                </div>
                                <div>
                                    <div className="anybody bold small-f t-align-center">
                                        Dr. John Doe
                                    </div>
                                    <div className="anybody small-f t-align-center">
                                        Owner
                                    </div>
                                </div>
                            </div>
                            <div className='staff-item d-flex flex-column justify-content-between' onClick={handleStaffClick}>
                                <div className="left circle staff-pic s-align-center">
                                </div>
                                <div>
                                    <div className="anybody bold small-f t-align-center">
                                        Dr. John Doe
                                    </div>
                                    <div className="anybody small-f t-align-center">
                                        Owner
                                    </div>
                                </div>
                            </div>
                            <div className='staff-item d-flex flex-column justify-content-between' onClick={handleStaffClick}>
                                <div className="left circle staff-pic s-align-center">
                                </div>
                                <div>
                                    <div className="anybody bold small-f t-align-center">
                                        Dr. John Doe
                                    </div>
                                    <div className="anybody small-f t-align-center">
                                        Owner
                                    </div>
                                </div>
                            </div>
                            <div className='staff-item d-flex flex-column justify-content-between' onClick={handleStaffClick}>
                                <div className="left circle staff-pic s-align-center">
                                </div>
                                <div>
                                    <div className="anybody bold small-f t-align-center">
                                        Dr. John Doe
                                    </div>
                                    <div className="anybody small-f t-align-center">
                                        Owner
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className='right side'>
                    <div className='small-form inventory-appt'>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
