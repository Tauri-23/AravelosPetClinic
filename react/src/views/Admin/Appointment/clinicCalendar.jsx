import React, { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import AdminCalendar from '../../../components/adminCalendar.jsx'
import CustomToolbar from '../../../components/custom_toolbar.jsx'
import { useStateContext } from '../../../contexts/ContextProvider.jsx';
import { useEffect, useState } from "react";
import { formatDateForMySQL, isEmptyOrSpaces, notify } from "../../../assets/js/utils.jsx";
import axiosClient from "../../../axios-client.js";
import { useModal } from "../../../contexts/ModalContext.jsx";
import { fetchAppointmentDetails } from '../../../services/AppointmentServices.jsx';
import "../../../assets/css/clinicCalendar.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Solid icons
import { far } from '@fortawesome/free-regular-svg-icons'; // Regular icons
import { fab } from '@fortawesome/free-brands-svg-icons'; // Brand icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas, far, fab);
function ClinicCalendar() {
    const schedOptions = [
        { value: "month", label: "By Day" },
        { value: "week", label: "By Day Timeslot" },
    ];
    const service ="vaccination";
    const clickRef = useRef(null)
    const [selectedAppointment, setSelectedAppointment] = useState(null); // State for selected appointment

    useEffect(() => {
      /**
       * What Is This?
       * This is to prevent a memory leak, in the off chance that you
       * teardown your interface prior to the timed method being called.
       * di ko nagets*/
      return () => {
        window.clearTimeout(clickRef?.current)
      }
    }, []);
    const onSelectEvent = useCallback((calEvent) => {
        window.clearTimeout(clickRef?.current);

        clickRef.current = window.setTimeout(async () => {
            if (calEvent) {
                console.log('Selected Appointment ID:', calEvent.resource);

                // Get appointment details using the ID stored in resource
                try {
                    const data = await fetchAppointmentDetails(calEvent.resource);
                    setSelectedAppointment(data);
                } catch (error) {
                    console.error(error);
                }
            }
        }, 250);
    }, []);

  return (
    <div className="page book-appointment clinic-cal">
            <div className="bg gen-margin">
                <div className="mini-nav bottom-margin-s">
                    <div className="anybody medium-f bold">Clinic Calendar</div>
                    <div className="separator left-margin-s right-margin-s"></div>
                    <Link to={'/AdminIndex/Appointments'}>
                        <div className="anybody small-f semi-bold">Appointments</div>
                    </Link>
                </div>
                <div className="grid inter">
                        <AdminCalendar
                            CustomToolbar={CustomToolbar}
                            onSelectEvent={onSelectEvent}// Pass the custom toolbar here
                        />
                    <div className="small-form">
                        <div className="bottom-margin-s d-flex anybody">
                            <div className='client-pic right-margin'></div>
                            <div className='client-name bold s-align-center'>Xander Aleck Gwynnz Deloso</div>
                        </div>
                        <div className = "deet d-flex bottom-margin-s">
                            <div className="anybody d-flex s-align-center">

                                <div className='s-align-center label bold '>Service:</div>
                                {service === "checkup" ?
                                    (<>
                                        <div className = "s-align-center">
                                            <FontAwesomeIcon className="service-icon  "icon={['fas', 'clipboard']} />
                                        </div>
                                        <div className = "s-align-centers service-text">Checkup Appointment</div>
                                        </>
                                    )
                                    : service === "vaccination"? (<>
                                        <div className = "s-align-center">
                                            <FontAwesomeIcon className="service-icon  " icon={['fas', 'syringe']} />
                                        </div>
                                        <div className = "s-align-center service-text">Vaccination Appointment</div>
                                        </>
                                    )
                                    : service === "grooming"? (<>
                                        <div className = "s-align-center">
                                            <FontAwesomeIcon className="service-icon  " icon={['fas','scissors']} />
                                        </div>
                                        <div className = "s-align-center service-text">Grooming Appointment</div>
                                        </>
                                    )
                                    : service === "parasiticControl"? (<>
                                        <div className = "s-align-center">
                                            <FontAwesomeIcon className="service-icon  " icon={['fas', 'bug-slash']} />
                                        </div>
                                        <div className = "s-align-center service-text">Parasitic Control Appointment</div>
                                        </>
                                    )
                                    :service === "deworming"? (<>
                                        <div className = "s-align-center">
                                            <FontAwesomeIcon className="service-icon  " icon={['fas', 'worm']} />
                                        </div>
                                        <div className = "s-align-center service-text">Deworming</div>
                                        </>
                                    ): null

                                }

                                </div>
                        </div>
                        <div className='deet d-flex bottom-margin-s anybody justify-content-between'>
                            <div className='lcolumn d-flex'>
                            <div className='s-align-center label bold '>Date:</div>
                            <div className='s-align-center date-cont'>October 20, 2024</div>
                            </div>
                            {/*if may time (not 00:00:00)*/}
                            <div className='rcolumn d-flex'>
                            <div className='s-align-center label bold'>Time:</div>
                            <div className='s-align-center time-cont right-margin'>12:00 PM</div>
                            </div>
                        </div>
                        <div className = "deet d-flex bottom-margin-s">
                            <div className='pet-pic right-margin-s'></div>
                            <div className='anybody pet-name bold s-align-center'>Chuchay</div>
                        </div>
                        <div className='deet d-flex anybody'>

                            <div className='s-align-center label bold '>Breed:</div>
                            <div className='s-align-center date-cont'>Shih Tzu</div>
                        </div>
                        <div className='deet d-flex anybody'>

                            <div className='s-align-center label bold '>Weight:</div>
                            <div className='s-align-center date-cont'>5kg</div>
                        </div>
                        <div className='deet d-flex anybody'>

                            <div className='s-align-center label bold '>Gender:</div>
                            <div className='s-align-center date-cont'>Female</div>
                        </div>
                        <div className='deet d-flex anybody'>

                            <div className='s-align-center label bold '>Age:</div>
                            <div className='s-align-center date-cont'>5 years old</div>
                        </div>
                        <div className='deet-notes'>
                            <div className='s-align-center label bold '>Notes:</div>
                            <textarea className="notes" placeholder="madadagdagan pala ng notes na column yung appointments table..." readOnly/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ClinicCalendar
