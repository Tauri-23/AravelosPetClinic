import React, { useEffect, useState } from "react";
import { AlertCircle, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import AdminShowAppointment from "../../components/Modals/adminshowappointment";
import "../../assets/css/adminIndex.css";
import '../../assets/css/adminDash.css'
import { fetchAllInventoryItems } from "../../services/InventoryServices";
import { fetchAllAppointmentsWhereStatus } from "../../services/AppointmentServices";
import { fetchAllStaffsWhereStatus } from "../../services/StaffServices";
import { useOutletContext } from "react-router-dom";
import { Spin } from "antd";

export default function adminIndex() {
    const {setActiveNavLink} = useOutletContext();
    const [activeTab, setActiveTab] = useState("today");

	// Data
	const [approvedAppointments, setApprovedAppointments] = useState(null);
    const [inventoryQty, setInventoryQty] = useState(0);
    const [staffs, setStaffs] = useState(null);



    /**
     * Fetch all data from database
     */
    useEffect(() => {
        setActiveNavLink("Dashboard");

        const getAll = async() => {
            const [inventoryDb, approvedAppointmentsDb, staffsDb] = await Promise.all([
                fetchAllInventoryItems(),
                fetchAllAppointmentsWhereStatus("Approved"),
                fetchAllStaffsWhereStatus("active")
            ]);
            const inventoryDbQty = await inventoryDb.reduce((a, b) => a + b.qty, 0);
            setInventoryQty(inventoryDbQty);
            setApprovedAppointments(approvedAppointmentsDb);
            setStaffs(staffsDb);
        }

        getAll();
    }, []);



	/**
	 * Render
	 */
    return (
        <div className="content1 compressed">
            {(approvedAppointments !== null && staffs !== null)
            ? (
                <>
                    <header className="d-flex align-items-center justify-content-between w-100 mar-bottom-1">
                        <h1>Veterinary Clinic Dashboard</h1>
                        <div className="header-controls">
                            <div className="date-filter">
                                <button
                                className={`filter-btn ${activeTab === "today" ? "active" : ""}`}
                                onClick={() => setActiveTab("today")}
                                >
                                    Today
                                </button>
                                <button
                                className={`filter-btn ${activeTab === "week" ? "active" : ""}`}
                                onClick={() => setActiveTab("week")}
                                >
                                    This Week
                                </button>
                                <button
                                className={`filter-btn ${activeTab === "month" ? "active" : ""}`}
                                onClick={() => setActiveTab("month")}
                                >
                                    This Month
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="d-flex gap3 w-100 mar-bottom-1">
                        <div className="dashboard-box-sm">
                            <h3>{approvedAppointments.length}</h3>
                            <small>Appointments</small>
                        </div>
                        <div className="dashboard-box-sm">
                            <h3>{staffs.length}</h3>
                            <small>Staffs</small>
                        </div>
                        <div className="dashboard-box-sm">
                            <h3>{inventoryQty}</h3>
                            <small>Inventory Stocks</small>
                        </div>
                        <div className="dashboard-box-sm">
                            <h3>0</h3>
                            <small>Low Stocks</small>
                        </div>
                    </div>

                    <h2>Feedbacks</h2>
                    <div className="dashboard-box-lg" style={{height: "200px"}}>
                        
                    </div>
                </>
            )
            : (<Spin size="large"/>)}
        </div>
    );
};
