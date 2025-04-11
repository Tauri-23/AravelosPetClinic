import { useEffect, useState } from "react"
import { fetchAppointmentDetails } from "../../../services/AppointmentServices";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import "../Appointments/css/admin_appointments.css";

import {Spin} from "antd";
import { formatDate, formatDateTime, getAge, isEmptyOrSpaces, notify } from "../../../assets/js/utils";
import { fetchAllStaffs } from "../../../services/StaffServices";
import { fetchAllInventoryItems } from "../../../services/InventoryServices";
import React from "react";
import InventoryBox from "../../../components/inventory_box";
import axiosClient from "../../../axios-client";
import MedicalHistoryForm from "./components/medical_history_form";
import { useModal } from "../../../contexts/ModalContext";

export default function AdminViewAppointment() {
    const navigate = useNavigate();
    const {showModal} = useModal();
    const {appointmentId} = useParams();
    const {setActiveNavLink} = useOutletContext();

    const [appointment, setAppointment] = useState(null);

    const [staffs, setStaffs] = useState(null);
    const [inventoryItems, setInventoryItems] = useState(null);

    const [selectedStaffs, setSelectedStaffs] = useState([]);
    const [selectedItems, setselectedItems] = useState([]);

    // FOR MARK AS COMPLETE
    const [isMarkingComplete, setMarkingComplete] = useState(false);
    const [isMarkDoneDisabled, setMarkDoneDisabled] = useState(true);



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Appointments");
        const getAll = async() => {
            const [appointmentDb, staffsDb, inventoryItemsDb] = await Promise.all([
                fetchAppointmentDetails(appointmentId),
                fetchAllStaffs(),
                fetchAllInventoryItems()
            ]);
            console.log(appointmentDb);
            setAppointment(appointmentDb);
            setStaffs(staffsDb);
            setInventoryItems(inventoryItemsDb);
        }
        getAll();
    }, []);



    /**
     * Handlers FOR PENDING ONLY
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

    const handleCancel = (recordId) =>{
        const handleFunction = "handleCancelPost";

        if (isEmptyOrSpaces(String(recordId))) {
            console.error("No appointment selected for cancellation.");
            return;
        }

        showModal('ConfirmActionModal1',  {
            handlePost: (recordId, recordReason) => {
                const formData = new FormData();
                formData.append('appointmentId', recordId);
                formData.append('reason', recordReason || 'No reason provided.');

                axiosClient.post(`/cancel-appointment`, formData)
                    .then(({ data }) => {
                        if (data.status === 200) {
                            navigate('/AdminIndex/Appointments/Cancelled');
                        }
                        notify(data.status === 200 ? 'success' : 'error', data.message, 'top-center', 3000);
                    }).catch(error => {
                        console.error(error);
                        notify('error', data.message, 'top-center', 3000);
                    });
            }, 
            recordId, 
            handleFunction
        });
    }



    /**
     * Cancell Button checker
     */
    useEffect(() => {
        if (appointment) {
            const now = new Date();
            const appointmentDate = new Date(appointment.date_time);
    
            // Strip time from both dates to compare only the dates
            const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const appointmentDateOnly = new Date(
                appointmentDate.getFullYear(),
                appointmentDate.getMonth(),
                appointmentDate.getDate()
            );
    
            const diff = appointmentDateOnly.getTime() - nowDateOnly.getTime();
            const diffInDays = diff / (1000 * 60 * 60 * 24); // convert ms to days
    
            if (diffInDays > 0) {
                setMarkDoneDisabled(true);
            } else {
                setMarkDoneDisabled(false);
            }
        }
    }, [appointment]);



    /**
     * Render
     */
    return(
        <div className="content1 compressed">
            {appointment
            ? (
                <>
                    <h2 className="mar-bottom-1">{appointment.status} Appointment</h2>

                    {(appointment.status !== "Completed" && appointment.status !== "Cancelled") && (
                        <div className="d-flex gap3 justify-content-end w-100 mar-bottom-1">
                            {!isMarkingComplete && (
                                <button className='primary-btn-red1' onClick={(e) => handleCancel(appointment.id)}>
                                    Cancel Appointment
                                </button>
                            )}
                            

                            {appointment.status === "Pending" && (
                                <button 
                                disabled={selectedStaffs.length < 1 || selectedItems.length < 1}
                                className={`primary-btn-blue1 ${selectedStaffs.length < 1 || selectedItems.length < 1 ? "disabled" : ""}`}
                                onClick={() => handleApproveAppointment(appointment.id)}
                                >
                                    Approve Appointment
                                </button>
                            )}

                            {(appointment.status === "Approved" && !isMarkingComplete) && (
                                <button 
                                disabled={isMarkDoneDisabled}
                                className={`primary-btn-blue1 ${isMarkDoneDisabled ? "disabled" : ""}`}
                                onClick={() => setMarkingComplete(true)}
                                >
                                    Mark as Complete
                                </button>
                            )}

                            {isMarkingComplete && (
                                <button 
                                className={`primary-btn-blue1`}
                                onClick={() => setMarkingComplete(false)}
                                >
                                    Back
                                </button>
                            )}
                        </div>
                    )}

                    {/* APPOINTMENT INFORMATION */}
                    <div className="appointment-cont1 d-flex gap1 mar-bottom-1">
                        <div className="appointment-pet-pfp">
                            <img src={`/assets/media/pets/${appointment.pet.picture}`} alt="pet profile pic" />
                        </div>

                        <div>
                            <h3>{appointment.pet.name}</h3>
                            <div className="d-flex align-items-center">
                                <h5 className="fw-bold" style={{width: 120}}>Service: </h5>
                                <h5>{appointment.service.service}</h5>
                            </div>
                            <div className="d-flex align-items-center">
                                <h5 className="fw-bold" style={{width: 120}}>Gender: </h5>
                                <h5>{appointment.pet.gender}</h5>
                            </div>
                            <div className="d-flex align-items-center">
                                <h5 className="fw-bold" style={{width: 120}}>Breed: </h5>
                                <h5>{appointment.pet.breed.breed}</h5>
                            </div>
                            <div className="d-flex align-items-center">
                                <h5 className="fw-bold" style={{width: 120}}>Birthdate: </h5>
                                <h5>{formatDate(appointment.pet.dob)} ({getAge(appointment.pet.dob)} y/o)</h5>
                            </div>
                            <div className="d-flex align-items-center">
                                <h5 className="fw-bold" style={{width: 120}}>Schedule: </h5>
                                <h5>{formatDateTime(appointment.date_time)}</h5>
                            </div>
                            <div className="d-flex align-items-center">
                                <h5 className="fw-bold" style={{width: 120}}>Pet Label: </h5>
                                <h5>{appointment.pet.label || "N/A"}</h5>
                            </div>
                            
                        </div>
                    </div>

                    {/* FOR PENDING APPOINTMENTS */}
                    {appointment.status === "Pending" && (
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
                    )}

                    {(appointment.status === "Cancelled") && (
                        <div className="appointment-cont1 w-100 mar-bottom-1">
                            <h4 className="mar-bottom-1">Reason</h4>
                            <p>{appointment.reason}</p>
                        </div>
                    )}

                    {(appointment.status !== "Pending" && appointment.status !== "Cancelled" && appointment.assigned_staffs && !isMarkingComplete) && (
                        <>
                            <div 
                            className="appointment-cont1 w-100 mar-bottom-1"
                            >
                                <h4 className="mar-bottom-1">Assigned Staffs</h4>
                                {appointment.assigned_staffs.map(staff => (
                                    <div key={staff.id} className='d-flex align-items-center w-100 justify-content-between mar-bottom-3' style={{marginBottom: "20px"}}>
                                        <div className='d-flex align-items-center gap1'>
                                            <div className="appointment-staff-card-pfp">
                                                <img className='position-absolute h-100' src={`/assets/media/pfp/${staff.staff.picture}`} alt="pfp"/>
                                            </div>
                                            <div>
                                                <div className="small-f fw-bold">{staff.staff.fname} {staff.staff.lname}</div>
                                                <div className="semi-small-f">{staff.staff.role.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div 
                            className="appointment-cont1 w-100 mar-bottom-1"
                            >
                                <h4 className="mar-bottom-1">Assigned Items</h4>
                                {appointment.assigned_items.map(item => (
                                    <div key={item.inventory_items_used.inventory.id} className='d-flex align-items-center gap1'>
                                        <div className="appointment-staff-card-pfp">
                                            <img className='position-absolute h-100' src={`/assets/media/items/${item.inventory_items_used.inventory.picture}`} alt="pfp"/>
                                        </div>
                                        <div>
                                            <div className="small-f fw-bold">{item.inventory_items_used.inventory.name}</div>
                                            <div className="semi-small-f">{item.inventory_items_used.inventory.selected_qty}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* FOR COMPLETED */}
                    {appointment.status === "Completed" && (
                        <div className="appointment-cont1 w-100">
                            <h3 className="mar-bottom-1">Medical History</h3>

                            <div className="d-flex gap1 mar-bottom-2">
                                <div className="w-100">
                                    <h5>Weight (Kg)</h5>
                                    <p>{appointment.medical_history.weight} Kg</p>
                                </div>
                                <div className="w-100">
                                    <h5>Respiratory Rate</h5>
                                    <p>{appointment.medical_history.respiratory_rate}</p>
                                </div>
                                <div className="w-100">
                                    <h5>Pulse</h5>
                                    <p>{appointment.medical_history.pulse}</p>
                                </div>
                                <div className="w-100">
                                    <h5>Temperature (Celcius)</h5>
                                    <p>{appointment.medical_history.temperature}</p>
                                </div>
                            </div>

                            <div className="d-flex gap1 mar-bottom-2">
                                <div className="w-100">
                                    <h5>Diet</h5>
                                    <p>{appointment.medical_history.diet || "N/A"}</p>
                                </div>
                                <div className="w-100">
                                    <h5>Allergies</h5>
                                    <p>{appointment.medical_history.allergies || "N/A"}</p>
                                </div>
                                <div className="w-100">
                                    <h5>Previous Surgery</h5>
                                    <p>{appointment.medical_history.previous_surgery || "N/A"}</p>
                                </div>
                                <div className="w-100">
                                    <h5>Complaints / Requests</h5>
                                    <p>{appointment.medical_history.complaints_or_requests || "N/A"}</p>
                                </div>
                            </div>

                            <div className="d-flex gap1 mar-bottom-2">
                                <div className="w-100">
                                    <h5>Medications given by owner</h5>
                                    <p>{appointment.medical_history.medication_by_owner || "N/A"}</p>
                                </div>
                                <div className="w-100">
                                    <h5>Medications given by other vet</h5>
                                    <p>{appointment.medical_history.medication_by_other_vets || "N/A"}</p>
                                </div>
                            </div>

                            <div className="d-flex gap1 mar-bottom-2">
                                <div className="w-100">
                                    <h5>Procedures done</h5>
                                    <p>{appointment.medical_history.procedure_done || "N/A"}</p>
                                </div>
                                <div className="w-100">
                                    <h5>Next Appointment</h5>
                                    <p>{appointment.medical_history.next_appointment_date_time ? formatDateTime(appointment.medical_history.next_appointment_date_time) : "N/A"}</p>
                                </div>
                            </div>

                            <div className="mar-bottom-1">
                                <div className="w-100">
                                    <h5>Veterenarian's Note</h5>
                                    <p>{appointment.medical_history.note || "N/A"}</p>
                                </div>
                            </div>

                            <h3 className="mar-bottom-1">Physical Exam Results: </h3>

                            <div className="d-flex flex-wrap gap2 mar-bottom-1">
                                {Object.entries(appointment.medical_history.physical_exams).map((exam, index) => (
                                    exam[0] !== "id" && exam[0] !== "created_at" && exam[0] !== "updated_at" && (
                                        <div key={index} className="w-25">
                                            <h5>{exam[0].replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</h5>
                                            <p>{exam[1] || "N/A"}</p>
                                        </div>
                                    )
                                ))}
                            </div>

                            <h3 className="mar-bottom-1">Laboratory Exam Results: </h3>

                            <div className="d-flex flex-wrap gap2 mar-bottom-1">
                                {Object.entries(appointment.medical_history.laboratory_exams)
                                .filter(([key, value]) => value === 1) // Only keep exams/tests with a value of 1
                                .map(([key, value]) => {
                                const resultKey = `${key}_result`; // Construct the result key
                                const result = appointment.medical_history.laboratory_exams[resultKey];

                                return (
                                    <div key={key} className="exam-box">
                                    <h5>{key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</h5> {/* Format key name */}
                                    <p>{result || "No result available"}</p>
                                    </div>
                                );
                                })}
                            </div>

                            <h3 className="mar-bottom-1">Diagnosis: </h3>

                            <div className="d-flex gap1 mar-bottom-2">
                                <div className="w-100">
                                    <h5>Tentative Diagnosis</h5>
                                    <p>{appointment.medical_history.diagnosis.tentative_diagnosis}</p>
                                </div>
                                <div className="w-100">
                                    <h5>Final Diagnosis</h5>
                                    <p>{appointment.medical_history.diagnosis.final_diagnosis}</p>
                                </div>
                                <div className="w-100">
                                    <h5>Prognosis</h5>
                                    <p>{appointment.medical_history.diagnosis.prognosis}</p>
                                </div>
                            </div>
                            <div className="d-flex gap1 mar-bottom-2">
                                <div className="w-100">
                                    <h5>Vaccine Given</h5>
                                    <p>{appointment.medical_history.diagnosis.vaccine_given}</p>
                                </div>
                                <div className="w-100">
                                    <h5>Prescribed Medication</h5>
                                    <p>{appointment.medical_history.diagnosis.prescribed_medication}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/**
                     * Mark as Complete Form
                     */}
                    {isMarkingComplete && (
                        <MedicalHistoryForm appointmentId={appointment.id}/>
                    )}
                </>
            )
            : (
                <Spin size="large"/>
            )}
        </div>
    )
}