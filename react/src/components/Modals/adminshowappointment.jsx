import "../../assets/css/appointmentModal.css";

const AppointmentModal = ({ isOpen, onClose, appointment }) => {
  if (!isOpen || !appointment) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          x
        </button>
        
        <div className="modal-header">
          <h2 className="modal-title">Appointment Details</h2>
        </div>

        <div className="modal-content">
          <div className="modal-item">
            <h3 className="modal-label">Pet Name</h3>
            <p className="modal-text">{appointment.petName}</p>
          </div>

          <div className="modal-item">
            <h3 className="modal-label">Owner Name</h3>
            <p className="modal-text">{appointment.ownerName}</p>
          </div>

          <div className="modal-item">
            <h3 className="modal-label">Time</h3>
            <p className="modal-text">{appointment.time}</p>
          </div>

          <div className="modal-item">
            <h3 className="modal-label">Date</h3>
            <p className="modal-text">
              {new Date(appointment.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
