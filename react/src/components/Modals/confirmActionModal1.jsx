import * as Icon from 'react-bootstrap-icons';
import propTypes from 'prop-types';
import { useEffect } from 'react';

export const ConfirmActionModal1 = ({ handleCancelPost, recordId, recordReason, onClose, handleFunction}) => {

    // useEffect(() => {console.log(listing);}, listing);
    const renderContent = () => {
        switch (handleFunction) {
            case 'handleCancelPost':
                return(
                    <div className="text-center mar-bottom-1 d-flex flex-direction-y ">
                        <div className="text-m1 fw-bold semi-medium-f w-100 anybody">Cancel Appointment?</div><hr></hr>
                        <div className="text-m2 w-100 m-auto">Please provide a reason for cancelling your appointment.</div>

                    </div>
                );
            case 'handleAddPost':
                return <p>Are you sure you want to add this appointment?</p>;
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

                {/* Desc
                <div className="text-center mar-bottom-1 d-flex flex-direction-y ">
                    <div className="text-m1 fw-bold semi-medium-f w-100 anybody">Schedule an Appointment?</div><hr></hr>
                    <div className="text-m2 w-100 m-auto">An appointment will be requested with the clinic. Proceed?</div>
                </div> */}

                {/* Btns */}
                <div className="d-flex flex-direction-x flex-row-reverse gap3">

                    <div
                    onClick={ ()=>{handleCancelPost(recordId, recordReason);}}
                    className="primary-btn-blue1 w-100 text-center"
                    >
                        Yes
                    </div>

                    <div className="sub-button w-100 text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
                        Cancel
                    </div>
                </div>
            </div>


        </div>
    );
};

ConfirmActionModal1.propTypes = {
    onClose: propTypes.func.isRequired,
    handleCancelPost: propTypes.func.isRequired
};
