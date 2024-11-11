import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminIndex = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [timeFrame, setTimeFrame] = useState('day');

  // Sample data
  const appointments = [
    { id: 1, petName: "Max", ownerName: "John Doe", date: "2024-11-11", time: "09:00", type: "Vaccination" },
    { id: 2, petName: "Luna", ownerName: "Jane Smith", date: "2024-11-11", time: "10:30", type: "Check-up" },
    { id: 3, petName: "Bella", ownerName: "Mike Johnson", date: "2024-11-11", time: "14:00", type: "Surgery" },
    { id: 4, petName: "egege", ownerName: "Mike Johnson", date: "2024-11-12", time: "14:00", type: "Surgery" }
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

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      margin: 0,
    },
    date: {
      color: '#666',
    },
    tabs: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      borderBottom: '1px solid #e5e7eb',
    },
    tab: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      borderBottom: '2px solid transparent',
    },
    activeTab: {
      borderBottom: '2px solid #3b82f6',
      color: '#3b82f6',
    },
    timeButtons: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    timeButton: {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '0.375rem',
      cursor: 'pointer',
    },
    activeTimeButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
    },
    inactiveTimeButton: {
      backgroundColor: '#e5e7eb',
      color: 'black',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
      marginBottom: '2rem',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      textAlign: 'left',
      padding: '0.75rem',
      borderBottom: '1px solid #e5e7eb',
    },
    td: {
      padding: '0.75rem',
      borderBottom: '1px solid #e5e7eb',
    },
    chartContainer: {
      height: '400px',
      width: '100%',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Vet Clinic Dashboard</h1>
        <div style={styles.date}>{new Date().toLocaleDateString()}</div>
      </div>

      <div style={styles.tabs}>
        <button
          style={{ ...styles.tab, ...(activeTab === 'appointments' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button
          style={{ ...styles.tab, ...(activeTab === 'feedback' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('feedback')}
        >
          Feedback Analysis
        </button>
        <button
          style={{ ...styles.tab, ...(activeTab === 'inventory' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
      </div>

      {activeTab === 'appointments' && (
        <div style={styles.card}>
          <h2>Appointments</h2>
          <div style={styles.timeButtons}>
            {['day', 'week', 'month'].map((period) => (
              <button
                key={period}
                style={{
                  ...styles.timeButton,
                  ...(timeFrame === period ? styles.activeTimeButton : styles.inactiveTimeButton),
                }}
                onClick={() => setTimeFrame(period)}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Pet Name</th>
                <th style={styles.th}>Owner</th>
                <th style={styles.th}>Time</th>
                <th style={styles.th}>Type</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td style={styles.td}>{appointment.petName}</td>
                  <td style={styles.td}>{appointment.ownerName}</td>
                  <td style={styles.td}>{appointment.time}</td>
                  <td style={styles.td}>{appointment.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div style={styles.card}>
          <h2>Customer Feedback Analysis</h2>
          <div style={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feedbackData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="aspect" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="positive" name="Positive Feedback" stackId="stack" fill="#4ade80" />
                <Bar dataKey="negative" name="Negative Feedback" stackId="stack" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div style={styles.card}>
          <h2>Inventory Trends</h2>
          <div style={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
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
        </div>
      )}
    </div>
  );
};

export default AdminIndex;