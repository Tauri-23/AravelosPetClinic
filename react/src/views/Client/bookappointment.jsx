import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/bookappointment.css";
import ClientCalendar from "../../components/calendar.jsx";
import Dropdown from "../../components/dropdowns.jsx";

export default function BookAppointment() {
    const petOptions = [
        { id: "chuchay", label: "Chuchay" },
        { id: "piola", label: "Piola" },
    ];

    const serviceOptions = [
        { id: "checkup", label: "Check-up" },
        { id: "deworming", label: "Deworming" },
        { id: "grooming", label: "Grooming" },
        { id: "parasiticControl", label: "Parasitic Control" },
        { id: "vaccination", label: "Vaccination" },
    ];

    // State to hold form data
    const [formData, setFormData] = useState({
        pet: "",
        service: "",
    });

    // State to hold submission message
    const [submissionMessage, setSubmissionMessage] = useState("");

    // State to hold selected date
    const [selectedDate, setSelectedDate] = useState("");

    // Handle changes from Dropdown components
    const handleDropdownChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const { pet, service } = formData;

        // Simple validation
        if (!pet || !service || !selectedDate) {
            setSubmissionMessage("Please select a pet, type of service, and date.");
            return;
        }

        // Here you can handle form submission, e.g., send data to an API
        console.log("Form Data:", formData);

        // Display success message
        setSubmissionMessage("Appointment booked successfully!");

        // Reset form
        setFormData({
            pet: "",
            service: "",
        });
        setSelectedDate(""); // Reset selected date
    };

    // Function to handle the selected date from ClientCalendar
    const handleDateSelect = (date) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        setSelectedDate(formattedDate); // Update selected date state
    };

    return (
        <div className = "page">
            <div className="bg book-appointment gen-margin">
                <div className="mini-nav bottom-margin">
                    <div className="anybody medium bold">Book Appointment</div>
                    <div className="separator"></div>
                    <Link to={'MyAppointments'}>
                        <div className="anybody small sem-bold">My Appointments</div>
                    </Link>
                </div>
                <div className="grid inter">
                    <ClientCalendar onDateSelect={handleDateSelect} />
                    <div className="small-form">
                        <form onSubmit={handleSubmit}>
                            <Dropdown
                                label="Choose Pet"
                                options={petOptions}
                                name="pet"
                                onChange={handleDropdownChange}
                                placeholder="Choose Pet"
                            />
                            <Dropdown
                                label="Choose Service"
                                options={serviceOptions}
                                name="service"
                                onChange={handleDropdownChange}
                                placeholder="Choose Service"
                            />
                            <span className="choose">Date: {selectedDate || 'Select a date'}</span> {/* Display selected date */}
                            <button type="submit">Book Appointment</button>
                        </form>
                        {submissionMessage && <p>{submissionMessage}</p>} {/* Display submission message */}
                    </div>
                </div>
            </div>
        </div>
    );
}
