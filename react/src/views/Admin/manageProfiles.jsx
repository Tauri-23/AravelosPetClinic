import React, { useState, useEffect, act } from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/manageaccs.css";
import { fetchAllClientsNotDeleted } from '../../services/UserClientsServices';
import axiosClient from '../../axios-client';
import { notify } from '../../assets/js/utils';
import { fetchAllAdminsNotDeleted } from '../../services/UserAdminsServices';
import { useStateContext } from '../../contexts/ContextProvider';
import { useModal } from '../../contexts/ModalContext';
import addAdmin1 from '../../components/Modals/addAdmin1';

function ManageProfiles() {
  const {user} = useStateContext();
  const { showModal } = useModal();
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
                    <div className="mini-nav">
                        <div className="anybody medium-f bold">Manage Admins</div>
                        <div className="separator left-margin-s right-margin-s"></div>
                        <div onClick={() => setActiveTab("ManageClients")}>
                            <div className="anybody small-f semi-bold pointer">Manage Clients</div>
                        </div>
                       
                    </div>
                    <div className="add-admin">
                          <div className='primary-btn-blue1 bottom-margin' onClick={handleAdd}>Add admin</div>
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

  const handleAdd = (e) => {

    const handleFunction = "handleAddPost";
    e.preventDefault();
    showModal('addAdmin1', {handlePost: addAdmin1, handleFunction});

};


    const handleAddAdmin = async (fname, mname, lname, email, password, bday, gender, address, phone, role, status, picture) => {
      
      const formData = new FormData();
      formData.append('fname', fname);
      formData.append('mname', mname);
      formData.append('lname', lname);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('bday', bday);
      formData.append('gender', gender);
      formData.append('address', address);
      formData.append('phone', phone);
      formData.append('role', role);
      formData.append('status', status);
      formData.append('picture', picture);

      try {
        const response = await axiosClient.post('/api/admins', data);
        if (response.status === 200) {
          // Admin added successfully
          setShowModal(false); // Close the modal
          setAdmins([...admins, response.data]); // Update admins state with new admin
          notify('success', 'Admin added successfully!', 'top-center', 3000);
        } else {
          console.error('Error adding admin:', response.statusText);
          notify('error', 'Failed to add admin!', 'top-center', 3000);
        }
      } catch (error) {
        console.error('Error adding admin:', error);
        notify('error', 'Failed to add admin!', 'top-center', 3000);
      }
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
                <div className='manage-users appt-record-five pending' key={client.id}>
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
                <div className='manage-users user-record' key={client.id}>
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
