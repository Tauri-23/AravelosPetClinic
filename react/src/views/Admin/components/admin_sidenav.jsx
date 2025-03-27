import { Link } from "react-router-dom";
import { MdOutlineDashboard, MdDashboard  } from "react-icons/md";
import { RiHealthBookLine, RiHealthBookFill } from "react-icons/ri";
import { PiUsers, PiUsersBold } from "react-icons/pi";
import { RiFeedbackLine, RiFeedbackFill } from "react-icons/ri";
import { MdOutlineInventory2, MdInventory2 } from "react-icons/md";
import { BsCalendarWeek, BsCalendar3WeekFill } from "react-icons/bs";

export default function AdminSideNav({activeNavLink}) {
    return(
        <aside className="admin-sidenav">
            <div className="admin-sidenav-logo">
                <img src="/assets/media/logos/paw.png" className="admin-navbar-logo" alt="logo"/>
                Arevalo's Animal Clinic
            </div>


            <div className="admin-sidenav-links">
                <Link to={'/AdminIndex'} className={`admin-sidenav-link ${activeNavLink === "Dashboard" ? "active" : ""}`}>
                    {activeNavLink === "Dashboard" ? <MdDashboard size={30}/> : <MdOutlineDashboard size={30}/>}
                    Dashboard
                </Link>

                <Link to={'/AdminIndex/Appointments'} className={`admin-sidenav-link ${activeNavLink === "Appointments" ? "active" : ""}`}>
                    {activeNavLink === "Appointments" ? <RiHealthBookFill size={30}/> : <RiHealthBookLine size={30}/>}
                    Appointments
                </Link>

                <Link to={'/AdminIndex/ClinicCalendar'} className={`admin-sidenav-link ${activeNavLink === "Calendar" ? "active" : ""}`}>
                    {activeNavLink === "Calendar" ? <BsCalendar3WeekFill size={30}/> : <BsCalendarWeek size={30}/>}
                    Calendar
                </Link>

                <Link to={'/AdminIndex/ManageProfiles'} className={`admin-sidenav-link ${activeNavLink === "Manage Accounts" ? "active" : ""}`}>
                    {activeNavLink === "Manage Accounts" ? <PiUsersBold size={30}/> : <PiUsers size={30}/>}
                    Manage Accounts
                </Link>

                <Link to={'/AdminIndex/AdminFeedbackAnalysis'} className={`admin-sidenav-link ${activeNavLink === "Feedback Analysis" ? "active" : ""}`}>
                    {activeNavLink === "Feedback Analysis" ? <RiFeedbackFill  size={30}/> : <RiFeedbackLine size={30}/>}
                    Feedback Analysis
                </Link>

                <Link to={'/AdminIndex/InventoryTracking'} className={`admin-sidenav-link ${activeNavLink === "Inventory Tracking" ? "active" : ""}`}>
                    {activeNavLink === "Inventory Tracking" ? <MdInventory2  size={30}/> : <MdOutlineInventory2 size={30}/>}
                    Inventory Tracking
                </Link>
            </div>
        </aside>
    );
}