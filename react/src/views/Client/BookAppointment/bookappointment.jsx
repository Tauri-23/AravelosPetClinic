import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import "../../../assets/css/bookappointment.css";
import ClientCalendar from "../../../components/clientCalendar.jsx";
import CustomToolbar from "../../../components/custom_toolbar.jsx";
import { formatTime, isEmptyOrSpaces, notify } from "../../../assets/js/utils.jsx";
import axiosClient from "../../../axios-client.js";
import { useModal } from "../../../contexts/ModalContext.jsx";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import { fetchAllPetsWhereClient } from '../../../services/PetServices.jsx';
import {Button, Calendar, DatePicker, Select, Spin, Steps, TimePicker} from "antd";
import { fetchAllClinicServices } from "../../../services/ClinicServicesServices.jsx";

export default function BookAppointment() {
    // VALIDATION:
    // 30 MINUTES CHECKUP PARASITIC CONTROL VACINNATION DEWORMING
    // 1 HR GROOMING
    // NO OVERLAP APPOINTMENTS IF BY TIMESLOT (SEP 2 AND SEP 2 OK, SEP 2 8AM AND SEP 2 8AM NOT OK)
    const navigate = useNavigate(); // Initialize useNavigate
    const {showModal} = useModal();

    // Data from database
    const {user} = useStateContext();
    const {setActiveNavLink} = useOutletContext();
    const [clinicServices, setClinicServices] = useState(null);
    const [pets, setPets] = useState(null);

    const timeOptions = ["08:00:00", "09:00:00", "10:00:00", "11:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00"]

    // selected
    const [selectedPet, setSelectedPet] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [note, setNote] = useState("");

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const [step, setStep] = useState(0);
    


    /**
     * On mount
     */
    useEffect(() => {
        setActiveNavLink("Book Appointment");
        
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
                formData.append("dateTime", `${selectedDate} ${selectedTime}`);
                formData.append("pet", selectedPet);
                formData.append('client', user.id);
                formData.append("service", selectedService);
                formData.append("status", "Pending");
                formData.append("note", note);
        
                axiosClient.post('/add-appointment', formData)
                .then(({data}) => {
                    if(data.status === 200) {
                        notify('success', data.message, 'top-center', 3000);
                        navigate("/ClientIndex/Appointments");
                    } else {
                        notify('success', data.message, 'top-center', 3000);
                    }
                }).catch(error =>console.error(error))
            }, 
            handleFunction
        });

    };

    const isButtonDisabled = () => {
        switch(step) {
            case 0:
                return selectedPet == "" || selectedService == "";
            default:
                return isEmptyOrSpaces(selectedDate) || isEmptyOrSpaces(selectedTime);
        }
    }

    const onDateSelect = (date, dateString) => {
        setSelectedDate(dateString);
    };



    /**
     * Render
     */
    return (
        <div className="content1">
            {clinicServices
                ? (
                    <>
                        <h3 className="fw-bold mar-bottom-1">Book Appointment</h3>

                        <div className="grid inter justify-content-center">
                            <div className="bookapt small-form">
                                <Steps
                                size="small"
                                current={step}
                                labelPlacement="vertical"
                                items={[
                                    {title: "Appointment Details"},
                                    {title: "Schedule"},
                                ]}
                                className="mar-bottom-1"/>

                                {step === 0 && (
                                    <form className="d-flex row"onSubmit={handleSubmit}>

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
                                            <Button
                                            size="large"
                                            type="primary"
                                            disabled={isButtonDisabled()}
                                            onClick={() => setStep(prev => prev + 1)}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </form>
                                )}

                                {step === 1 && (
                                    <div className="d-flex flex-direction-y gap3">
                                        <div>
                                            <label htmlFor="date">Select Date</label>
                                            <DatePicker 
                                            size="large" 
                                            id="date" 
                                            className="w-100"
                                            onChange={onDateSelect}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="time">Select Date</label>
                                            <div className="d-flex gap3 flex-wrap">
                                                {timeOptions.map(time => (
                                                    <Button
                                                    key={time}
                                                    type={selectedTime === time ? "primary" : "default"}
                                                    onClick={() => setSelectedTime(time)}>
                                                        {formatTime(time)}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>

                                        

                                        <div className="d-flex justify-content-center gap3">
                                            <Button
                                            type="default"
                                            size="large"
                                            onClick={() => setStep(prev => prev -1)}
                                            >
                                                Back
                                            </Button>

                                            <Button
                                            type="primary"
                                            size="large"
                                            disabled={isButtonDisabled()}
                                            onClick={handleSubmit}
                                            >
                                                Book Appointment
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>


                        </div>
                    </>
                )
                : (
                    <Spin size="large"/>
                )}
        </div>
    );
}
