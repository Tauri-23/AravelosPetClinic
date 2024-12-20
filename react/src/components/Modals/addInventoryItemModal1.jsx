import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

export default function AddInventoryItemsModal1({handleAdd, onClose}) {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const minDate = nextWeek.toISOString().split("T")[0];

    const [expiration, setExpiration] = useState("");


    return(
        <div className="modal1">
            <div className="modal-box3">
                <div className="circle-btn1 semi-medium-f">
                    <Icon.X className="pointer" onClick={onClose} />
                </div>
                <h3>Add Inventory Item</h3>

                <label htmlFor="expiration" style={{marginTop: "30px"}}>Expiration Date</label>
                <input type="date" id="expiration" min={minDate} value={expiration} onInput={(e) => setExpiration(e.target.value)} />

                <button className="primary-btn-blue1" style={{marginTop: "30px"}} onClick={() => handleAdd(expiration)}>Add</button>
            </div>
        </div>
    )
}