import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

export default function AddInventoryItemsModal1({handleAdd, onClose}) {
    const [expiration, setExpiration] = useState("");
    const [qty, setQty] = useState(1);

    // Calculate the date 3 months from now
    const getMinDate = () => {
        const today = new Date();
        today.setMonth(today.getMonth() + 3);

        // Adjust for month overflow (e.g., adding 3 months to Nov 30 could result in an invalid date)
        if (today.getDate() !== new Date(today.getFullYear(), today.getMonth(), today.getDate()).getDate()) {
        today.setDate(0); // Go back to the last day of the previous month
        }

        return today.toISOString().split("T")[0]; // Format as yyyy-mm-dd
    };

    const minDate = getMinDate();


    return(
        <div className="modal1">
            <div className="modal-box3">
                <div className="circle-btn1 semi-medium-f">
                    <Icon.X className="pointer" onClick={onClose} />
                </div>
                <h3>Add Inventory Item</h3>

                <label htmlFor="quantity" style={{marginTop: "30px"}}>Quantity</label>
                <input type="number" id="quantity" min={1} value={qty} onChange={(e) => setQty(e.target.value)} />

                <label htmlFor="expiration" style={{marginTop: "10px"}}>Expiration Date</label>
                <input type="date" id="expiration" min={minDate} value={expiration} onInput={(e) => setExpiration(e.target.value)} />

                <button className="primary-btn-blue1" style={{marginTop: "30px"}} onClick={() => handleAdd(expiration, qty)}>Add</button>
            </div>
        </div>
    )
}