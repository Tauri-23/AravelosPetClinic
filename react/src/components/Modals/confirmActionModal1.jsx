import * as Icon from 'react-bootstrap-icons';
import propTypes from 'prop-types';
import { useState } from "react";
import { useEffect, useRef } from 'react';

export const ConfirmActionModal1 = ({ handlePost, recordId, onClose, handleFunction}) => {
    // useEffect(() => {console.log(listing);}, listing);
    const [recordReason, setReason] = useState(''); // State for cancellation reason
    const renderContent = () => {
        switch (handleFunction) {
            // FOR CANCEL APPOINTMENT
            case 'handleCancelPost':
                return(
                    <>
                    <div className="text-center mar-bottom-1 d-flex flex-direction-y ">
                        <div className="text-m1 fw-bold semi-medium-f w-100 anybody">Cancel Appointment?</div><hr></hr>
                        <div className="text-m2 w-100 m-auto">Please provide a reason for cancelling your appointment.</div>
                        <input type="text"
                        name="reason"
                        placeholder="Reason for cancelling your appointment"
                        value={recordReason}
                        onChange={(e) => setReason(e.target.value)}/>
                    </div>
                    <div className="d-flex flex-direction-x flex-row-reverse gap3">

                        <div onClick={()=> {handlePost(recordId, recordReason); onClose();}} className="primary-btn-blue1 w-100 text-center">
                            Yes
                        </div>
                        <div className="sub-button w-100 text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
                            Cancel
                        </div>
                    </div>
                    </>
                );

            // FOR ADD APPOINTMENT
            case 'handleAddPost':
                return (
                    <>
                        {/* Desc */}
                        <div className="text-center mar-bottom-1 d-flex flex-direction-y ">
                            <div className="text-m1 fw-bold semi-medium-f w-100 anybody">Schedule an Appointment?</div><hr></hr>
                            <div className="text-m2 w-100 m-auto">An appointment will be requested with the clinic. Proceed?</div>
                         </div>

                        {/* Btns */}
                        <div className="d-flex flex-direction-x flex-row-reverse gap3">

                            <div
                            onClick={() => {handlePost(); onClose();}}
                            className="primary-btn-blue1 w-100 text-center"
                            >
                                Yes
                            </div>

                            <div className="sub-button w-100 text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
                                Cancel
                            </div>
                        </div>
                    </>
                )
            case 'handleAddPost':
                return (
                    <>
                        {/* Desc */}
                        <div className="text-center mar-bottom-1 d-flex flex-direction-y ">
                            <div className="text-m1 fw-bold semi-medium-f w-100 anybody">Schedule an Appointment?</div><hr></hr>
                            <div className="text-m2 w-100 m-auto">An appointment will be requested with the clinic. Proceed?</div>
                         </div>

                        {/* Btns */}
                        <div className="d-flex flex-direction-x flex-row-reverse gap3">

                            <div
                            onClick={() => {handlePost(); onClose();}}
                            className="primary-btn-blue1 w-100 text-center"
                            >
                                Yes
                            </div>

                            <div className="sub-button w-100 text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
                                Cancel
                            </div>
                        </div>
                    </>
                )
            case 'handleAddPost':
                return (
                    <>
                        {/* Desc */}
                        <div className="text-center mar-bottom-1 d-flex flex-direction-y ">
                            <div className="text-m1 fw-bold semi-medium-f w-100 anybody">Schedule an Appointment?</div><hr></hr>
                            <div className="text-m2 w-100 m-auto">An appointment will be requested with the clinic. Proceed?</div>
                         </div>

                        {/* Btns */}
                        <div className="d-flex flex-direction-x flex-row-reverse gap3">

                            <div
                            onClick={() => {handlePost(); onClose();}}
                            className="primary-btn-blue1 w-100 text-center"
                            >
                                Yes
                            </div>

                            <div className="sub-button w-100 text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
                                Cancel
                            </div>
                        </div>
                    </>
                )
            case 'handleUpdateProfile':
                return (
                    <>
                        {/* Desc */}
                        <div className="text-center mar-bottom-1 d-flex flex-direction-y ">
                            <div className="text-m1 fw-bold semi-medium-f w-100 anybody">Update Information?</div><hr></hr>
                            <div className="text-m2 w-100 m-auto">Your information will be updated. Proceed?</div>
                         </div>

                        {/* Btns */}
                        <div className="d-flex flex-direction-x flex-row-reverse gap3">

                            <div
                            onClick={() => {handlePost(); onClose();}}
                            className="primary-btn-blue1 w-100 text-center"
                            >
                                Yes
                            </div>

                            <div className="sub-button w-100 text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
                                Cancel
                            </div>
                        </div>
                    </>
                )
            // Add more cases for other functions as needed
            default:
                return <p>Are you sure you want to proceed?</p>;
        }
    };

    return(
        <div className= {`modal1`}>


            {/* Box of modal */}
            <div className="modal-box3 inter">
                <div className="circle-btn1 semi-medium-f bottom-margin-s" >
                    <Icon.X className="pointer" onClick={onClose}/>
                </div>

                {renderContent()}
            </div>


        </div>
    );
};

ConfirmActionModal1.propTypes = {
    onClose: propTypes.func.isRequired,
    handlePost: propTypes.func.isRequired
};
