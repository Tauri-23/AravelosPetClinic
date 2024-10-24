import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminIndex() {
  const [appointments, setAppointments] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        setError('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    const fetchFeedback = async () => {
      try {
        const response = await axios.get('/api/feedback');
        setFeedback(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        setError('Error fetching feedback:', error);
        setLoading(false);
      }
    };

    const fetchInventory = async () => {
      try {
        const response = await axios.get('/api/inventory');
        setInventory(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        setError('Error fetching inventory:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
    fetchFeedback();
    fetchInventory();
  }, []);

  return (
    <div className="admin-homepage">
      <h1>Admin Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {appointments.length > 0 && (
        <div className="appointment-section">
          <h2>Upcoming Appointments</h2>
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id}>
                {appointment.date} - {appointment.time} - {appointment.patientName}
              </li>
            ))}
          </ul>
        </div>
      )}
      {feedback.length > 0 && (
        <div className="feedback-section">
          <h2>Recent Feedback</h2>
          <ul>
            {feedback.map((feedbackItem) => (
              <li key={feedbackItem.id}>
                {feedbackItem.rating} - {feedbackItem.comment} - {feedbackItem.patientName}
              </li>
            ))}
          </ul>
        </div>
      )}
      {inventory.length > 0 && (
        <div className="inventory-section">
          <h2>Inventory Status</h2>
          <ul>
            {inventory.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity} - {item.category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminIndex;
