import React, { useEffect, useRef, useState } from 'react'
import "../../assets/css/inventorytracking.css";
import { useOutletContext } from 'react-router-dom';


export default function AdminInventoryTracking() {
  const [counter, setCounter] = useState(1); // local
  const {name, setName,
        tempName, setTempName} = useOutletContext(); // Getters and setters from parent

  return (
    <>
      <div>inventoryTracking</div>
      {/* <h1>{counter}</h1>
      <button onClick={() => setCounter(counter+1)}>increment</button>
      <button onClick={() => setCounter(counter-1)}>dec</button> */}

      <h3>{name}</h3>

      <input 
        type="text" 
        value={tempName} 
        onInput={(e) => setTempName(e.target.value)}
        />

      <button onClick={() => setName(tempName)}>change name</button>
    </>
  )
}
