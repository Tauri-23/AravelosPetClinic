import { useEffect, useState } from "react"
import { fetchAppointmentDetails } from "../../../services/AppointmentServices";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import "../appointment/css/client_appointments.css";

import {Spin} from "antd";
import { formatDate, formatDateTime, getAge, isEmptyOrSpaces, notify } from "../../../assets/js/utils";
import React from "react";
import { useModal } from "../../../contexts/ModalContext";
import axiosClient from "../../../axios-client";

export default function ClientViewAppointment() {
    const navigate = useNavigate();
    const {showModal} = useModal();
    const {appointmentId} = useParams();
    const {setActiveNavLink, setPendingAppointments, setApprovedAppointments, setCanceledAppointments} = useOutletContext();

    const [appointment, setAppointment] = useState(null);



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Appointments");
        const getAll = async() => {
            const [appointmentDb] = await Promise.all([
                fetchAppointmentDetails(appointmentId),
            ]);
            console.log(appointmentDb);
            setAppointment(appointmentDb);
        }
        getAll();
    }, []);



    /**
     * Handlers
     */
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
                            notify('success', data.message, 'top-center', 3000);
                            navigate('/ClientIndex/Cancelled');
                        } else {
                            notify('error', data.message, 'top-center', 3000);
                        }
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
     * Render
     */
    return(
        <div className="content1">
            {appointment
            ? (
                <>
                    <h2 className="mar-bottom-1">{appointment.status} Appointment</h2>

                    {(appointment.status !== "Completed" && appointment.status !== "Approved" && appointment.status !== "Cancelled") && (
                        <div className="d-flex gap3 justify-content-end w-100 mar-bottom-1">
                            <button className='primary-btn-red1' onClick={(e) => handleCancel(appointment.id)}>
                                Cancel Appointment
                            </button>
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
                                <h5>{appointment.pet.breed}</h5>
                            </div>
                            <div className="d-flex align-items-center">
                                <h5 className="fw-bold" style={{width: 120}}>Birthdate: </h5>
                                <h5>{formatDate(appointment.pet.dob)} ({getAge(appointment.pet.dob)} y/o)</h5>
                            </div>
                            <div className="d-flex align-items-center">
                                <h5 className="fw-bold" style={{width: 120}}>Schedule: </h5>
                                <h5>{formatDateTime(appointment.date_time)}</h5>
                            </div>
                            
                        </div>
                    </div>

                    {(appointment.status === "Cancelled") && (
                        <div className="appointment-cont1 w-100 mar-bottom-1">
                            <h4 className="mar-bottom-1">Reason</h4>
                            <p>{appointment.reason}</p>
                        </div>
                    )}

                    {(appointment.status !== "Pending" && appointment.status !== "Cancelled" && appointment.assigned_staffs) && (
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
                    {appointment.status === "Completed" && appointment.service.service !== "Grooming" && (
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

                            <div className="d-flex gap1 mar-bottom-1">
                                <div className="w-100">
                                    <h5>Procedures done</h5>
                                    <p>{appointment.medical_history.procedure_done || "N/A"}</p>
                                </div>
                                <div className="w-100">
                                    <h5>Next Appointment</h5>
                                    <p>{appointment.medical_history.next_appointment_date_time ? formatDateTime(appointment.medical_history.next_appointment_date_time) : "N/A"}</p>
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
                </>
            )
            : (
                <Spin size="large"/>
            )}
        </div>
    )
}