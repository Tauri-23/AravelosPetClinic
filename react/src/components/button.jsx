import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "../assets/css/button.css";
import ModalBox from './modal_box';  // Import the dialog

const Button = ({
    label,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    style = {},
    validate,
    modalHeader,
    modalText,
    leftBTN,
    rightBTN,
    leftBTNLBL,
    rightBTNLBL
}) => {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        // Ensure validate is a function and call it
        if (typeof validate === 'function' && validate()) {
            setShowModal(true); // Opens the dialog, no submit happens yet
        }
    };

    // Confirms the action and triggers onClick
    const handleConfirm = () => {
        setShowModal(false);  // Close dialog
        onClick();  // Trigger the passed onClick function
    };

    // Cancels the action and closes the dialog
    const handleCancel = () => {
        setShowModal(false);  // Close the dialog without submitting
    };

    return (
        <>
            <button
                type={type}
                onClick={handleClick}  // Triggers confirmation dialog first
                disabled={disabled}
                className={`custom-button ${className}`}  // Combine base class with passed className
                style={style}
            >
                {label}
            </button>

            {showModal && (
                <ModalBox
                    show={showModal}
                    onConfirm={handleConfirm}  // Pass confirm handler
                    onCancel={handleCancel}  // Pass cancel handler
                    modalHeader={modalHeader} // Pass modalHeader
                    modalText={modalText}     // Pass modalText
                    leftBTN={leftBTN}        // Class for left button
                    rightBTN={rightBTN}      // Class for right button
                    leftBTNLBL={leftBTNLBL}  // Label for left button
                    rightBTNLBL={rightBTNLBL} // Label for right button
                />
            )}
        </>
    );
};

// Prop types for validation
Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    validate: PropTypes.func.isRequired,
    modalHeader: PropTypes.string, // New prop for modal header
    modalText: PropTypes.string, // New prop for modal text
    leftBTN: PropTypes.string, // New prop for left button class
    rightBTN: PropTypes.string, // New prop for right button class
    leftBTNLBL: PropTypes.string, // New prop for left button label
    rightBTNLBL: PropTypes.string, // New prop for right button label
};

export default Button;
