import { useEffect, useState } from "react"
import { fetchAllAppointmentsWhereStatusMonthAndYear, fetchAppointmentDetails } from "../../../services/AppointmentServices";
import { useOutletContext, useParams } from "react-router-dom";
import "../appointment/css/client_appointments.css";

import {Button, Spin} from "antd";
import { formatDate, getAge, isEmptyOrSpaces, notify } from "../../../assets/js/utils";
import React from "react";
import { useModal } from "../../../contexts/ModalContext";
import axiosClient from "../../../axios-client";
import TextArea from "antd/es/input/TextArea";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function ClientViewAppointment() {
    const now = new Date();
    const {user} = useStateContext();
    const {showModal} = useModal();
    const {appointmentId} = useParams();
    const {setActiveNavLink} = useOutletContext();

    const [appointment, setAppointment] = useState(null);
    const [cancelledAptThisMonth, setCancelledAptThisMonth] = useState(null);

    const [feedbackIn, setFeedbackIn] = useState("");


    const [isCancellable, setIsCancellable] = useState(false);
    const [isPostingFeedback, setPostingFeedback] = useState(false);



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Appointments");
        const getAll = async() => {
            const [appointmentDb, cancelledAppointmentsThisMonth] = await Promise.all([
                fetchAppointmentDetails(appointmentId),
                fetchAllAppointmentsWhereStatusMonthAndYear("cancelled", now.getMonth() + 1, now.getFullYear())
            ]);
            setAppointment(appointmentDb);
            setCancelledAptThisMonth(cancelledAppointmentsThisMonth.length);
        }
        getAll();
    }, []);



    /**
     * Cancel Button checker
     */
    useEffect(() => {
        if (appointment) {
            const appointmentDate = new Date(appointment.date_time);
    
            // Strip time from both dates by setting hours to 0
            const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const appointmentDateOnly = new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate());
    
            const diff = appointmentDateOnly.getTime() - nowDateOnly.getTime();
            const diffInDays = diff / (1000 * 60 * 60 * 24); // convert ms to days
    
            if (diffInDays > 1) {
                setIsCancellable(false);
            } else {
                setIsCancellable(true);
            }
        }
    }, [appointment]);



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
                            setAppointment(data.appointment);
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

    const handleSubmitFeedback = () => {
        const formData = new FormData();
        formData.append("client", user.id);
        formData.append("appointment", appointment.id);
        formData.append("feedback", feedbackIn);

        axiosClient.post("/post-feedback", formData)
        .then(({data}) => {
            if(data.status === 200) {
                setAppointment(data.appointment);
                setPostingFeedback(false);
            }
            notify(data.status === 200 ? "success" : "error", data.message, "top-center", 3000);
        }).catch(error => {
            notify("error", "Server Error", "top-center", 3000);
            console.error(error);
        });
    }



    /**
     * Render
     */
    return(
        <div className="content1">
            {(appointment !== null && cancelledAptThisMonth !== null)
            ? (
                <>
                    <h2 className="mar-bottom-1">{appointment.status} Appointment</h2>

                    {(appointment.status !== "Completed" && appointment.status !== "Approved" && appointment.status !== "Cancelled") && (
                        <div className="d-flex align-items-center gap3 justify-content-end w-100 mar-bottom-1">
                            {cancelledAptThisMonth > 2 && (
                                <small>Maximum of cancelled appointment per month is 3</small>
                            )}

                            <button 
                            disabled={cancelledAptThisMonth > 2 || isCancellable} 
                            className={`primary-btn-red1 ${cancelledAptThisMonth > 2 || isCancellable ? "disabled" : ""}`} 
                            onClick={(e) => handleCancel(appointment.id)}>
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
                                <h5>{appointment.pet.breed.breed}</h5>
                            </div>
                            <div className="d-flex align-items-center">
                                <h5 className="fw-bold" style={{width: 120}}>Birthdate: </h5>
                                <h5>{formatDate(appointment.pet.dob)} ({getAge(appointment.pet.dob)} y/o)</h5>
                            </div>
                            <div className="d-flex align-items-center">
                                <h5 className="fw-bold" style={{width: 120}}>Schedule: </h5>
                                <h5>{formatDate(appointment.date_time)}</h5>
                            </div>
                            
                        </div>
                    </div>

                    {/* FEEDBACK */}
                    {appointment.status === "Completed" && (
                        <div className="appointment-cont1 mar-bottom-1">
                            <h3 className="mar-bottom-1">Feedback</h3>

                            {!isPostingFeedback 
                            ? (<div className="mar-bottom-3">{appointment.feedback?.content || "Not given yet"}</div>)
                            : (
                                <TextArea
                                className="mar-bottom-3"
                                rows={4}
                                value={feedbackIn}
                                onChange={(e) => setFeedbackIn(e.target.value)}
                                />
                            )}
                            
                            

                            {!appointment.feedback && (
                                <div className="d-flex gap4">
                                    <Button
                                    type={isPostingFeedback ? "default" : "primary"}
                                    size="large"
                                    onClick={() => setPostingFeedback(prev => !prev) }>
                                        {isPostingFeedback ? "Cancel" : "Post a Feedback"}
                                    </Button>

                                    {isPostingFeedback && (
                                        <Button
                                        disabled={isEmptyOrSpaces(feedbackIn)}
                                        type="primary"
                                        size="large"
                                        onClick={handleSubmitFeedback}>
                                            Submit
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

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
                        <div className="appointment-cont1 w-100 mar-bottom-1">
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
                                    <h5>Temperature (Celcius)</h5>
                                    <p>{appointment.medical_history.temperature}</p>
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
                            </div>

                            <div className="mar-bottom-1">
                                <div className="w-100">
                                    <h5>Veterenarian's Note</h5>
                                    <p>{appointment.medical_history.note || "N/A"}</p>
                                </div>
                            </div>

                            {/* <h3 className="mar-bottom-1">Physical Exam Results: </h3>

                            <div className="d-flex flex-wrap gap2 mar-bottom-1">
                                {Object.entries(appointment.medical_history.physical_exams).map((exam, index) => (
                                    exam[0] !== "id" && exam[0] !== "created_at" && exam[0] !== "updated_at" && (
                                        <div key={index} className="w-25">
                                            <h5>{exam[0].replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</h5>
                                            <p>{exam[1] || "N/A"}</p>
                                        </div>
                                    )
                                ))}
                            </div> */}

                            {/* <h3 className="mar-bottom-1">Laboratory Exam Results: </h3>

                            <div className="d-flex flex-wrap gap2 mar-bottom-1">
                                {Object.entries(appointment.medical_history.laboratory_exams)
                                .filter(([key, value]) => value === 1)
                                .map(([key, value]) => {
                                const resultKey = `${key}_result`;
                                const result = appointment.medical_history.laboratory_exams[resultKey];

                                return (
                                    <div key={key} className="exam-box">
                                    <h5>{key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</h5>
                                    <p>{result || "No result available"}</p>
                                    </div>
                                );
                                })}
                            </div> */}

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
                                    <h5>Medication Given</h5>
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