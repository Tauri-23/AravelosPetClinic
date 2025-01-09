import React, { useState } from 'react'
import * as Icon from 'react-bootstrap-icons'
import axiosClient from '../../axios-client';
import { isEmptyOrSpaces, notify } from '../../assets/js/utils';
import { useStateContext } from '../../contexts/ContextProvider';
export default function AppointmentRecordModal1({
    record, onClose, handleCancel
}) {
    const {user} = useStateContext()
    const serviceOptions = [
        { id: "checkup", label: "Check-up" },
        { id: "deworming", label: "Deworming" },
        { id: "grooming", label: "Grooming" },
        { id: "parasiticControl", label: "Parasitic Control" },
        { id: "vaccination", label: "Vaccination" },
    ];
    const serviceLabel = serviceOptions?.find(option => option.id === record.service)?.label || "Unknown Service";
    const [isPostFeedbackOpen, setPostFeedback] = useState(false);
    const [_record, _setRecord] = useState(record);
    const [feedback, setFeedback] = useState('');



    /**
     * Handlers
     */
    const handlePostFeedback = () => {
        const formData = new FormData();
        formData.append('client', user.id);
        formData.append('appointment', record.id);
        formData.append('feedback', feedback);

        axiosClient.post('/post-feedback', formData)
        .then(({data}) => {
            if(data.status === 200) {
                _setRecord(data.appointment);
                setPostFeedback(false);
            }
            notify(data.status === 200 ? "success" : "error", data.message, "top-center", 3000);
        }).catch(error => {
            console.error(error);
        })
    }



    /**
     * 
     */
    const renderDetails = () => {
        switch(_record.status){
            case 'Pending':
                return (
                    <div className='flex-grow'>
                        <div className='schedule bold inter d-flex'>
                            Schedule:
                            <div className='left-margin-s normal'>
                            {new Date(_record.date_time).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                ...(new Date(_record.date_time).getHours() === 0 && new Date(_record.date_time).getMinutes() === 0
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
                            <button className='primary-btn-blue1 w-100' onClick={(e) => handleCancel(_record.id,_record.reason)}>
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
                            {new Date(_record.date_time).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                ...(new Date(_record.date_time).getHours() === 0 && new Date(_record.date_time).getMinutes() === 0
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
                            <button className='primary-btn-blue1 w-100' onClick={(e) => handleCancel(_record.id, _record.reason)}>
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
                            {new Date(_record.date_time).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                ...(new Date(_record.date_time).getHours() === 0 && new Date(_record.date_time).getMinutes() === 0
                                    ? {}
                                    : {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                    }),
                            })}
                            </div>
                        </div>

                        {isPostFeedbackOpen && (
                            <div>
                                <label htmlFor='feedbackIn' className='fw-bold'>Post your feedback:</label>
                                <textarea 
                                id="feedbackIn"
                                value={feedback}
                                onInput={(e) => setFeedback(e.target.value)}/>

                                <div className="d-flex">
                                    <button className="sub-button"
                                    onClick={() => setPostFeedback(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                    disabled={isEmptyOrSpaces(feedback)}
                                    className={`primary-btn-blue1 ${isEmptyOrSpaces(feedback) ? 'disabled' : ''}`}
                                    onClick={handlePostFeedback}
                                    >
                                        Post Feedback
                                    </button>
                                </div>
                            </div>
                        )}

                        {(!isPostFeedbackOpen && !_record.feedback) && (
                            <div className='btn-row'>
                                <button className='primary-btn-blue1' 
                                onClick={() => setPostFeedback(true)}>
                                    Post a Feedback
                                </button>
                            </div>
                        )}

                        {_record.feedback && (
                            <div>
                                <div className="fw-bold">Feedback:</div>
                                <textarea 
                                id="feedbackIn"
                                value={_record.feedback.content}
                                disabled/>
                            </div>
                        )}
                    </div>
                )
            case 'Cancelled':
                return (
                    <div className='flex-grow'>
                        <div className='schedule bold inter d-flex'>
                            Schedule:
                            <div className='left-margin-s normal'>
                            {new Date(_record.date_time).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                ...(new Date(_record.date_time).getHours() === 0 && new Date(_record.date_time).getMinutes() === 0
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
                                {new Date(_record.cancelled_at).toLocaleString('en-US', {
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
                                {_record.reason}
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
                    <div className='petPictureCont right-margin'><img className="circle petPicture" src={`/assets/media/pets/${_record.pet.picture}`}/></div>
                    <div className='appt-details top-margin-s'>
                        <div className='bold inter d-flex'>Pet: <div className='left-margin-s normal'>{_record.pet.name}</div></div>
                        <div className='bold inter d-flex'>Gender: <div className='left-margin-s normal'>{_record.pet.gender.charAt(0).toUpperCase() + _record.pet.gender.slice(1)}</div></div>
                        <div className='bold inter d-flex'>Breed: <div className='left-margin-s normal'>{_record.pet.breed.charAt(0).toUpperCase() + _record.pet.breed.slice(1)}{" "}({_record.pet.type})</div></div>
                        <div className='bold inter d-flex'>Birthdate: <div className='left-margin-s normal'>{new Date(_record.pet.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}{' '}
                        ({new Date().getFullYear() - new Date(_record.pet.dob).getFullYear() - (new Date().getMonth() < new Date(_record.pet.dob).getMonth() || (new Date().getMonth() === new Date(_record.pet.dob).getMonth() && new Date().getDate() < new Date(_record.pet.dob).getDate()) ? 1 : 0)} yrs old)</div></div>
                        <div className='service bold inter d-flex'>Service: <div className='left-margin-s normal'>{serviceLabel}</div></div>
                        {renderDetails()}
                    </div>
                </div>

            </div>
        </div>
  )
}
