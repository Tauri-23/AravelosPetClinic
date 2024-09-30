import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/bookappointment.css";
import ClientCalendar from "../../../components/calendar.jsx";
import Dropdown from "../../../components/dropdowns.jsx";
import Button from "../../../components/button.jsx";
import CustomToolbar from "../../../components/custom_toolbar.jsx";
import { formatDateForMySQL, isEmptyOrSpaces, notify } from "../../../assets/js/utils.jsx";
import axiosClient from "../../../axios-client.js";
import { useModal } from "../../../contexts/ModalContext.jsx";

export default function BookAppointment() {
    const navigate = useNavigate(); // Initialize useNavigate
    const {showModal} = useModal();

    const petOptions = [
        { id: 1, name: "Chuchay" },
        { id: 2, name: "Piola" },
    ];
    const serviceOptions = [
        { id: "checkup", label: "Check-up" },
        { id: "deworming", label: "Deworming" },
        { id: "grooming", label: "Grooming" },
        { id: "parasiticControl", label: "Parasitic Control" },
        { id: "vaccination", label: "Vaccination" },
    ];
    const schedOptions = [
        { value: "month", label: "By Month" },
        { value: "week", label: "By Day Timeslot" },
    ];

    // Btn State
    const [submitBtnActive, setSubmitBtnActive] = useState(false);

    // selecteds
    const [selectedDateTime, setSelectedDateTime] = useState("");
    const [calendarView, setCalendarView] = useState("month"); // Default to "month" view // State to hold calendar view
    const [selectedPet, setSelectedPet] = useState('');
    const [selectedService, setSelectedService] = useState('');

    // State to hold submission message
    const [submissionMessage, setSubmissionMessage] = useState("");
    

    
    

    // Handle form submission
    const handleSubmitPost = () => {
        const formData = new FormData();
        formData.append("dateTime", formatDateForMySQL(selectedDateTime));
        formData.append("pet", selectedPet);
        formData.append("service", selectedService);

        axiosClient.post('/add-appointment', formData)
        .then(({data}) => {
            if(data.status === 200) {
                notify('success', data.message, 'top-center', 3000);
                navigate("MyAppointments"); // Reset selected date and time
            } else {
                notify('success', data.message, 'top-center', 3000);
            }
        }).catch(error =>console.error(error))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        showModal('AgentDelListingConfirmationModal1', {handleYesConfirmationPost: handleSubmitPost});
        
    };

    // Function to handle the selected date from ClientCalendar
    const handleDateSelect = (dateTime) => {
        const date = new Date(dateTime);
        if (calendarView === "month") {
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            setSelectedDateTime(formattedDate); // Update selected date state
        } else if (calendarView === "time") {
            const formattedDateTime = date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            });
            setSelectedDateTime(formattedDateTime); // Update selected date and time state
        }
    };

    /* 
    |Degubbing
    */
    // useEffect(() => {
    //     console.log(selectedPet)
    // }, [selectedPet])
    // useEffect(() => {
    //     console.log(selectedService)
    // }, [selectedService])

    // Check the btn state
    useEffect(() => {
        if(isEmptyOrSpaces(selectedDateTime) || isEmptyOrSpaces(selectedPet) || isEmptyOrSpaces(selectedService)) {
            setSubmitBtnActive(false);
        }
        else {
            setSubmitBtnActive(true);
        }
    }, [selectedDateTime, selectedPet, selectedService]);

    const modalHeader = "Confirm Appointment";
    const modalText = "Are you sure you want to book this appointment?";
    const leftBTNLBL = "Cancel";
    const rightBTNLBL = "Confirm";
    const leftBTN = "sub-button"; // Optional: Customize class
    const rightBTN = "main-button"; // Optional: Customize class
    return (
        <div className="page">
            <div className="bg book-appointment gen-margin">
                <div className="mini-nav bottom-margin">
                    <div className="anybody medium bold">Book Appointment</div>
                    <div className="separator"></div>
                    <Link to={'MyAppointments'}>
                        <div className="anybody small-f semi-bold">My Appointments</div>
                    </Link>
                </div>
                <div className="grid inter">
                    <ClientCalendar
                        onDateSelect={handleDateSelect}
                        calendarView={calendarView}
                        CustomToolbar={CustomToolbar} // Pass the custom toolbar here
                    />
                    <div className="bookapt small-form">
                        <div className="bottom-margin semi-bold anybody semi-medium">Appointment Details</div>
                        <form className="d-flex row"onSubmit={handleSubmit}>
                            <div className="bottom-margin-s"><span className="semi-bold">Date: </span><span className="bottom-margin">{selectedDateTime || 'Select a date'}</span></div>

                            <div className="d-flex flex-direction-y gap4 mar-bottom-3">
                                <label htmlFor="viewType" className="choose semi-bold">Choose Scheduling</label>
                                <select id="viewType" value={calendarView} onChange={(e) => setCalendarView(e.target.value)}>
                                    {schedOptions.map(sched=> (
                                        <option key={sched.value} value={sched.value}>{sched.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="d-flex flex-direction-y gap4 mar-bottom-3">
                                <label htmlFor="petSelect" className="choose semi-bold">Choose Pet</label>
                                <select id="petSelect" value={selectedPet} onChange={(e) => setSelectedPet(e.target.value)}>
                                    <option value={''}>Select pet</option>
                                    {petOptions.map(pet=> (
                                        <option key={pet.id} value={pet.id}>{pet.name} {pet.id}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="d-flex flex-direction-y gap4 mar-bottom-3">
                                <label htmlFor="serviceType" className="choose semi-bold">Choose Service</label>
                                <select id="serviceType" value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                                    <option value={''}>Select service</option>
                                    {serviceOptions.map(service=> (
                                        <option key={service.id} value={service.id}>{service.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="d-flex justify-content-center">

                            <button 
                                disabled={!submitBtnActive}
                                className={`primary-btn-blue1 ${submitBtnActive ? '' : 'disabled'}`}
                                onClick={handleSubmit}
                            >
                                Book Appointment
                            </button>

                            {/* <Button
                                    label="Book Appointment"
                                    onClick={handleSubmit}
                                    validate={validate}
                                    className="main-button top-margin" // Optional: Add additional class
                                    modalHeader={modalHeader} // Pass modalHeader
                                    modalText={modalText} // Pass modalText
                                    leftBTN={leftBTN} // Pass left button class
                                    rightBTN={rightBTN} // Pass right button class
                                    leftBTNLBL={leftBTNLBL} // Pass left button label
                                    rightBTNLBL={rightBTNLBL} // Pass right button label
                                /> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
