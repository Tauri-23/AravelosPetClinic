import { Button, DatePicker, Input, Select } from "antd";
import { useEffect, useState } from "react"
import dayjs from 'dayjs';

export default function AdminBookAppointmentModal({petTypes, services, handleAddOtcAptPost, onClose}) {
    const [addAptData, setAddAptData] = useState({
        otcClient: "",
        otcPetName: "",
        otcPetType: "",
        otcPetBreed: "",
        service: "",
        serviceType: "",
        date: ""
    });

    const disabledDate = (current) => {
        const today = dayjs().startOf('day');
        const end = today.add(4, 'day'); // today + 3 days
        return (
            current.isBefore(today, 'day') || // too early
            current.isBefore(end, 'day') // 4 after today
        );
    };
    const isBtnDisabled = addAptData.otcClient === "" || addAptData.otcPetName === "" || 
    addAptData.otcPetType === "" || addAptData.otcPetBreed === "" || addAptData.service === "" || 
    (services.filter(x => x.id == addAptData.service)[0].service_types.length > 0 && addAptData.serviceType === "") 
    || addAptData.date === "";

    useEffect(() => {
        console.log(addAptData);
    }, [addAptData]);



    /**
     * Handlers
     */
    const handleInputChange = (e) => {
        const value = e.target.name === "date" 
        ? `${new Date(e.target.value).getFullYear()}-${new Date(e.target.value).getMonth() + 1}-${new Date(e.target.value).getDate()}` : e.target.value;

        setAddAptData({...addAptData, [e.target.name]: value});
    }



    /**
     * Render
     */
    return(
        <div className="modal1">
            <div className="modal-box3">
                <h3 className="mar-bottom-1">Book Appointment</h3>

                <label htmlFor="otcClient">Client</label>
                <Input 
                name="otcClient" 
                id="otcClient" 
                size="large" 
                value={addAptData.otcClient}
                onChange={handleInputChange}
                className="mar-bottom-3"/>

                <label htmlFor="otcPetName">Pet Name</label>
                <Input 
                name="otcPetName" 
                id="otcPetName" 
                size="large" 
                value={addAptData.otcPetName}
                onChange={handleInputChange}
                className="mar-bottom-3"/>

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
                onChange={(value) => handleInputChange({target: {name: "otcPetType", value: value}})}
                className="mar-bottom-3"/>

                {addAptData.otcPetType !== "" && (
                    <>
                        <label htmlFor="otcPetType">Pet Breed</label>

                        <Select 
                        style={{width: "100%"}}
                        name="otcPetBreed" 
                        id="otcPetBreed" 
                        size="large" 
                        value={addAptData.otcPetBreed}
                        options={[
                            {label: "Select pet breeds", value: ""},
                            ...petTypes.filter(x => x.id === addAptData.otcPetType)[0].pet_breeds.map(item => ({label: item.breed, value: item.id}))
                        ]}
                        showSearch
                        filterOption={(input, option) =>
                            option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        onChange={(value) => handleInputChange({target: {name: "otcPetBreed", value: value}})}
                        className="mar-bottom-3"/>
                    </>
                )}

                <label htmlFor="service">Service</label>
                <Select 
                style={{width: "100%"}}
                name="service" 
                id="service" 
                size="large" 
                value={addAptData.service}
                options={[
                    {label: "Select service", value: ""},
                    ...services.map(item => ({label: item.service, value: item.id}))
                ]}
                onChange={(value) => handleInputChange({target: {name: "service", value: value}})}
                className="mar-bottom-3"/>

                {(addAptData.service !== "" && services.filter(x => x.id == addAptData.service)[0].service_types.length > 0) && (
                    <>
                        <label htmlFor="serviceType">Service Type</label>

                        <Select 
                        style={{width: "100%"}}
                        name="serviceType" 
                        id="serviceType" 
                        size="large" 
                        value={addAptData.serviceType}
                        options={[
                            {label: "Select serviceType", value: ""},
                            ...services.filter(x => x.id == addAptData.service)[0].service_types.map(item => ({label: item.service_type, value: item.id}))
                        ]}
                        onChange={(value) => handleInputChange({target: {name: "serviceType", value: value}})}
                        className="mar-bottom-3"/>
                    </>
                )}

                <label htmlFor="date">Appointment Date</label>
                <DatePicker
                id="date"
                name="date"
                size="large"
                style={{width: "100%"}}
                disabledDate={disabledDate}
                onChange={(value) => handleInputChange({target: {name: "date", value: value}})}
                className="mar-bottom-1"/>

                <Button 
                type="primary"
                disabled={isBtnDisabled}
                size="large"
                onClick={() => {handleAddOtcAptPost(addAptData); onClose();}}
                >
                    Book Appointment
                </Button>
            </div>
        </div>
    )
}