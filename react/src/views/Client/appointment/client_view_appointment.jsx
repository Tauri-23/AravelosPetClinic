import { useEffect, useState } from "react"
import { fetchAllAppointmentsWhereStatusMonthAndYear, fetchAppointmentDetails } from "../../../services/AppointmentServices";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import "../appointment/css/client_appointments.css";
import {Button, DatePicker, Spin} from "antd";
import { formatDateTime, formatTime, isEmptyOrSpaces, notify } from "../../../assets/js/utils";
import { fetchAllStaffs } from "../../../services/StaffServices";
import { fetchAllInventoryItems } from "../../../services/InventoryServices";
import React from "react";
import axiosClient from "../../../axios-client";
import { useModal } from "../../../contexts/ModalContext";
import MedicalHistoryFileBoxRead from "../../Admin/Appointments/components/medical_history_file_box_read";


export default function ClientViewAppointment() {
    const now = new Date();
    const {id} = useParams();
    const navigate = useNavigate();
    const {showModal} = useModal();
    const {appointmentId} = useParams();
    const {setActiveNavLink} = useOutletContext();

    const [appointment, setAppointment] = useState(null);
    const [cancelledAptThisMonth, setCancelledAptThisMonth] = useState(null);

    // FOR PENDING TO APPROVE
    const aptAvailTime = ["8:00:00", "9:00:00", "10:00:00", "11:00:00", "13:00:00", "14:00:00", "15:00:00"];
    const [staffs, setStaffs] = useState(null);
    const [aptDate, setAptDate] = useState(null);
    const [aptTime, setAptTime] = useState("");

    const [selectedStaffs, setSelectedStaffs] = useState([]);

    const [activePetIndex, setActivePetIndex] = useState(0);

    const [isCancellable, setIsCancellable] = useState(false);
    const [isPostingFeedback, setPostingFeedback] = useState(false);

    const selectedPetHasMedHist = appointment?.appointment_pets?.[activePetIndex].medical_history.length > 0;
    const selectedPetMedHist = appointment?.appointment_pets?.[activePetIndex].medical_history[0];
    const selectedPetAssItem = appointment?.appointment_pets?.[activePetIndex].assigned_items;

    console.log(selectedPetAssItem);
    


    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Appointments");
        const getAll = async() => {
            const [appointmentDb, cancelledAppointmentsThisMonth] = await Promise.all([
                fetchAppointmentDetails(appointmentId),
                fetchAllAppointmentsWhereStatusMonthAndYear("Cancelled", now.getMonth() + 1, now.getFullYear())
            ]);
            setAppointment(appointmentDb);
            setCancelledAptThisMonth(cancelledAppointmentsThisMonth.length);
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
    // useEffect(() => {
    //     if (appointment) {
    //         const appointmentDate = new Date(appointment.date_time);
    
    //         // Strip time from both dates by setting hours to 0
    //         const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    //         const appointmentDateOnly = new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate());
    
    //         const diff = appointmentDateOnly.getTime() - nowDateOnly.getTime();
    //         const diffInDays = diff / (1000 * 60 * 60 * 24); // convert ms to days
    
    //         if (diffInDays > 1) {
    //             setIsCancellable(false);
    //         } else {
    //             setIsCancellable(true);
    //         }
    //     }
    // }, [appointment]);



    /**
     * Render
     */
    return(
        <div className="content1">
            {appointment
            ? (
                <>
                    <h2 className="mar-bottom-1">{appointment.status} Appointment</h2>

                    {/* Buttons */}
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

                    {/* PET TABS BUTTON */}
                    <div className="d-flex mar-bottom-1 gap3">
                        {appointment.appointment_pets?.map((aptPet, index) => (
                            <Button
                            size="large"
                            type={activePetIndex === index ? "primary" : "default"}
                            onClick={() => setActivePetIndex(index)}
                            >
                                {aptPet.pet?.name || `Pet ${index + 1}`}
                            </Button>
                        ))}
                    </div>

                    {appointment.appointment_pets?.[activePetIndex] && (
                        <div key={appointment.appointment_pets[activePetIndex].id} className="appointment-cont1 d-flex gap1 mar-bottom-1">
                            <div className="appointment-pet-pfp">
                                <img src={`/assets/media/pets/${appointment.appointment_pets[activePetIndex].pet?.picture || 'defaultPetPic.jpg'}`}alt="pet profile pic"/>
                            </div>

                            <div>
                            <h3>{appointment.appointment_pets[activePetIndex].pet?.name || "Unnamed Pet"}</h3>

                            {/* Services */}

                            <h5 className="fw-bold" style={{ width: 130 }}>Service/s:</h5>
                            {appointment.appointment_pets[activePetIndex].appointment_pet_services?.map((serviceEntry, idx) => (
                                <div key={idx}>
                                <div className="d-flex align-items-center" style={{marginLeft:110}}>
                                    <h5>— {serviceEntry.service?.service || "N/A"} ({serviceEntry.service_type?.service_type || "N/A"})</h5>
                                </div>
                                </div>
                            ))}

                            {/* More details... */}
                            <div className="d-flex align-items-center">
                                <h5 className="fw-bold" style={{ width: 130 }}>Breed:</h5>
                                <h5>{appointment.appointment_pets[activePetIndex].pet?.breed?.breed}</h5>
                            </div>
                            {/* ...additional fields */}
                            </div>
                        </div>
                    )}

                    {/* APPOINTMENT ASSIGNED */}
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
                        </>
                    )}

                    {(appointment.status === "Cancelled") && (
                        <div className="appointment-cont1 w-100 mar-bottom-1">
                            <h4 className="mar-bottom-1">Reason</h4>
                            <p>{appointment.reason}</p>
                        </div>
                    )}

                    {/* Has Medical History */}
                    {selectedPetHasMedHist && (
                        <>
                            <div
                            className="appointment-cont1 w-100 mar-bottom-1"
                            >
                                <h4 className="mar-bottom-1">Assigned Items</h4>
                                {selectedPetAssItem.map(item => (
                                    <div key={item.inventory_items_used.inventory.id} className='d-flex align-items-center gap1'>
                                        <div className="appointment-staff-card-pfp">
                                            <img className='position-absolute h-100' src={`/assets/media/medicines/${item.inventory_items_used.inventory.picture}`} alt="pfp"/>
                                        </div>
                                        <div>
                                            <div className="small-f fw-bold">{item.inventory_items_used.inventory.name}</div>
                                            <div className="semi-small-f">{item.inventory_items_used.inventory.selected_qty}</div>
                                            <div className="semi-small-f">{item.inventory_items_used.inventory.selected_qty}</div>
                                            <div className="semi-small-f">{item.inventory_items_used.dosage_used} {item.inventory_items_used.dosage_type}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="appointment-cont1 w-100">
                                <h3 className="mar-bottom-1">Medical History</h3>

                                <div className="d-flex gap1 mar-bottom-2">
                                    <div className="w-100">
                                        <h5>Weight (Kg)</h5>
                                        <p>{selectedPetMedHist.weight} Kg</p>
                                    </div>
                                    <div className="w-100">
                                        <h5>Respiratory Rate</h5>
                                        <p>{selectedPetMedHist.respiratory_rate}</p>
                                    </div>
                                    <div className="w-100">
                                        <h5>Pulse</h5>
                                        <p>{selectedPetMedHist.pulse}</p>
                                    </div>
                                    <div className="w-100">
                                        <h5>Temperature (Celcius)</h5>
                                        <p>{selectedPetMedHist.temperature}</p>
                                    </div>
                                </div>

                                <div className="d-flex gap1 mar-bottom-2">
                                    <div className="w-100">
                                        <h5>Diet</h5>
                                        <p>{selectedPetMedHist.diet || "N/A"}</p>
                                    </div>
                                    <div className="w-100">
                                        <h5>Allergies</h5>
                                        <p>{selectedPetMedHist.allergies || "N/A"}</p>
                                    </div>
                                    <div className="w-100">
                                        <h5>Previous Surgery</h5>
                                        <p>{selectedPetMedHist.previous_surgery || "N/A"}</p>
                                    </div>
                                    <div className="w-100">
                                        <h5>Complaints / Requests</h5>
                                        <p>{selectedPetMedHist.complaints_or_requests || "N/A"}</p>
                                    </div>
                                </div>

                                <div className="d-flex gap1 mar-bottom-2">
                                    <div className="w-100">
                                        <h5>Medications given by owner</h5>
                                        <p>{selectedPetMedHist.medication_by_owner || "N/A"}</p>
                                    </div>
                                    <div className="w-100">
                                        <h5>Medications given by other vet</h5>
                                        <p>{selectedPetMedHist.medication_by_other_vets || "N/A"}</p>
                                    </div>
                                </div>

                                <div className="d-flex gap1 mar-bottom-2">
                                    <div className="w-100">
                                        <h5>Procedures done</h5>
                                        <p>{selectedPetMedHist.procedure_done || "N/A"}</p>
                                    </div>
                                    <div className="w-100">
                                        <h5>Next Appointment</h5>
                                        <p>{selectedPetMedHist.next_appointment_date_time ? formatDateTime(selectedPetMedHist.next_appointment_date_time) : "N/A"}</p>
                                    </div>
                                </div>

                                <div className="mar-bottom-1">
                                    <div className="w-100">
                                        <h5>Veterenarian's Note</h5>
                                        <p>{selectedPetMedHist.note || "N/A"}</p>
                                    </div>
                                </div>

                                <h3 className="mar-bottom-1">Physical Exam Results: </h3>

                                <div className="d-flex flex-wrap gap2 mar-bottom-1">
                                    {Object.entries(selectedPetMedHist.physical_exams).map((exam, index) => (
                                        exam[0] !== "id" && exam[0] !== "created_at" && exam[0] !== "updated_at" && (
                                            <div key={index} className="w-25">
                                                <h5>{exam[0].replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</h5>
                                                <p>{exam[1] || "N/A"}</p>
                                            </div>
                                        )
                                    ))}
                                </div>

                                <h3 className="mar-bottom-1">Laboratory Exam Results: </h3>

                                <div className="d-flex flex-direction-y gap2 mar-bottom-1">
                                    {Object.entries(selectedPetMedHist.laboratory_exams)
                                        .filter(([key, value]) => value === 1) // Only keep exams/tests with a value of 1
                                        .map(([key, value]) => {
                                        const resultKey = `${key}_result`; // Construct the result key
                                        const filesKey = `${key}_files`;

                                        const result = selectedPetMedHist.laboratory_exams[resultKey];
                                        let files = [];
                                        try {
                                            const raw = selectedPetMedHist.laboratory_exams[filesKey];
                                            files = raw ? JSON.parse(raw) : [];
                                        } catch (e) {
                                            console.warn(`Error parsing filesKey "${filesKey}"`, e);
                                            files = [];
                                        }

                                        return (
                                            <div key={key} className="exam-box">
                                                <h5>{key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</h5> {/* Format key name */}
                                                <p>{result || "No result available"}</p>

                                                <div className="d-flex gap3">
                                                    {files.map(file => (
                                                        <MedicalHistoryFileBoxRead file={file.file} desc={file.desc}/>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <h3 className="mar-bottom-1">Diagnosis: </h3>

                                <div className="d-flex gap1 mar-bottom-2">
                                    <div className="w-100">
                                        <h5>Tentative Diagnosis</h5>
                                        <p>{selectedPetMedHist.diagnosis.tentative_diagnosis}</p>
                                    </div>
                                    <div className="w-100">
                                        <h5>Final Diagnosis</h5>
                                        <p>{selectedPetMedHist.diagnosis.final_diagnosis}</p>
                                    </div>
                                    <div className="w-100">
                                        <h5>Prognosis</h5>
                                        <p>{selectedPetMedHist.diagnosis.prognosis}</p>
                                    </div>
                                </div>
                                <div className="d-flex gap1 mar-bottom-2">
                                    <div className="w-100">
                                        <h5>Vaccine Given</h5>
                                        <p>{selectedPetMedHist.diagnosis.vaccine_given}</p>
                                    </div>
                                    <div className="w-100">
                                        <h5>Prescribed Medication</h5>
                                        <p>{selectedPetMedHist.diagnosis.prescribed_medication}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )
            : (
                <Spin size="large"/>
            )}
        </div>
    )
}
