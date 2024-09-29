import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/bookappointment.css";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import ClientCalendar from "../../components/calendar.jsx";
import Dropdown from "../../components/dropdowns.jsx";
import MyAppointments from "./myappointments.jsx";

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
        if (!pet || !service) {
          setSubmissionMessage("Please select a pet and type of service.");
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
      };

    return(
        <body>
            <div className="bg book-appointment gen-margin">
                <div className="mini-nav bottom-margin"><div className="anybody medium bold">Book Appointment</div><div className="separator"></div><Link to={'MyAppointments'}><div className="anybody small sem-bold">My Appointments</div></Link></div>
                <div className="grid inter">
                <ClientCalendar />
                <div className="small-form">
                    <form>
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
                    </form>
                </div>
                </div>
            </div>
        </body>

    );
}
