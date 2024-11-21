import React, { useState } from "react";
import { AlertCircle, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import AdminShowAppointment from '../../components/Modals/adminshowappointment';
import "../../assets/css/adminIndex.css";


const adminIndex = () => {
  const [feedbackLanguage, setFeedbackLanguage] = useState("english");
  const [activeTab, setActiveTab] = useState('today');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Sample data
  const [appointments] = useState([
    { id: 1, petName: "Max", ownerName: "John Doe", time: "09:00 AM", date: "2024-11-15" },
    { id: 2, petName: "Luna", ownerName: "Jane Smith", time: "10:30 AM", date: "2024-11-15" },
    { id: 3, petName: "Bella", ownerName: "Mike Johnson", time: "02:00 PM", date: "2024-11-15" },
    { id: 4, petName: "Charlie", ownerName: "Sarah Williams", time: "11:00 AM", date: "2024-11-16" },
    { id: 5, petName: "Rocky", ownerName: "Tom Brown", time: "03:30 PM", date: "2024-12-01" }
  ]);

  const [feedbackData] = useState({
    english: {
      hygiene: { positive: 46, negative: 54 },
      customerService: { positive: 90, negative: 10 },
      vetCare: { positive: 95, negative: 5 },
      bookingExperience: { positive: 80, negative: 20 },
      pricing: { positive: 75, negative: 25 },
      waitingTime: { positive: 70, negative: 30 }
    },
    tagalog: {
      hygiene: { positive: 82, negative: 18 },
      customerService: { positive: 88, negative: 12 },
      vetCare: { positive: 92, negative: 8 },
      bookingExperience: { positive: 50, negative: 50 },
      pricing: { positive: 73, negative: 27 },
      waitingTime: { positive: 68, negative: 32 },
    }
  });

  const [inventory] = useState([
    { id: 1, name: "Vaccines", stock: 5, threshold: 10 },
    { id: 2, name: "Syringes", stock: 150, threshold: 100 },
    { id: 3, name: "Bandages", stock: 8, threshold: 20 }
  ]);

  const [activeUsers] = useState([
    { id: 1, name: "Dr. Smith", role: "Veterinarian", status: "Online" },
    { id: 2, name: "Nancy Drew", role: "Receptionist", status: "Online" }
  ]);

  const getFilteredAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    
    const monthAgo = new Date(today);
    monthAgo.setMonth(today.getMonth() - 1);

    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      aptDate.setHours(0, 0, 0, 0);

      switch (activeTab) {
        case 'today':
          return aptDate.getTime() === today.getTime();
        case 'week':
          return aptDate >= weekAgo && aptDate <= today;
        case 'month':
          return aptDate >= monthAgo && aptDate <= today;
        default:
          return true;
      }
    });
  };

  const chartData = Object.entries(feedbackData[feedbackLanguage]).map(([category, values]) => ({
    category,
    positive: values.positive,
    negative: values.negative
  }));

  const filteredAppointments = getFilteredAppointments();

  return (
    <div className="powerbi-dashboard">
      <header className="dashboard-header">
        <h1>Veterinary Clinic Dashboard</h1>
        <div className="header-controls">
          <div className="date-filter">
            <button className={`filter-btn ${activeTab === 'today' ? 'active' : ''}`} onClick={() => setActiveTab('today')}>Today</button>
            <button className={`filter-btn ${activeTab === 'week' ? 'active' : ''}`} onClick={() => setActiveTab('week')}>This Week</button>
            <button className={`filter-btn ${activeTab === 'month' ? 'active' : ''}`} onClick={() => setActiveTab('month')}>This Month</button>
          </div>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="dashboard-card appointments-card">
          <div className="card-header">
            <h2>Upcoming Appointments</h2>
          </div>
          <div className="appointments-scroll">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(apt => (
                <div key={apt.id} className="appointment-item" onClick={() => setSelectedAppointment(apt)}>
                  <div className="appointment-time">{apt.time}</div>
                  <div className="appointment-details">
                    <div className="pet-name">{apt.petName}</div>
                    <div className="owner-name">{apt.ownerName}</div>
                  </div>
                  <div className="appointment-date">
                    {new Date(apt.date).toLocaleDateString()}
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
              <button className={`toggle-btn ${feedbackLanguage === "english" ? 'active' : ''}`} onClick={() => setFeedbackLanguage("english")}>English</button>
              <button className={`toggle-btn ${feedbackLanguage === "tagalog" ? 'active' : ''}`} onClick={() => setFeedbackLanguage("tagalog")}>Tagalog</button>
            </div>
          </div>
          <div className="feedback-chart">
            <BarChart width={600} height={300} data={chartData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" stackId="a" fill="#4CAF50" name="Positive" />
              <Bar dataKey="negative" stackId="a" fill="#FF5252" name="Negative" />
            </BarChart>
          </div>
        </div>

        <div className="dashboard-card inventory-card">
          <div className="card-header">
            <h2>Inventory Status</h2>
          </div>
          <div className="inventory-grid">
            {inventory.map(item => (
              <div key={item.id} className={`inventory-item ${item.stock < item.threshold ? 'low-stock' : ''}`}>
                <div className="inventory-icon">
                  {item.stock < item.threshold && <AlertCircle size={20} />}
                </div>
                <div className="inventory-details">
                  <h3>{item.name}</h3>
                  <div className="stock-level">
                    <div className="stock-bar">
                      <div 
                        className="stock-fill" 
                        style={{ width: `${(item.stock / item.threshold) * 100}%` }}
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
            {activeUsers.map(user => (
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
      </div>

      <AdminShowAppointment
        isOpen={!!selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default adminIndex;