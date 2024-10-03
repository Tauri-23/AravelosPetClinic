import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/bookappointment.css";
import ClientCalendar from "../../../components/calendar.jsx";
import CustomToolbar from "../../../components/custom_toolbar.jsx";
import { formatDateForMySQL, isEmptyOrSpaces, notify } from "../../../assets/js/utils.jsx";
import axiosClient from "../../../axios-client.js";
import { useModal } from "../../../contexts/ModalContext.jsx";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import { fetchAllPetsWhereClient } from '../../../services/PetServices';

export default function BookAppointment() {
    // VALIDATION:
    // 30 MINUTES CHECKUP PARASITIC CONTROL VACINNATION DEWORMING
    // 1 HR GROOMING
    // ONLY 8AM TO 3PM
    // CANT BOOK 3PM APPOINTMENT BC LAGPAS NA
    // NO OVERLAP APPOINTMENTS
    const navigate = useNavigate(); // Initialize useNavigate
    const {showModal} = useModal();
    const {user} = useStateContext();
    const [pets, setPets] = useState(null);
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
        { value: "month", label: "By Day" },
        { value: "week", label: "By Day Timeslot" },
    ];

    // Btn State
    const [submitBtnActive, setSubmitBtnActive] = useState(false);

    // selecteds
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [calendarView, setCalendarView] = useState("month"); // Default to "month" view // State to hold calendar view
    const [selectedPet, setSelectedPet] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [dateUnformatted, setDateUnformatted] = useState(null); // Add this line for unformatted date

    // State to hold submission message
    const [submissionMessage, setSubmissionMessage] = useState("");

    // Handle form submission
    const handleSubmitPost = () => {
        const formData = new FormData();
        formData.append("dateTime", dateUnformatted);
        formData.append("pet", selectedPet);
        formData.append('client', user.id);
        formData.append("service", selectedService);
        formData.append("status", "Pending");

        axiosClient.post('/add-appointment', formData)
        .then(({data}) => {
            if(data.status === 200) {
                notify('success', data.message, 'top-center', 3000);
                navigate("MyAppointments");
            } else {
                notify('success', data.message, 'top-center', 3000);
            }
        }).catch(error =>console.error(error))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        showModal('AddAppointmentConfirmationModal1', {handleYesConfirmationPost: handleSubmitPost});

    };

    const handleDateSelect = (dateTime) => {
        const date = new Date(dateTime);
        if (calendarView === "month") {
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);//CONVERT TO UTC >:(
            setDateUnformatted(date.toISOString().slice(0, 10));
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Manila'
            });
            setDateUnformatted(localDate.toISOString().slice(0, 19).replace('T', ' '));
            setSelectedDateTime(formattedDate);
        } else if (calendarView === "week") {
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);//CONVERT TO UTC >:(
            const formattedDateTime = date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                timeZone: 'Asia/Manila'
            });
            setSelectedDateTime(formattedDateTime);
            setDateUnformatted(localDate.toISOString().slice(0, 19).replace('T', ' '));
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
        const getAllPets = async() => {
          try {
            const data = await fetchAllPetsWhereClient(user.id);
            setPets(data);
          } catch (error) {
            console.error(error);
          }
        }

        getAllPets();
      }, []);
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
    const leftBTN = "sub-button";
    const rightBTN = "main-button";
    return (
        <div className="page">
            <div className="bg book-appointment gen-margin">
                <div className="mini-nav bottom-margin">
                    <div className="anybody medium-f bold">Book Appointment</div>
                    <div className="separator left-margin-s right-margin-s"></div>
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
                        <div className="bottom-margin semi-bold anybody semi-medium-f">Appointment Details</div>
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
                                    <option value={''}>Select a pet</option>
                                    {pets?.length > 0 && pets.map(pet => (
                                        <option key={pet.id} value={pet.id}>{pet.name}</option>
                                    ))}
                                    {pets?.length < 1 && <option value={''}>No registered pets</option>}
                                </select>
                            </div>

                            <div className="d-flex flex-direction-y gap4 mar-bottom-3">
                                <label htmlFor="serviceType" className="choose semi-bold">Choose Service</label>
                                <select id="serviceType" value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                                    <option value={''}>Select a service</option>
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
