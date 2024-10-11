import React, { useState, useEffect, act } from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/manageaccs.css";
import { fetchAllClientsNotDeleted } from '../../services/UserClientsServices';
import axiosClient from '../../axios-client';
import { notify } from '../../assets/js/utils';
import { fetchAllAdminsNotDeleted } from '../../services/UserAdminsServices';
import { useStateContext } from '../../contexts/ContextProvider';

function ManageProfiles() {
  const {user} = useStateContext();
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [activeTab, setActiveTab] = useState("ManageClients");
  const [admins, setAdmins] = useState(null);
  const [clients, setClients] = useState(null);





  /**
   * Render from db
   */
  useEffect(() => {
    const getAll = async() => {
      try {
        const [clientsDb, adminsDb] = await Promise.all([
          fetchAllClientsNotDeleted(),
          fetchAllAdminsNotDeleted(user.id)
        ]);

        setClients(clientsDb);
        setAdmins(adminsDb);
      } catch (error) {
        console.error(error);
      }
    }


    getAll();
  }, [])


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



  /**
   * Clients Handlers
   */
  const handleDeleteClient = (clientId) => {
    const formData = new FormData();
    formData.append('clientId', clientId);

    axiosClient.post('/del-client', formData)
    .then(({data}) => {
      if(data.status === 200) {
        setClients(prev => prev.filter(c => c.id !== clientId));
        notify('success', data.message, 'top-center', 3000);
      } else {
        notify('error', data.message, 'top-center', 3000);
      }
    })
    .catch(error => console.error(error));
  };

  const handleSuspendUnsuspendClient = (clientId) => {
    // Send a PATCH request to the backend API to suspend the user
    const formData = new FormData();
    formData.append('clientId', clientId);
    axiosClient.post('/suspend-unsuspend-client', formData)
    .then(({data}) => {
      if(data.status === 200) {
        setClients(data.clients);
        notify('success', data.message, 'top-center', 3000);
      } else {
        notify('error', data.message, 'top-center', 3000);
      }
    })
    .catch(error => console.error(error));
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


          {/* Manage Clients */}
          {activeTab === "ManageClients" && (
            <div className="myappt small-form">
              {clients?.length > 0 && clients.map((client) => (
                <div className='appt-record-five pending' key={client.id}>
                  <div className='content-deet'>{client.fname} {client.mname} {client.lname}</div>
                  <div className='content-deet'>{client.gender}</div>
                  <div className='content-deet'>{client.email}</div>
                  <div className='content-deet'>{client.status}</div>
                  <div className='content-deet'>

                    <button className="primary-btn-blue1" onClick={() => handleSuspendUnsuspendClient(client.id)}>{client.status === 'active' ? 'Suspend' : 'Unsuspend'}</button>
                    <button className="sub-button" onClick={() => handleDeleteClient(client.id)}>Delete</button>
                  </div>
                </div>
              ))}
              {!clients && (
                <>Loading</>
              )}

              {clients?.length < 1 && (
                <>No Records</>
              )}
            </div>
          )}

          {/* Placeholder for Manage Admins section (assuming similar structure) */}
          {activeTab === "ManageAdmins" && (
            <div className="myappt small-form">
              {admins?.length > 0 && admins.map((client) => (
                <div className='appt-record-five pending' key={client.id}>
                  <div className='content-deet'>{client.fname} {client.mname} {client.lname}</div>
                  <div className='content-deet'>{client.gender}</div>
                  <div className='content-deet'>{client.email}</div>
                  <div className='content-deet'>{client.status}</div>
                  <div className='content-deet'>

                    <button className="primary-btn-blue1"onClick={() => handleSuspendUnsuspendClient(client.id)}>{client.status === 'active' ? 'Suspend' : 'Unsuspend'}</button>
                    <button className="sub-button" onClick={() => handleDeleteClient(client.id)}>Delete</button>
                  </div>
                </div>
              ))}
              {!admins && (
                <>Loading</>
              )}

              {admins?.length < 1 && (
                <>No Records</>
              )}
            </div>
          )}

        </div>
    </div>
  );
}

export default ManageProfiles;
