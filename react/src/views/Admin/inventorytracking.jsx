import React, { useEffect, useRef, useState } from 'react'
import "../../assets/css/inventorytracking.css";
import { useOutletContext } from 'react-router-dom';
import InventoryBox from '../../components/inventory_box';
import { fetchAllMedicines } from '../../services/InventoryServices';


export default function AdminInventoryTracking() {
  const [meds, setMeds] = useState(null)

  useEffect(() => {
    const getAll = async() => {
      const data = await fetchAllMedicines();
      setMeds(data);
    }
    
    getAll();
  }, []);

  if(meds) {
    return (
      <div className='content1'>
        <h1>Inventory Tracking</h1>
  
        <div className="d-flex" style={{gap: 80}}>
          <div style={{width: "300px", height: "100vh", background: "aliceblue", padding: 20}}>
            Side Navb
          </div>
  
          {/* Content */}
          <div className='admin-inventory-contents'>
            {meds?.map(med => (
              <InventoryBox key={med.id} med={med} link={"/AdminIndex"}/>
            ))}
          </div>
        </div>
      </div>
    )
  } else {
    return(
      <h1>Loading</h1>
    )
  }
}
