import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

export default function GeneralConfirmationModal({title, text, positiveBtnText, handlePositiveBtnClick, onClose}) {


    return(
        <div className="modal1">
            <div className="modal-box3">
                <div className="circle-btn1 semi-medium-f">
                    <Icon.X className="pointer" onClick={onClose} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="d-flex gap3" style={{marginTop: "30px"}}>
                    <button className="primary-btn-blue1" onClick={() => onClose()}>Close</button>
                    <button className="primary-btn-blue1" onClick={() => {handlePositiveBtnClick(); onClose()}}>{positiveBtnText}</button>
                </div>
            </div>
        </div>
    )
}