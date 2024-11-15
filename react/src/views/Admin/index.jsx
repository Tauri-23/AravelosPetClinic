import { useState } from "react";
import { AlertCircle, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "../../assets/css/adminIndex.css";

const Index = () => {
  const [feedbackLanguage, setFeedbackLanguage] = useState("english");
  const [activeTab, setActiveTab] = useState('today');

  const [appointments] = useState([
    { id: 1, petName: "Max", ownerName: "John Doe", time: "09:00 AM", date: "2024-02-14" },
    { id: 2, petName: "Luna", ownerName: "Jane Smith", time: "10:30 AM", date: "2024-02-14" },
    { id: 3, petName: "Bella", ownerName: "Mike Johnson", time: "02:00 PM", date: "2024-02-15" },
    { id: 4, petName: "Charlie", ownerName: "Sarah Williams", time: "11:00 AM", date: "2024-02-20" },
    { id: 5, petName: "Rocky", ownerName: "Tom Brown", time: "03:30 PM", date: "2024-03-01" }
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

  const chartData = Object.entries(feedbackData[feedbackLanguage]).map(([category, values]) => ({
    category,
    positive: values.positive,
    negative: values.negative
  }));

  const getFilteredAppointments = () => {
    const today = new Date();
    const currentDate = today.toISOString().split('T')[0];
    
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(today.getMonth() - 1);

    switch (activeTab) {
      case 'today':
        return appointments.filter(apt => apt.date === currentDate);
      case 'week':
        return appointments.filter(apt => {
          const aptDate = new Date(apt.date);
          return aptDate >= weekAgo && aptDate <= today;
        });
      case 'month':
        return appointments.filter(apt => {
          const aptDate = new Date(apt.date);
          return aptDate >= monthAgo && aptDate <= today;
        });
      default:
        return appointments;
    }
  };

  const filteredAppointments = getFilteredAppointments();


  return (
    <div className="admin-container">
        <section className="appointments-section">
        <h2>Appointments</h2>
        <div className="appointments-tabs">
          <button 
            className={`tab ${activeTab === 'today' ? 'active' : ''}`}
            onClick={() => setActiveTab('today')}
          >
            Today
          </button>
          <button 
            className={`tab ${activeTab === 'week' ? 'active' : ''}`}
            onClick={() => setActiveTab('week')}
          >
            This Week
          </button>
          <button 
            className={`tab ${activeTab === 'month' ? 'active' : ''}`}
            onClick={() => setActiveTab('month')}
          >
            This Month
          </button>
        </div>
        <div className="appointments-list">
          {filteredAppointments.map(apt => (
            <div key={apt.id} className="appointment-card">
              <h3>{apt.petName}</h3>
              <p>Owner: {apt.ownerName}</p>
              <p>Time: {apt.time}</p>
              <p>Date: {new Date(apt.date).toLocaleDateString()}</p>
            </div>
          ))}
          {filteredAppointments.length === 0 && (
            <div className="appointment-card">
              <p>No appointments found for this period</p>
            </div>
          )}
        </div>
      </section>

      <div className="right-section">
        <section className="feedback-section">
          <h2>Customer Feedback</h2>
          <div className="language-toggle">
            <button 
              className={feedbackLanguage === "english" ? "active" : ""}
              onClick={() => setFeedbackLanguage("english")}
            >
              English
            </button>
            <button 
              className={feedbackLanguage === "tagalog" ? "active" : ""}
              onClick={() => setFeedbackLanguage("tagalog")}
            >
              Tagalog
            </button>
          </div>
          <div className="feedback-chart">
            <BarChart width={600} height={300} data={chartData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" stackId="a" fill="#4ade80" name="Positive" />
              <Bar dataKey="negative" stackId="a" fill="#f87171" name="Negative" />
            </BarChart>
          </div>
        </section>

        <section className="inventory-section">
          <h2>Inventory Status</h2>
          <div className="inventory-list">
            {inventory.map(item => (
              <div key={item.id} className="inventory-card">
                <h3>{item.name}</h3>
                <p>Stock: {item.stock}</p>
                {item.stock < item.threshold && (
                  <div className="low-stock-alert">
                    <AlertCircle size={16} />
                    Low Stock Alert
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="active-users-section">
          <h2>Active Users</h2>
          <div className="users-list">
            {activeUsers.map(user => (
              <div key={user.id} className="user-card">
                <Users size={16} />
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>{user.role}</p>
                </div>
                <span className="status-indicator"></span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;