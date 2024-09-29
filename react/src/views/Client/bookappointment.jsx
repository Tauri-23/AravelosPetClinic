import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/bookappointment.css";
import ClientCalendar from "../../components/calendar.jsx";
import Dropdown from "../../components/dropdowns.jsx";
import Button from "../../components/button.jsx";
import CustomToolbar from "../../components/custom_toolbar.jsx";

export default function BookAppointment() {
    const navigate = useNavigate(); // Initialize useNavigate

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

    const schedOptions = [
        { id: "month", label: "By Month" },
        { id: "time", label: "By Day Timeslot" },
    ];

    // State to hold form data
    const [formData, setFormData] = useState({
        pet: "",
        service: "",
        schedule: "month", // Default to "By Month"
    });

    // State to hold submission message
    const [submissionMessage, setSubmissionMessage] = useState("");

    // State to hold selected date and time
    const [selectedDateTime, setSelectedDateTime] = useState("");

    // State to hold calendar view
    const [calendarView, setCalendarView] = useState("month"); // Default to "month" view

    // Handle changes from Dropdown components
    const handleDropdownChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Switch calendar view based on schedule type
        if (name === "schedule") {
            setCalendarView(value === "time" ? "week" : "month");
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const { pet, service } = formData;

        // Simple validation
        if (!pet || !service || !selectedDateTime) {
            alert("Please select a pet, type of service, and date.");
            return;
        }

        // Here you can handle form submission, e.g., send data to an API
        console.log("Form Data:", formData);

        // Display success message
        alert("Appointment booked successfully!");

        // Reset form
        setFormData({
            pet: "",
            service: "",
            schedule: "month", // Reset to default
        });
        navigate("MyAppointments"); // Reset selected date and time
    };

    // Function to handle the selected date from ClientCalendar
    const handleDateSelect = (dateTime) => {
        const date = new Date(dateTime);
        if (formData.schedule === "month") {
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            setSelectedDateTime(formattedDate); // Update selected date state
        } else if (formData.schedule === "time") {
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

    return (
        <div className="page">
            <div className="bg book-appointment gen-margin">
                <div className="mini-nav bottom-margin">
                    <div className="anybody medium bold">Book Appointment</div>
                    <div className="separator"></div>
                    <Link to={'MyAppointments'}>
                        <div className="anybody small semi-bold">My Appointments</div>
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
                            <div class=" bottom-margin-s"><span className="semi-bold">Date: </span><span className="bottom-margin">{selectedDateTime || 'Select a date'}</span></div>

                             <Dropdown
                                label="Choose Scheduling"
                                options={schedOptions}
                                name="schedule"
                                onChange={handleDropdownChange}
                                placeholder="Choose Scheduling"
                            />
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
                            <div class="d-flex justify-content-center">
                                <Button
                                    label="Click Me"
                                    onClick={handleSubmit}
                                    className="main-button" // Optional: Add additional class
                                    style={{ margin: '10px' }} // Optional: Inline styles
                                />
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
