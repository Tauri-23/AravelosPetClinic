import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate, formatTime, getAge } from "../assets/js/utils";

export default function AdminCalendarEventInfo({appointment}) {



    /**
     * Render
     */
    return (
        <>
            <div className="bottom-margin-s d-flex anybody">
                <div className="client-pic right-margin">
                    <img src={`/assets/media/pfp/${appointment.client.picture}`} alt="client_pfp"/>
                </div>
                <div className="client-name bold s-align-center">
                    {appointment.client.fname} {appointment.client.lname}
                </div>
            </div>

            <div className="deet d-flex bottom-margin-s">
                <div className="anybody d-flex s-align-center">
                    <div className="s-align-center label bold ">Service:</div>
                    {appointment.service === "checkup" ? (
                        <>
                            <div className="s-align-center">
                                <FontAwesomeIcon
                                    className="service-icon  "
                                    icon={["fas", "clipboard"]}
                                />
                            </div>
                            <div className="s-align-centers service-text">
                                Checkup Appointment
                            </div>
                        </>
                    ) : appointment.service === "vaccination" ? (
                        <>
                            <div className="s-align-center">
                                <FontAwesomeIcon
                                    className="service-icon  "
                                    icon={["fas", "syringe"]}
                                />
                            </div>
                            <div className="s-align-center service-text">
                                Vaccination Appointment
                            </div>
                        </>
                    ) : appointment.service === "grooming" ? (
                        <>
                            <div className="s-align-center">
                                <FontAwesomeIcon
                                    className="service-icon  "
                                    icon={["fas", "scissors"]}
                                />
                            </div>
                            <div className="s-align-center service-text">
                                Grooming Appointment
                            </div>
                        </>
                    ) : appointment.service === "parasiticControl" ? (
                        <>
                            <div className="s-align-center">
                                <FontAwesomeIcon
                                    className="service-icon  "
                                    icon={["fas", "bug-slash"]}
                                />
                            </div>
                            <div className="s-align-center service-text">
                                Parasitic Control Appointment
                            </div>
                        </>
                    ) : appointment.service === "deworming" ? (
                        <>
                            <div className="s-align-center">
                                <FontAwesomeIcon
                                    className="service-icon  "
                                    icon={["fas", "worm"]}
                                />
                            </div>
                            <div className="s-align-center service-text">
                                Deworming
                            </div>
                        </>
                    ) : null}
                </div>
            </div>

            <div className="deet d-flex bottom-margin-s anybody justify-content-between">
                <div className="lcolumn d-flex">
                    <div className="s-align-center label bold ">Date:</div>
                    <div className="s-align-center date-cont">
                        {formatDate(appointment.date_time)}
                    </div>
                </div>
                <div className="rcolumn d-flex">
                    <div className="s-align-center label bold">Time:</div>
                    <div className="s-align-center time-cont right-margin">
                        {formatTime(appointment.date_time)}
                    </div>
                </div>
            </div>

            <div className="deet d-flex bottom-margin-s">
                <div className="pet-pic right-margin-s">
                    <img src={`/assets/media/pets/${appointment.pet.picture}`} alt="pet_pfp"/>
                </div>
                <div className="anybody pet-name bold s-align-center">
                    {appointment.pet.name}
                </div>
            </div>
            <div className="deet d-flex anybody">
                <div className="s-align-center label bold ">Breed:</div>
                <div className="s-align-center date-cont">{appointment.pet.breed}</div>
            </div>
            <div className="deet d-flex anybody">
                <div className="s-align-center label bold ">Weight:</div>
                <div className="s-align-center date-cont">5kg</div>
            </div>
            <div className="deet d-flex anybody">
                <div className="s-align-center label bold ">Gender:</div>
                <div className="s-align-center date-cont">{appointment.pet.gender}</div>
            </div>
            <div className="deet d-flex anybody">
                <div className="s-align-center label bold ">Age:</div>
                <div className="s-align-center date-cont">{getAge(appointment.pet.dob)} year(s) old</div>
            </div>
            <div className="deet-notes">
                <div className="s-align-center label bold ">Notes:</div>
                <textarea
                    className="notes"
                    placeholder="madadagdagan pala ng notes na column yung appointments table..."
                    readOnly
                />
            </div>
        </>
    );
}
