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
                {appointment.type === "Online" && (
                    <div className="client-pic right-margin">
                        <img src={`/assets/media/pfp/${appointment.client.picture}`} alt="client_pfp"/>
                    </div>
                )}
                <div className="client-name bold s-align-center">
                    {appointment.type === "Online" ? `${appointment.client.fname} ${appointment.client.lname}` : appointment.otc_client}
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
                {appointment.type === "Online" && (
                    <div className="pet-pic right-margin-s">
                        <img src={`/assets/media/pets/${appointment.pet.picture}`} alt="pet_pfp"/>
                    </div>
                )}
                <div className="anybody pet-name bold s-align-center">
                    {appointment.type === "Online" ? appointment.pet.name : appointment.otc_pet_name}
                </div>
            </div>
            <div className="deet d-flex anybody">
                <div className="s-align-center label bold ">Breed:</div>
                <div className="s-align-center date-cont">{appointment.type === "Online" ? appointment.pet.breed.breed : appointment.otc_pet_breed}</div>
            </div>
            {appointment.type === "Online" && (
                <>
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
                </>
            )}
            <div className="">
                <div className="s-align-center label bold ">Notes:</div>
                {appointment.note || "N/A"}
            </div>
        </>
    );
}
