import React from 'react';
import PropTypes from 'prop-types';
import "../assets/css/modal_box.css"; // Add relevant styles
import { Modal } from 'react-bootstrap'; // Make sure you import Bootstrap's Modal component
import Button from './button'; // Make sure you import the custom button component

const ModalBox = ({ show, onConfirm, onCancel, modalHeader, modalText, leftBTN,rightBTN,leftBTNLBL,rightBTNLBL }) => {
    return (
        <Modal show={show} onHide={onCancel} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Modal.Header closeButton>
                <Modal.Title id="modal-modal-title">{modalHeader}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{modalText}</p>
            </Modal.Body>
            <Modal.Footer>

                <button className={leftBTN} onClick={onCancel}>{leftBTNLBL}</button>
                <button className={rightBTN} onClick={onConfirm}>{rightBTNLBL}</button>
            </Modal.Footer>
        </Modal>

    );
};

ModalBox.propTypes = {
    show: PropTypes.bool.isRequired, // Added prop for modal visibility
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    modalHeader: PropTypes.string.isRequired,
    modalText: PropTypes.string.isRequired,
    leftBTN: PropTypes.string.isRequired,
    rightBTN: PropTypes.string.isRequired,
    leftBTNLBL: PropTypes.string.isRequired,
    rightBTNLBL: PropTypes.string.isRequired,
};

export default ModalBox;
// return (
//     <div className="modal-overlay">
//         <div className="modal-content">
//             <h2>{modalHeader}</h2>
//             <p>{modalText}</p>
//             <div className="modal-buttons">
//                 <button className={leftBTN} onClick={onCancel}>{leftBTNLBL}</button>
//                 <button className={rightBTN} onClick={onConfirm}>{rightBTNLBL}</button>
//             </div>
//         </div>
//     </div>
// );
