import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import "../../assets/css/adminIndex.css";

const AdminIndex = () => {
  const [timeFrame, setTimeFrame] = useState('day');

  // Sample data
  const appointments = [
    { id: 1, petName: "Max", ownerName: "John Doe", date: "2024-11-11", time: "09:00", type: "Vaccination" },
    { id: 2, petName: "Luna", ownerName: "Jane Smith", date: "2024-11-11", time: "10:30", type: "Check-up" },
    { id: 3, petName: "Bella", ownerName: "Mike Johnson", date: "2024-11-11", time: "14:00", type: "Surgery" },
    { id: 4, petName: "Buddy", ownerName: "Sarah Lee", date: "2024-11-12", time: "11:00", type: "Grooming" },
    { id: 5, petName: "Daisy", ownerName: "Tom Wilson", date: "2024-11-12", time: "15:30", type: "Dental" },
    { id: 6, petName: "Coco", ownerName: "Lisa Chen", date: "2024-11-13", time: "13:00", type: "Vaccination" },
  ];

  const feedbackData = [
    { aspect: 'Hygiene', positive: 85, negative: 15 },
    { aspect: 'Pricing', positive: 70, negative: 30 },
    { aspect: 'Customer Service', positive: 90, negative: 10 },
    { aspect: 'Waiting Time', positive: 65, negative: 35 },
    { aspect: 'Booking Experience', positive: 80, negative: 20 },
    { aspect: 'Vet Care', positive: 95, negative: 5 },
  ];

  const inventoryData = [
    { month: 'Jan', vaccines: 100, medicines: 150, supplies: 200 },
    { month: 'Feb', vaccines: 120, medicines: 140, supplies: 180 },
    { month: 'Mar', vaccines: 90, medicines: 160, supplies: 220 },
    { month: 'Apr', vaccines: 110, medicines: 130, supplies: 190 },
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();

    switch (timeFrame) {
      case 'day':
        return appointmentDate.toDateString() === today.toDateString();
      case 'week':
        const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);
        return appointmentDate >= weekStart && appointmentDate <= weekEnd;
      case 'month':
        return appointmentDate.getMonth() === today.getMonth() && appointmentDate.getFullYear() === today.getFullYear();
      default:
        return true;
    }
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Vet Clinic Dashboard</h1>
        <div className="dashboard-date">{new Date().toLocaleDateString()}</div>
      </div>

      <div className="dashboard-grid">
        <Card className="appointments-card">
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="time-frame-buttons">
              {['day', 'week', 'month'].map((period) => (
                <button
                  key={period}
                  className={`time-frame-button ${timeFrame === period ? 'active' : ''}`}
                  onClick={() => setTimeFrame(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
            <div className="appointments-table-container">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Pet Name</th>
                    <th>Owner</th>
                    <th>Time</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.petName}</td>
                      <td>{appointment.ownerName}</td>
                      <td>{appointment.time}</td>
                      <td>{appointment.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="feedback-card">
          <CardHeader>
            <CardTitle>Customer Feedback Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={feedbackData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="aspect" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="positive" name="Positive Feedback" stackId="stack" fill="#4ade80" />
                  <Bar dataKey="negative" name="Negative Feedback" stackId="stack" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="inventory-card">
          <CardHeader>
            <CardTitle>Inventory Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={inventoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="vaccines" stroke="#3b82f6" name="Vaccines" />
                  <Line type="monotone" dataKey="medicines" stroke="#10b981" name="Medicines" />
                  <Line type="monotone" dataKey="supplies" stroke="#f59e0b" name="Supplies" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminIndex;