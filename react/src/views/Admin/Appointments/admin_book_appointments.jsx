import { Button, DatePicker, Input, Select, Spin, Steps } from "antd";
import { useEffect, useState } from "react"
import dayjs from 'dayjs';
import { fetchAllPetTypesWithBreeds } from "../../../services/PetServices";
import { fetchAllClinicServices } from "../../../services/ClinicServicesServices";
import { fetchAllStaffs } from "../../../services/StaffServices";
import { fetchAllInventoryItems } from "../../../services/InventoryServices";
import InventoryBox from "../../../components/inventory_box";
import axiosClient from "../../../axios-client";
import { useNavigate } from "react-router-dom";

export default function AdminBookAppointment() {
    const navigate = useNavigate();
    const [petTypes, setPetTypes] = useState(null);
    const [services, setServices] = useState(null);
    
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Step 1",
            description: "Appointment Information"
        },
        {
            title: "Step 2",
            description: "Assign Staffs and Items"
        }
    ]

    const [addAptData, setAddAptData] = useState({
        otcClient: "",
        otcPetName: "",
        otcPetType: "",
        otcPetBreed: "",
        service: "",
        serviceType: "",
        date: ""
    });

    const [staffs, setStaffs] = useState(null);
    const [inventoryItems, setInventoryItems] = useState(null);

    const [selectedStaffs, setSelectedStaffs] = useState([]);
    const [selectedItems, setselectedItems] = useState([]);
    



    /**
     * Disables
     */
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



    /**
     * Onmount
     */
    useEffect(() => {
        const getAll = async() => {
            const [petTypesDb, serviceTypesDb, staffsDb, inventoryItemsDb] = await Promise.all([
                fetchAllPetTypesWithBreeds(),
                fetchAllClinicServices(),
                fetchAllStaffs(),
                fetchAllInventoryItems()
            ]);

            setPetTypes(petTypesDb);
            setServices(serviceTypesDb);
            setStaffs(staffsDb);
            setInventoryItems(inventoryItemsDb);
        }

        getAll();
    }, []);



    /**
     * Handlers
     */
    const handleInputChange = (e) => {
        const value = e.target.name === "date" 
        ? `${new Date(e.target.value).getFullYear()}-${new Date(e.target.value).getMonth() + 1}-${new Date(e.target.value).getDate()}` : e.target.value;

        setAddAptData({...addAptData, [e.target.name]: value});
    }

    const handleAssignStaff = (staff) => {
        setSelectedStaffs(prev =>
            prev.some(prevStaff => prevStaff.id === staff.id)
            ? prev.filter(prevStaff => prevStaff.id !== staff.id) // Remove staff if already selected
            : [...prev, staff] // Add staff if not already selected
        );
    }

    const handleAssignItem = (item) => {
        if(item.qty < 1) {
            return;
        }

        // Decrement the qty in inventoryItems
        setInventoryItems(prev =>
            prev.map(prevItem =>
                prevItem.id === item.id
                    ? { ...prevItem, qty: prevItem.qty - 1 } // Safely decrement qty
                    : prevItem
            )
        );

        setselectedItems(prev => {
            const existingItemIndex = prev.findIndex(prevItem => prevItem.id === item.id);

            if (existingItemIndex !== -1) {
                // Increment `selected_qty` for existing item
                const updatedItems = [...prev];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    selected_qty: updatedItems[existingItemIndex].selected_qty + 1,
                };
                return updatedItems;
            } else {
                // Add new item with `selected_qty` set to 1
                return [...prev, { ...item, selected_qty: 1 }];
            }
        });
    };

    const handleDeselectItem = (item) => {
        setselectedItems(prev => {
            // Remove the deselected item
            return prev.filter(prevItem => prevItem.id !== item.id);
        });

        const selectedItemQty = selectedItems.find(prevItem => prevItem.id === item.id)?.selected_qty || 0;

        // Restore inventory separately
        updateInventoryItemQty(item.id, selectedItemQty);
    };

    const updateInventoryItemQty = (itemId, qtyToAdd) => {
        setInventoryItems(prev =>
            prev.map(prevItem =>
                prevItem.id === itemId
                    ? { ...prevItem, qty: prevItem.qty + qtyToAdd }
                    : prevItem
            )
        );
    };

    const handleAddOtcAptPost = () => {
        const formData = new FormData();
        formData.append("otcApt", JSON.stringify(addAptData));

        selectedStaffs.forEach(staff => {
            formData.append('staffs[]', staff.id);
        });

        selectedItems.forEach(item => {
            formData.append('items[]', JSON.stringify({id:parseInt(item.id), qty: item.selected_qty}));
        })

        axiosClient.post("/create-otc-appointment", formData)
        .then(({data}) => {
            if(data.status === 200) {
                navigate("/AdminIndex/Appointments/Approved")
            }
            notify(data.status === 200 ? "success" : "error", data.message, "top-center", 3000);
        })
        .catch(error => {
            console.error(error);
            notify("error", "Server Error", "top-center", 3000);
        })
    }



    /**
     * Render
     */
    return(
        <div className="content1 compressed">
            {(petTypes && services) 
            ? (
                <>
                    <Steps
                    current={step}
                    items={steps}
                    className="mar-bottom-1"
                    labelPlacement="vertical"/>

                    {/* Step 1 */}
                    {step === 0 && (
                        <div>
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
                            onClick={() => setStep(prev => prev + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    )}


                    {/* Step 2 */}
                    {step === 1 && (
                        <>
                            <div className="d-flex mar-bottom-1 gap3 justify-content-end">
                                <Button size="large" onClick={() => setStep(prev => prev - 1)}>Back</Button>
                                <Button type="primary" size="large" onClick={handleAddOtcAptPost}>Book Appointment</Button>
                            </div>

                            <div className="d-flex gap1">
                                {/* LEFT SIDE */}
                                <div className="w-100">
                        
                                    {/* Assign Staffs */}
                                    <div className="appointment-cont1 w-100 mar-bottom-1">
                                        <h4>Assign Staff</h4>
                                        <hr className="mar-y-3"/>
                        
                                        {/* STAFFS */}
                                        <div 
                                        className="d-flex flex-wrap gap3"
                                        style={{
                                            padding: 5,
                                            maxHeight: 500,
                                            overflowY: "auto"
                                        }}>
                                            {staffs
                                            ? (
                                                staffs.map(staff => (
                                                    <div 
                                                    className="appointment-staff-card"
                                                    onClick={() => handleAssignStaff(staff)}
                                                    >
                                                        <div className="appointment-staff-card-pfp">
                                                            <img src={`/assets/media/pfp/${staff.picture}`} alt="staff pfp" />
                                                        </div>
                                                        <div>
                                                            <h5>{staff.fname} {staff.lname}</h5>
                                                            <small>{staff.role.role}</small>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                            : (<Spin size="large"/>)}
                                        </div>
                                    </div>
                        
                                    {/* Assign Items */}
                                    <div className="appointment-cont1 w-100">
                                        <h4>Assign Items</h4>
                                        <hr className="mar-y-3"/>
                        
                                        {/* STAFFS */}
                                        <div 
                                        className="d-flex flex-wrap gap3"
                                        style={{
                                            padding: 5,
                                            maxHeight: 500,
                                            overflowY: "auto"
                                        }}>
                                            {inventoryItems
                                            ? (
                                                inventoryItems.map(item => (
                                                    <InventoryBox
                                                        key={item.id}
                                                        handleInventoryBoxClick={() => handleAssignItem(item)}
                                                        itemName={item.name}
                                                        itemImage={item.picture}
                                                        itemQuantity={item.qty}
                                                        itemDescription={item.desc}
                                                    />
                                                ))
                                            )
                                            : (<Spin size="large"/>)}
                                        </div>
                                    </div>
                                </div>
                        
                                {/* RIGHT SIDE */}
                                <div className="w-100">
                                    {/* Assigned Staffs */}
                                    <div 
                                    className="appointment-cont1 w-100 mar-bottom-1"
                                    style={{
                                        height: 400,
                                        overflowY: "auto"
                                    }}
                                    >
                                        <h4>Assigned Staffs</h4>
                                        {selectedStaffs.length < 1
                                        ? (
                                            <>Assign a staff for this appointment</>
                                        )
                                        : (
                                            selectedStaffs.map(selectedStaff => (
                                                <div key={selectedStaff.id} className='d-flex align-items-center w-100 justify-content-between' style={{marginBottom: "20px"}}>
                                                    <div className='d-flex align-items-center gap1'>
                                                        <div className="left circle staff-pic">
                                                            <img className='position-absolute h-100' src={`/assets/media/pfp/${selectedStaff.picture}`} alt="pfp"/>
                                                        </div>
                                                        <div>
                                                            <div className="small-f fw-bold">{selectedStaff.fname} {selectedStaff.lname}</div>
                                                            <div className="semi-small-f">{selectedStaff.role.role}</div>
                                                        </div>
                                                    </div>
                                                    <button className='primary-btn-red1' onClick={() => handleAssignStaff(selectedStaff)}>Unassign</button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                        
                                    {/* Assigned Items */}
                                    <div 
                                    className="appointment-cont1 w-100"
                                    style={{
                                        height: 400,
                                        overflowY: "auto"
                                    }}
                                    >
                                        <h4>Assigned Items</h4>
                                        {selectedItems.length < 1
                                        ? (
                                            <>Assign items for this appointment</>
                                        )
                                        : (
                                            selectedItems.map(selectedItem => (
                                                <div key={selectedItem.id} className='d-flex align-items-center w-100 justify-content-between' style={{marginBottom: "20px"}}>
                                                    <div className='d-flex align-items-center gap1'>
                                                        <div className="left circle staff-pic">
                                                            <img className='position-absolute h-100' src={`/assets/media/items/${selectedItem.picture}`} alt="pfp"/>
                                                        </div>
                                                        <div>
                                                            <div className="small-f fw-bold">{selectedItem.name}</div>
                                                            <div className="semi-small-f">{selectedItem.selected_qty}</div>
                                                        </div>
                                                    </div>
                                                    <button className='primary-btn-red1' onClick={() => handleDeselectItem(selectedItem)}>Remove</button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )
            : (<Spin size="large"/>)}
            
        </div>
    )
}