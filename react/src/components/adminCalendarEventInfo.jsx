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
                    Service: {appointment.service.service}
                </div>
            </div>

            <div className="deet d-flex bottom-margin-s anybody justify-content-between">
                <div className="lcolumn d-flex">
                    <div className="s-align-center label bold ">Date:</div>
                    <div className="s-align-center date-cont">
                        {formatDate(appointment.date_time)}
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
                <div className="s-align-center date-cont">{appointment.pet.breed.breed}</div>
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
            <div className="">
                <div className="s-align-center label bold ">Notes:</div>
                {appointment.note || "N/A"}
            </div>
        </>
    );
}
