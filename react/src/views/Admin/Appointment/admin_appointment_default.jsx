import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminAppointmentDefault() {
    const [activeTab, setActiveTab] = useState("Pending");

    return(
        <div className="page inter">
            <div className="bg book-appointment gen-margin">
                <div className="mini-nav bottom-margin">
                    <div className="anybody medium-f bold">Appointments</div>
                    <div className="separator left-margin-s right-margin-s"></div>
                    <Link to={'../ClinicCalendar'}>
                        <div className="anybody small-f semi-bold">Clinic Calendar</div>
                    </Link>
                </div>

                <div className="myappt small-form bottom-margin-s text-center">
                    <div className='myappt-navigation d-flex '>
                        <Link to={''} className="anybody semi-bold right-margin">
                            <div className="a-tab">
                                Pending
                                <div className={`nav1-line${activeTab === "Pending" ? " active" : ""}`}></div>
                            </div>
                        </Link>
                        <Link to={'Approved'} className="anybody semi-bold right-margin">
                            <div className="a-tab">
                            Approved
                                <div className={`nav1-line${activeTab === "Approved" ? " active" : ""}`}></div>
                            </div>
                        </Link>
                        <Link to={'Completed'} className="anybody semi-bold right-margin">
                            <div className="a-tab">
                                Completed
                                <div className={`nav1-line${activeTab === "Completed" ? " active" : ""}`}></div>
                            </div>
                        </Link>
                        <Link to={'Cancelled'} className="anybody semi-bold right-margin">
                            <div className="a-tab">
                                Cancelled
                                <div className={`nav1-line${activeTab === "Cancelled" ? " active" : ""}`}></div>
                            </div>
                        </Link>
                    </div>
                </div>

                <Outlet context={{setActiveTab}}/>         
            </div>
        </div>
    )
}