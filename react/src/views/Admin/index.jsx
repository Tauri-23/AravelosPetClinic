import React, { useEffect, useState } from "react";
import { AlertCircle, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import AdminShowAppointment from "../../components/Modals/adminshowappointment";
import "../../assets/css/adminIndex.css";
import '../../assets/css/adminDash.css'
import { fetchAllInventoryItems } from "../../services/InventoryServices";
import { fetchAllAppointmentsWhereStatus } from "../../services/AppointmentServices";
import { fetchAllStaffs, fetchAllStaffsWhereStatus } from "../../services/StaffServices";
import { useOutletContext } from "react-router-dom";
import { Spin } from "antd";

export default function adminIndex() {
    const {setActiveNavLink} = useOutletContext();
    const [feedbackLanguage, setFeedbackLanguage] = useState("english");
    const [activeTab, setActiveTab] = useState("today");
    const [selectedAppointment, setSelectedAppointment] = useState(null);

	// Data
	const [approvedAppointments, setApprovedAppointments] = useState(null);
    const [inventoryQty, setInventoryQty] = useState(0);
    const [staffs, setStaffs] = useState(null);
    const [feedbackData, setFeedbackData] = useState({
        english: {
            hygiene: { positive: 46, negative: 54 },
            customerService: { positive: 90, negative: 10 },
            vetCare: { positive: 95, negative: 5 },
            bookingExperience: { positive: 80, negative: 20 },
            pricing: { positive: 75, negative: 25 },
            waitingTime: { positive: 70, negative: 30 },
        },
        tagalog: {
            hygiene: { positive: 82, negative: 18 },
            customerService: { positive: 88, negative: 12 },
            vetCare: { positive: 92, negative: 8 },
            bookingExperience: { positive: 50, negative: 50 },
            pricing: { positive: 73, negative: 27 },
            waitingTime: { positive: 68, negative: 32 },
        },
    });    
    const [activeUsers, setActiveUsers] = useState([
        { id: 1, name: "Dr. Smith", role: "Veterinarian", status: "Online" },
        { id: 2, name: "Nancy Drew", role: "Receptionist", status: "Online" },
    ]);

    const chartData = Object.entries(feedbackData[feedbackLanguage]).map(
        ([category, values]) => ({
            category,
            positive: values.positive,
            negative: values.negative,
        })
    );



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

                    {/* <div className="dashboard-grid">
                        <div className="dashboard-card appointments-card">
                            <div className="card-header">
                                <h2>Upcoming Appointments</h2>
                            </div>
                            <div className="appointments-scroll">
                                {filteredAppointments.length > 0 ? (
                                    filteredAppointments.map((apt) => (
                                        <div
                                            key={apt.id}
                                            className="appointment-item"
                                            onClick={() => setSelectedAppointment(apt)}
                                        >
                                            <div className="appointment-time">
                                                {apt.time}
                                            </div>
                                            <div className="appointment-details">
                                                <div className="pet-name">
                                                    {apt.petName}
                                                </div>
                                                <div className="owner-name">
                                                    {apt.ownerName}
                                                </div>
                                            </div>
                                            <div className="appointment-date">
                                                {new Date(
                                                    apt.date
                                                ).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-appointments">
                                        <p>No appointments found for this period</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="dashboard-card feedback-card">
                            <div className="card-header">
                                <h2>Customer Feedback</h2>
                                <div className="language-toggle">
                                    <button
                                        className={`toggle-btn ${
                                            feedbackLanguage === "english"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() => setFeedbackLanguage("english")}
                                    >
                                        English
                                    </button>
                                    <button
                                        className={`toggle-btn ${
                                            feedbackLanguage === "tagalog"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() => setFeedbackLanguage("tagalog")}
                                    >
                                        Tagalog
                                    </button>
                                </div>
                            </div>
                            <div className="feedback-chart">
                                <BarChart width={600} height={300} data={chartData}>
                                    <XAxis dataKey="category" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="positive"
                                        stackId="a"
                                        fill="#4CAF50"
                                        name="Positive"
                                    />
                                    <Bar
                                        dataKey="negative"
                                        stackId="a"
                                        fill="#FF5252"
                                        name="Negative"
                                    />
                                </BarChart>
                            </div>
                        </div>

                        <div className="dashboard-card inventory-card">
                            <div className="card-header">
                                <h2>Inventory Status</h2>
                            </div>
                            <div className="inventory-grid">
                                {inventory.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`inventory-item ${
                                            item.stock < item.threshold
                                                ? "low-stock"
                                                : ""
                                        }`}
                                    >
                                        <div className="inventory-icon">
                                            {item.stock < item.threshold && (
                                                <AlertCircle size={20} />
                                            )}
                                        </div>
                                        <div className="inventory-details">
                                            <h3>{item.name}</h3>
                                            <div className="stock-level">
                                                <div className="stock-bar">
                                                    <div
                                                        className="stock-fill"
                                                        style={{
                                                            width: `${
                                                                (item.stock /
                                                                    item.threshold) *
                                                                100
                                                            }%`,
                                                        }}
                                                    />
                                                </div>
                                                <span>{item.stock} units</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="dashboard-card users-card">
                            <div className="card-header">
                                <h2>Active Staff</h2>
                            </div>
                            <div className="users-grid">
                                {activeUsers.map((user) => (
                                    <div key={user.id} className="user-item">
                                        <div className="user-avatar">
                                            <Users size={24} />
                                        </div>
                                        <div className="user-details">
                                            <h3>{user.name}</h3>
                                            <p>{user.role}</p>
                                        </div>
                                        <div className="user-status">
                                            <span className="status-dot"></span>
                                            {user.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}

                    {/* <AdminShowAppointment
                        isOpen={!!selectedAppointment}
                        onClose={() => setSelectedAppointment(null)}
                        appointment={selectedAppointment}
                    /> */}
                </>
            )
            : (<Spin size="large"/>)}
        </div>
    );
};
