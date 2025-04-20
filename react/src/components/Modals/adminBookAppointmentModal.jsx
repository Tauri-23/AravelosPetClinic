import { Input, Select } from "antd";
import { useState } from "react"

export default function AdminBookAppointmentModal({petTypes, services, handleAddOtcAptPost, onClose}) {
    const [addAptData, setAddAptData] = useState({
        otcClient: "",
        otcPetName: "",
        otcPetType: "",
        otcPetBreed: "",
        service: "",
        serviceType: ""
    });



    /**
     * Handlers
     */
    const handleInputChange = (e) => {
        setAddAptData({...addAptData, [e.target.name]: e.target.value});
    }



    /**
     * Render
     */
    return(
        <div className="modal1">
            <div className="modal-box3">
                <h3>Book Appointment</h3>

                <label htmlFor="otcClient">Client</label>
                <Input 
                name="otcClient" 
                id="otcClient" 
                size="large" 
                value={addAptData.otcClient}
                onChange={handleInputChange}/>

                <label htmlFor="otcPetName">Pet Name</label>
                <Input 
                name="otcPetName" 
                id="otcPetName" 
                size="large" 
                value={addAptData.otcPetName}
                onChange={handleInputChange}/>

                <label htmlFor="otcPetType">Pet Type</label>
                <Select 
                style={{width: "100%"}}
                name="otcPetType" 
                id="otcPetType" 
                size="large" 
                value={addAptData.otcPetType}
                options={[
                    {label: "Select pet types", value: ""},
                    ...petTypes.map(item => ({label: item.type, value: item.id}))
                ]}
                onChange={(value) => handleInputChange({target: {name: "otcPetType", value: value}})}/>
            </div>
        </div>
    )
}