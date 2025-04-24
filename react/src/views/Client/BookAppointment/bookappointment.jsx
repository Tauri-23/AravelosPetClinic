import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "../../../assets/css/bookappointment.css";
import { notify } from "../../../assets/js/utils.jsx";
import { useModal } from "../../../contexts/ModalContext.jsx";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import { fetchAllPetsWhereClient } from '../../../services/PetServices.jsx';
import {Button, Spin} from "antd";
import { fetchAllClinicServices } from "../../../services/ClinicServicesServices.jsx";
import {fetchAllPendingApprovedAptsThisWeekWhereClient} from "../../../services/AppointmentServices.jsx";

import "../BookAppointment/css/client_book_appointment.css";
import * as Icon from "react-bootstrap-icons";
import axiosClient from "../../../axios-client.js";

export default function BookAppointment() {
    const navigate = useNavigate(); // Initialize useNavigate
    const {showModal} = useModal();

    // Data from database
    const {user} = useStateContext();
    const {setActiveNavLink} = useOutletContext();
    const [clinicServices, setClinicServices] = useState(null);
    const [pets, setPets] = useState(null);

    // selected
    const [selectedPets, setSelectedPets] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [note, setNote] = useState("");

    const [aptsThisWeek, setAptsThisWeek] = useState(0);



    /**
     * On mount
     */
    useEffect(() => {
        setActiveNavLink("Book Appointment");

        const getAll = async() => {
            const [clinicServicesDb, petsDb, aptsThisWeekDb] = await Promise.all([
                fetchAllClinicServices(),
                fetchAllPetsWhereClient(user.id),
                fetchAllPendingApprovedAptsThisWeekWhereClient(user.id),
            ]);

            setClinicServices(clinicServicesDb);
            setPets(petsDb);
            setAptsThisWeek(aptsThisWeekDb.length);
        }

        getAll();
    }, []);



    /**
     * handlers
     */
    const handleAddPet = () => {
        showModal("ClientBookAptAddPet", {pets, selectedPets, setSelectedPets, setSelectedServices});
    }

    const handleRemovePet = (pet, index) => {
        setSelectedPets(prev => prev.filter(y => y.id !== pet.id));
        setSelectedServices(prev => prev.filter((_, i) => i !== index));
    }

    const handleAddPetService = (index) => {
        showModal("ClientBookAptAddPetService", {index, services: clinicServices, selectedServices, setSelectedServices});
    }

    const handleBookAppointmentPost = () => {
        const formData = new FormData();

        formData.append("client", user.id);
        formData.append("note", note);
        formData.append("selectedPets", JSON.stringify(selectedPets));
        formData.append("selectedServices", JSON.stringify(selectedServices));

        axiosClient.post("/book-appointment", formData)
        .then(({data}) => {
            if(data.status === 200) {
                navigate('/ClientIndex/Appointments');
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
    return (
        <div className="content1">
            {clinicServices
                ? (aptsThisWeek > 2
                    ? (<h1 className="bg-red1 color-white">You Can Only Book 3 Appointments Per Week</h1>)
                    : (
                        <>
                            <h3 className="fw-bold mar-bottom-1">Book Appointment</h3>

                            <div className="grid inter justify-content-center">
                                <div className="bookapt small-form">
                                    <div>
                                        <h4>Selected pets</h4>
                                        
                                        <div className="d-flex flex-direction-y gap3">

                                            {selectedPets.length > 0
                                            ? selectedPets.map((pet, index) => (
                                                <div 
                                                key={index}
                                                className="client-book-apt-pet-box">
                                                    <div className="circle-btn1 semi-medium-f bottom-margin-s position-absolute" style={{top: 5, right: 5}} >
                                                        <Icon.X className="pointer" onClick={() => handleRemovePet(pet, index)}/>
                                                    </div>
                                                    <h4 className="mar-bottom-2">{pet.name}</h4>
                                                    <h6>Services:</h6>
                                                    <div className="d-flex flex-wrap gap3 align-items-center">
                                                        {selectedServices[index].map((service, index) => (
                                                            <div key={index} className="client-book-apt-service-box">
                                                                <h5>{service.serviceName}</h5>
                                                                <span>{service.serviceTypeName}</span>
                                                            </div>
                                                        ))}
                                                        <Button onClick={() => handleAddPetService(index)}>Add Services</Button>
                                                    </div>
                                                </div>
                                            ))
                                            : (<>No Selected Pets</>)}
                                        </div>
                                        <div className="d-flex justify-content-end gap3 mar-top-1">
                                            <Button 
                                            size="large"
                                            onClick={handleAddPet}>
                                                Add Pet
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    <div className="d-flex justify-content-end mar-top-1">
                                        <Button
                                        size="large"
                                        type="primary"
                                        onClick={handleBookAppointmentPost}>
                                            Book Appointment
                                        </Button>
                                    </div>
                                </div>


                            </div>
                        </>
                    )
                )
                : (
                    <Spin size="large"/>
                )}
        </div>
    );
}
