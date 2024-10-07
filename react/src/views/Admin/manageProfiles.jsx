import React, { useState, useEffect, act } from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/manageaccs.css";

function ManageProfiles() {
  const [users, setUsers] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [activeTab, setActiveTab] = useState("ManageClients");
  const [clients, setClients] = useState([]);
  const [admins, setAdmins] = useState([]);


  useEffect(() => {
    const getAllClients = async () => {
        try {
            const data = await fetchAllClientAppointments(user.id); // Pass clientId here
            setAppointments(data);
            console.log(data); // Log the received appointments
        } catch (error) {
            console.error(error);
        }
    };

    getAllAppointments();
}, []);

useEffect(() => {
  const getAllAdmins = async () => {
      try {
          const data = await fetchAllClientAppointments(user.id); // Pass clientId here
          setAppointments(data);
          console.log(data); // Log the received appointments
      } catch (error) {
          console.error(error);
      }
  };

  getAllAppointments();
}, []);
  const renderHeaders = () => {
    switch (activeTab) {
        case "ManageClients":
            return (
                <>
                    <div className="mini-nav bottom-margin">
                        <div className="anybody medium-f bold">Manage Clients</div>
                        <div className="separator left-margin-s right-margin-s"></div>
                        <div onClick={() => setActiveTab("ManageAdmins")}>
                            <div className="anybody small-f semi-bold pointer">Manage Admins</div>
                        </div>
                    </div>

                    <div className="myappt headers small-form d-flex bottom-margin-s">
                        <div className='detailHeader column semi-bold'>Full Name</div>
                        <div className='detailHeader column semi-bold'>Gender</div>
                        <div className='detailHeader column semi-bold'>Email</div>
                        <div className='detailHeader column semi-bold'>Status</div>
                        <div className='detailHeader column semi-bold'>Actions</div>
                    </div>
                </>
            );

        case "ManageAdmins":
            return (
                <>
                    <div className="mini-nav bottom-margin">
                        <div className="anybody medium-f bold">Manage Admins</div>
                        <div className="separator left-margin-s right-margin-s"></div>
                        <div onClick={() => setActiveTab("ManageClients")}>
                            <div className="anybody small-f semi-bold pointer">Manage Clients</div>
                        </div>
                    </div>

                    <div className="myappt headers small-form d-flex bottom-margin-s">
                        <div className='detailHeader column semi-bold'>Full Name</div>
                        <div className='detailHeader column semi-bold'>Gender</div>
                        <div className='detailHeader column semi-bold'>Email</div>
                        <div className='detailHeader column semi-bold'>Role</div>
                        <div className='detailHeader column semi-bold'>Actions</div>
                    </div>
                </>
            );
    }
};

  const handleDeleteUser = userId => {
    // Send a DELETE request to the backend API to delete the user
    fetch(`/api/users/${userId}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          // Update the user list after successful deletion
          setUsers(users.filter(user => user.id !== userId));
        } else {
          console.error('Error deleting user:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleSuspendUser = userId => {
    // Send a PATCH request to the backend API to suspend the user
    fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ suspended: true })
    })
      .then(response => {
        if (response.ok) {
          // Update the user list after successful suspension
          setUsers(users.map(user => (user.id === userId ? { ...user, suspended: true } : user)));
        } else {
          console.error('Error suspending user:', response.statusText);
        }
      })
      .catch(error => console.error('Error suspending user:', error));
  };

  const handleAddAdmin = () => {
    // Send a POST request to the backend API to add a new admin account
    fetch('/api/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newAdminEmail })
    })
      .then(response => {
        if (response.ok) {
          // Clear the new admin email field and update the user list
          setNewAdminEmail('');
          fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
        } else {
          console.error('Error adding admin:', response.statusText);
        }
      })
      .catch(error => console.error('Error adding admin:', error));
  };

  const handleDeleteAdmin = userId => {
    // Send a DELETE request to the backend API to delete the admin account
    fetch(`/api/admins/${userId}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          // Update the user list after successful deletion
          setUsers(users.filter(user => user.id !== userId));
        } else {
          console.error('Error deleting admin:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting admin:', error));
  };

  return (
    <div className="page inter">
        <div className='manage-users gen-margin'>
            {renderHeaders()}

            {//PARA SA RECORDS NG USERS
            /* <div className="myappt small-form">
                    {appointments.length > 0 &&
                        appointments.map(record =>
                            record.status === activeTab && (
                                <AppointmentRecord e key={record.id}
                                handleAppointmentRecordClick={handleAppointmentRecordClick}
                                record={record}
                                handleCancel={(e) => handleCancel(record.id, e)}/>
                        )
                    }
            </div> */}



            <div>
                <h3>Add New Admin</h3>
                <input type="email" value={newAdminEmail} onChange={e => setNewAdminEmail(e.target.value)} />
                <button onClick={handleAddAdmin}>Add Admin</button>
            </div>
        </div>
    </div>
  );
}

export default ManageProfiles;
