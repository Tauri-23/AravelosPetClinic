import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/bookappointment.css";
import ClientCalendar from "../../../components/clientCalendar.jsx";
import CustomToolbar from "../../../components/custom_toolbar.jsx";
import { isEmptyOrSpaces, notify } from "../../../assets/js/utils.jsx";
import axiosClient from "../../../axios-client.js";
import { useModal } from "../../../contexts/ModalContext.jsx";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import { fetchAllPetsWhereClient } from '../../../services/PetServices';
import {Select, Spin} from "antd";
import { fetchAllClinicServices } from "../../../services/ClinicServicesServices.jsx";

export default function BookAppointment() {
    // VALIDATION:
    // 30 MINUTES CHECKUP PARASITIC CONTROL VACINNATION DEWORMING
    // 1 HR GROOMING
    // NO OVERLAP APPOINTMENTS IF BY TIMESLOT (SEP 2 AND SEP 2 OK, SEP 2 8AM AND SEP 2 8AM NOT OK)
    const navigate = useNavigate(); // Initialize useNavigate
    const {showModal} = useModal();

    // Data from database
    const {user} = useStateContext();const schedOptions = [
        { value: "month", label: "By Day" },
        { value: "week", label: "By Day Timeslot" },
    ];
    const [clinicServices, setClinicServices] = useState(null);
    const [pets, setPets] = useState(null);

    // Btn State
    const [submitBtnActive, setSubmitBtnActive] = useState(false);

    // selecteds
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [calendarView, setCalendarView] = useState("month"); // Default to "month" view // State to hold calendar view
    const [selectedPet, setSelectedPet] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [dateUnformatted, setDateUnformatted] = useState(null); // Add this line for unformatted date
    const [note, setNote] = useState('');
    


    /**
     * On mount
     */
    useEffect(() => {
        const getAll = async() => {
            const [clinicServicesDb, petsDb] = await Promise.all([
                fetchAllClinicServices(),
                fetchAllPetsWhereClient(user.id)
            ]);

            setClinicServices(clinicServicesDb);
            setPets(petsDb);
        }

        getAll();
    }, []);

    

    /**
     * handlers
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const handleFunction = "handleAddPost";
        showModal('ConfirmActionModal1', {
            handlePost: () => {
                const formData = new FormData();
                formData.append("dateTime", dateUnformatted);
                formData.append("pet", selectedPet);
                formData.append('client', user.id);
                formData.append("service", selectedService);
                formData.append("status", "Pending");
                formData.append("note", note);
        
                axiosClient.post('/add-appointment', formData)
                .then(({data}) => {
                    if(data.status === 200) {
                        notify('success', data.message, 'top-center', 3000);
                        navigate("MyAppointments");
                    } else {
                        notify('success', data.message, 'top-center', 3000);
                    }
                }).catch(error =>console.error(error))
            }, 
            handleFunction
        });

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
            });
            setSelectedDateTime(formattedDateTime);
            setDateUnformatted(localDate.toISOString().slice(0, 19).replace('T', ' '));
        }
    };

    useEffect(() => {
        if(selectedDateTime === null || selectedPet === "" || selectedService === "") {
            setSubmitBtnActive(false);
        }
        else {
            setSubmitBtnActive(true);
        }
    }, [selectedDateTime, selectedPet, selectedService]);



    /**
     * Render
     */
    return (
        <div className="page book-appointment">
            <div className="bg gen-margin">
                {clinicServices
                ? (
                    <>
                        <div className="mini-nav bottom-margin-s">
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

                                    {/* Choose Schedule Type */}
                                    <div className="d-flex flex-direction-y gap4 mar-bottom-3">

                                            <label htmlFor="viewType" className="choose semi-bold">Choose Scheduling</label>
                                            <Select
                                            id="viewType"
                                            size="large"
                                            value={calendarView}
                                            options={[
                                                ...schedOptions.map(sched => 
                                                ({label: sched.label, value: sched.value})
                                                )
                                            ]}
                                            onChange={(e) => setCalendarView(e)}/>

                                    </div>

                                    {/* Select a Pet */}
                                    <div className="d-flex flex-direction-y gap4 mar-bottom-3">

                                            <label htmlFor="petSelect" className="choose semi-bold">Choose Pet</label>
                                            <Select
                                            id="petSelect"
                                            size="large"
                                            value={selectedPet}
                                            options={[
                                                {label: "Select pet", value: ""},
                                                ...pets.map(pet => 
                                                    ({label: pet.name, value: pet.id})
                                                )
                                            ]}
                                            onChange={(e) => setSelectedPet(e)}
                                            />

                                    </div>

                                    {/* Select a Service Type */}
                                    <div className="d-flex flex-direction-y gap4 mar-bottom-3">

                                            <label htmlFor="serviceType" className="choose semi-bold">Choose Service</label>
                                            <Select
                                            id="serviceType"
                                            size="large"
                                            value={selectedService}
                                            options={[
                                                {label: "Select a service", value: ""},
                                                ...clinicServices.map(service => 
                                                    ({label: service.service, value: service.id})
                                                )
                                            ]}
                                            onChange={(e) => setSelectedService(e)}
                                            />

                                    </div>

                                    <div className="d-flex flex-direction-y gap4 mar-bottom-3">
                                            <label htmlFor="note" className="choose semi-bold">Note (optional)</label>
                                            <textarea 
                                            id="note"
                                            value={note}
                                            onInput={(e) => setNote(e.target.value)}></textarea>
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
                    </>
                )
                : (
                    <Spin size="large"/>
                )}
            </div>
        </div>
    );
}
