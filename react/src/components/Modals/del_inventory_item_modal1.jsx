import { Select } from "antd";
import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

export default function DeleteInventoryItemModal1({handleDelItem, onClose}) {
    const purposeList = ['Patient Care','Dispensed to Client','Internal Use','Disposed','Damaged/Lost'];
    const [purpose, setPurpose] = useState("");

    return(
        <div className="modal1">
            <div className="modal-box3">
                <div className="circle-btn1 semi-medium-f">
                    <Icon.X className="pointer" onClick={onClose} />
                </div>
                <h3>Issue Item</h3>
                {/* <p>Item will be permanently deleted.</p> */}

                <label htmlFor="purpose">Purpose</label>
                <Select
                id="purpose"
                style={{width: "100%"}}
                size="large"
                value={purpose}
                options={[
                    {label: "Select purpose", value: ""},
                    ...purposeList.map(item => ({label: item, value: item}))
                ]}
                onChange={(v) => setPurpose(v)}
                />


                <div className="d-flex gap3" style={{marginTop: "30px"}}>
                    <button className="primary-btn-blue1" onClick={() => onClose()}>Close</button>
                    <button 
                    disabled={purpose === ""}
                    className={`primary-btn-red1 ${purpose === "" ? "disabled" : ""}`} 
                    onClick={() => {handleDelItem(purpose); onClose()}}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}