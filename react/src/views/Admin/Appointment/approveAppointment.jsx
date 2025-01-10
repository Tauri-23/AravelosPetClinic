import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "../../../assets/css/approveAppointment.css";
import { fetchAppointmentDetails } from '../../../services/AppointmentServices';
import { fetchAllStaffs } from '../../../services/StaffServices.jsx';
import { formatDate, getAge, isEmptyOrSpaces, notify } from '../../../assets/js/utils.jsx';
import axiosClient from '../../../axios-client.js';
import { fetchAllInventoryItems } from '../../../services/InventoryServices.jsx';
import InventoryBox from '../../../components/inventory_box.jsx';


export default function ApproveAppointment() {
    const navigate = useNavigate();
    const {appointmentId} = useParams();

    const [selectedStaffs, setSelectedStaffs] = useState([]);
    const [selectedItems, setselectedItems] = useState([]);

    const [staffs, setStaffs] = useState(null);
    const [appointment, setAppointment] = useState(null);
    const [inventoryItems, setInventoryItems] = useState(null);



    /**
     * Fetch All necessary data
     */
    useEffect(() => {
        const getAll = async() => {
            try {
                const [appointmentDb, staffsDb, inventoryItemsDb] = await Promise.all([
                    fetchAppointmentDetails(appointmentId),
                    fetchAllStaffs(),
                    fetchAllInventoryItems()
                ]);
                setStaffs(staffsDb);
                setAppointment(appointmentDb);
                setInventoryItems(inventoryItemsDb);
            } catch (error) {
                console.error(error);
            }
        }

        getAll();
    }, []);



    /**
     * Handlers
     */
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

    const handleApproveAppointment = (appointmentId) => {
        const formData = new FormData();
        formData.append('appointmentId', appointmentId);

        selectedStaffs.forEach(staff => {
            formData.append('staffs[]', staff.id);
        });

        selectedItems.forEach(item => {
            formData.append('items[]', JSON.stringify({id:parseInt(item.id), qty: item.selected_qty}));
        })

        axiosClient.post(`/approve-appointment`, formData)
        .then(({ data }) => {
            console.log(data);
            if (data.status === 200) {
                navigate('/AdminIndex/Appointments/Approved')
            }

            notify(data.status === 200 ? 'success' : 'error', data.message, 'top-center', 3000);
        }).catch(error => {
            console.error(error);
            notify('error', data.message, 'top-center', 3000);
        });
    }



    /**
     * Render
     */
    return (
        <div className = "page approve-appt inter">
            {staffs && appointment && inventoryItems
            ?(
                <>
                    <div className="gen-margin bg">
                        <div className='up'>
                            <div className="title-buttons d-flex justify-content-between w-100">
                                <div className='anybody bold medium-f'>
                                    Approve Appointment
                                </div>
                                <div className="d-flex">
                                    <button className='sub-button right-margin-s' onClick={(e) => handleCancel(record.id,record.reason)}>
                                        Cancel Appointment
                                    </button>
                                    <button
                                    disabled={selectedStaffs.length < 1 || selectedItems.length < 1}
                                    className={`primary-btn-blue1 ${selectedStaffs.length < 1 || selectedItems.length < 1 ? "disabled" : ""} left-margin-s`}
                                    onClick={() => handleApproveAppointment(appointment.id)}>
                                        Approve Appointment
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="down top-margin-s d-flex justify-content-between gap-4">

                            {/* Left Side */}
                            <div className="left side d-flex flex-column">

                                {/* Pet Information */}
                                <div className='details-appt up w-100 d-flex small-form'>
                                    <div className="left circle pic s-align-center position-relative d-flex align-items-center justify-content-center overflow-hidden">
                                        <img className='position-absolute h-100' src={`/assets/media/pets/${appointment.pet.picture}`} alt="pfp"/>
                                    </div>
                                    <div className="right left-margin align-self-end w-100">
                                        <div className="anybody bold semi-small-medium-f">
                                            {appointment.pet.name}
                                        </div>
                                        <div className="inter appt-detail-rows small-f">
                                            <div className='cont-row d-flex'>
                                                <div className='cont-lbl bold'>Service:</div>
                                                <div className='cont-dtl'>{appointment.service}</div>
                                            </div>
                                            <div className='cont-row d-flex'>
                                                <div className='cont-lbl bold'>Gender:</div>
                                                <div className='cont-dtl'>{appointment.pet.gender}</div>
                                            </div>
                                            <div className='cont-row d-flex'>
                                                <div className='cont-lbl bold'>Breed:</div>
                                                <div className='cont-dtl'>{appointment.pet.breed}</div>
                                            </div>
                                            <div className='cont-row d-flex'>
                                                <div className='cont-lbl bold'>Birthdate:</div>
                                                <div className='cont-dtl'>{formatDate(appointment.pet.dob)} ({getAge(appointment.pet.dob)} y/o)</div>
                                            </div>
                                            <div className='cont-row d-flex'>
                                                <div className='cont-lbl bold'>Schedule:</div>
                                                <div className='cont-dtl'>{formatDate(appointment.date_time)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Staffs */}
                                <div className='staff-appt down w-100 small-form'>
                                    <div className='up bold semi-small-medium-f anybody w-100 border-bottom bottom-margin-s'>
                                        Available Staffs
                                    </div>
                                    <div className="staff-list d-flex">
                                        {staffs.map(staff => (
                                            <div
                                            key={staff.id}
                                            className='staff-item d-flex flex-column justify-content-between'
                                            onClick={() => handleAssignStaff(staff)}>
                                                <div className="left circle staff-pic m-auto">
                                                    <img className='position-absolute h-100' src={`/assets/media/pfp/${staff.picture}`} alt="pfp"/>
                                                </div>
                                                <div style={{marginTop: "10px"}}>
                                                    <div className="staffname anybody bold small-f t-align-center">
                                                        Dr. {staff.fname} {staff.lname}
                                                    </div>
                                                    <div className="anybody small-f t-align-center">
                                                        {staff.role.role}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                {/* Medicines */}
                                <div className='inventory-appt-sm down w-100 small-form'>
                                    <div className='up bold semi-small-medium-f anybody w-100 border-bottom bottom-margin-s'>
                                        Inventory
                                    </div>
                                    <div className="inventory-list d-flex">
                                        {inventoryItems.map(item => (
                                            <InventoryBox
                                                key={item.id}
                                                handleInventoryBoxClick={() => handleAssignItem(item)}
                                                itemName={item.name}
                                                itemImage={item.picture}
                                                itemQuantity={item.qty}
                                                itemDescription={item.desc}
                                            />
                                        ))}
                                    </div>

                                </div>

                            </div>

                            {/* Right Side */}
                            <div className='right side'>
                                {/* For Assigned Staffs */}
                                <div className='small-form inventory-appt'>
                                    <div className="semi-small-medium-f" style={{marginBottom: "10px"}}>Assigned Staff</div>
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

                                {/* For Assigned Inventory items */}
                                <div className='small-form inventory-appt'>
                                    <div className="semi-small-medium-f" style={{marginBottom: "10px"}}>Assigned Item</div>
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
                    </div>
                </>
            )
            :(
                <>Loading...</>
            )}
        </div>
    )
}
