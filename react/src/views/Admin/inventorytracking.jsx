import React, { useEffect, useRef, useState } from 'react'
import "../../assets/css/inventorytracking.css";
import "../../assets/css/app.css";
import { useOutletContext } from 'react-router-dom';
import InventoryBox from '../../components/inventory_box';
import { fetchAllMedicines } from '../../services/InventoryServices';


export default function AdminInventoryTracking() {
  const [meds, setMeds] = useState(null)

 return(
    <div className='page'>
        <div className=' inventory-tracking gen-margin'>
            <h1>Inventory Tracking</h1>

            <div className="d-flex" style={{gap: 80}}>
                <div style={{width: "300px", height: "100vh", background: "aliceblue", padding: 20, position: "fixed"}}>
                Side Navb
                </div>

                {/* Content */}
                <div className='admin-inventory-contents'>
                <InventoryBox link={"/AdminIndex"}/>
                <InventoryBox link={"/AdminIndex"}/>
                <InventoryBox link={"/AdminIndex"}/>
                <InventoryBox link={"/AdminIndex"}/>
                <InventoryBox link={"/AdminIndex"}/>
                <InventoryBox link={"/AdminIndex"}/>
                <InventoryBox link={"/AdminIndex"}/>

                </div>
            </div>
        </div>
    </div>

        )
}
