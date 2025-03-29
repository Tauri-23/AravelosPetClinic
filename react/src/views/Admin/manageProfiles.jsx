import React, { useState, useEffect, act } from "react";
import { Link, useOutletContext } from "react-router-dom";
import "../../assets/css/manageaccs.css";
import { fetchAllClientsNotDeleted } from "../../services/UserClientsServices";
import axiosClient from "../../axios-client";
import { notify } from "../../assets/js/utils";
import { fetchAllAdminsNotDeleted } from "../../services/UserAdminsServices";
import { useStateContext } from "../../contexts/ContextProvider";
import { useModal } from "../../contexts/ModalContext";

function ManageProfiles() {
    const {setActiveNavLink} = useOutletContext();
    const { user } = useStateContext();
    const { showModal } = useModal();
    const [activeTab, setActiveTab] = useState("ManageClients");
    const [admins, setAdmins] = useState(null);
    const [clients, setClients] = useState(null);

    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Manage Accounts");

        const getAll = async () => {
            try {
                const [clientsDb, adminsDb] = await Promise.all([
                    fetchAllClientsNotDeleted(),
                    fetchAllAdminsNotDeleted(user.id),
                ]);

                setClients(clientsDb);
                setAdmins(adminsDb);
            } catch (error) {
                console.error(error);
            }
        };

        getAll();
    }, []);

    const renderHeaders = () => {
        switch (activeTab) {
            case "ManageClients":
                return (
                    <>
                        <div className="mini-nav bottom-margin">
                            <div className="anybody medium-f bold">
                                Manage Customers
                            </div>
                            <div className="separator left-margin-s right-margin-s"></div>
                            <div onClick={() => setActiveTab("ManageAdmins")}>
                                <div className="anybody small-f semi-bold pointer">
                                    Manage Staff Accounts
                                </div>
                            </div>
                        </div>

                        <div className="myappt headers small-form d-flex bottom-margin-s">
                            <div className="detailHeader column semi-bold">
                                Full Name
                            </div>
                            <div className="detailHeader column semi-bold">
                                Gender
                            </div>
                            <div className="detailHeader column semi-bold">
                                Email
                            </div>
                            <div className="detailHeader column semi-bold">
                                Status
                            </div>
                            <div className="detailHeader column semi-bold">
                                Actions
                            </div>
                        </div>
                    </>
                );

            case "ManageAdmins":
                return (
                    <>
                        <div className="manage-prof mini-nav">
                            <div className="mini-links">
                                <div className="anybody medium-f bold">
                                    Manage Staff Accounts
                                </div>
                                <div className="separator left-margin-s right-margin-s"></div>
                                <div
                                    onClick={() =>
                                        setActiveTab("ManageClients")
                                    }
                                >
                                    <div className="anybody small-f semi-bold pointer">
                                        Manage Customers
                                    </div>
                                </div>
                            </div>
                            <div className="add-admin">
                                <div
                                    className="primary-btn-blue1 bottom-margin"
                                    onClick={handleAddAdmin}
                                >
                                    Add account
                                </div>
                            </div>
                        </div>

                        <div className="myappt headers small-form d-flex bottom-margin-s">
                            <div className="detailHeader column semi-bold">
                                Full Name
                            </div>
                            <div className="detailHeader column semi-bold">
                                Gender
                            </div>
                            <div className="detailHeader column semi-bold">
                                Email
                            </div>
                            <div className="detailHeader column semi-bold">
                                Role
                            </div>
							<div className="detailHeader column semi-bold">
                                Status
                            </div>
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
        formData.append("clientId", clientId);

        axiosClient
            .post("/del-client", formData)
            .then(({ data }) => {
                if (data.status === 200) {
                    setClients((prev) => prev.filter((c) => c.id !== clientId));
                    notify("success", data.message, "top-center", 3000);
                } else {
                    notify("error", data.message, "top-center", 3000);
                }
            })
            .catch((error) => console.error(error));
    };

    const handleSuspendUnsuspendClient = (clientId) => {
        // Send a PATCH request to the backend API to suspend the user
        const formData = new FormData();
        formData.append("clientId", clientId);
        axiosClient
            .post("/suspend-unsuspend-client", formData)
            .then(({ data }) => {
                if (data.status === 200) {
                    setClients(data.clients);
                    notify("success", data.message, "top-center", 3000);
                } else {
                    notify("error", data.message, "top-center", 3000);
                }
            })
            .catch((error) => console.error(error));
    };

    const handleAddAdmin = () => {
        showModal("AddAdminModal1", { handleAddAdmin: handleAddAdminBtnClick });
    };

    /**
     * Admin Handlers
     */
    const handleAddAdminBtnClick = (
        fname,
        mname,
        lname,
        email,
        password,
        adminDOB,
        Gender,
        address,
        phone,
        role,
        pic
    ) => {
        const formData = new FormData();
        formData.append("fname", fname);
        formData.append("mname", mname);
        formData.append("lname", lname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("adminDOB", adminDOB);
        formData.append("Gender", Gender);
        formData.append("address", address);
        formData.append("phone", phone);
        formData.append("role", role);
        formData.append("pic", pic);

        console.log(fname);
        console.log(mname);
        console.log(lname);
        console.log(email);
        console.log(password);
        console.log(adminDOB);
        console.log(Gender);
        console.log(address);
        console.log(phone);
        console.log(role);
        console.log(pic);

        axiosClient
            .post("/create-admin", formData)
            .then(({ data }) => {
                if (data.status === 200) {
                    setAdmins((prev) => [...prev, data.admin]);
                }
                notify(
                    data.status === 200 ? "success" : "error",
                    data.message,
                    "top-center",
                    3000
                );
            })
            .catch((error) => console.error(error));
    };

    const handleSuspendUnsuspendAdmin = (adminId) => {
        const formData = new FormData();
        formData.append("adminId", adminId);
		formData.append("signedId", user.id);

        axiosClient
            .post("/suspend-unsuspend-admin", formData)
            .then(({ data }) => {
                if (data.status === 200) {
                    setAdmins(data.admins);
                }
                notify(
                    data.status === 200 ? "success" : "error",
                    data.message,
                    "top-center",
                    3000
                );
            })
            .catch((error) => console.error(error));
    };

    const handleDeleteAdmin = (adminId) => {
        const formData = new FormData();
        formData.append("adminId", adminId);

        axiosClient
            .post("/del-admin", formData)
            .then(({ data }) => {
                if (data.status === 200) {
                    setAdmins((prev) =>
                        prev.filter((admin) => admin.id !== adminId)
                    );
                }
                notify(
                    data.status === 200 ? "success" : "error",
                    data.message,
                    "top-center",
                    3000
                );
            })
            .catch((error) => console.error(error));
    };

	const handleAdminRowClick = (admin) => {
		showModal("AdminViewAccountInfoModal1", {
			admin, 
			handleSuspendUnsuspendAdmin,
			handleDeleteAdmin
		});
	}



	/**
	 * Render
	 */
    return (
        <div className="content1 compressed">
            {renderHeaders()}

            {/* Manage Clients */}
            {activeTab === "ManageClients" && (
                <div className="myappt small-form">
                    {clients?.length > 0 &&
                        clients.map((client) => (
                            <div
                                className="manage-users appt-record-five pending"
                                key={client.id}
                            >
                                <div className="content-deet">
                                    {client.fname} {client.mname}{" "}
                                    {client.lname}
                                </div>
                                <div className="content-deet">
                                    {client.gender}
                                </div>
                                <div className="content-deet">
                                    {client.email}
                                </div>
                                <div className="content-deet">
                                    {client.status}
                                </div>
                                <div className="content-deet">
                                    <button
                                        className="primary-btn-blue1"
                                        onClick={() =>
                                            handleSuspendUnsuspendClient(
                                                client.id
                                            )
                                        }
                                    >
                                        {client.status === "active"
                                            ? "Suspend"
                                            : "Unsuspend"}
                                    </button>
                                    <button
                                        className="sub-button"
                                        onClick={() =>
                                            handleDeleteClient(client.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    {!clients && <>Loading</>}

                    {clients?.length < 1 && <>No Records</>}
                </div>
            )}

            {activeTab === "ManageAdmins" && (
                <div className="myappt small-form">
                    {admins?.length > 0 &&
                        admins.map((admin) => (
                            <div
                                className="manage-users appt-record-five pending"
                                onClick={() => handleAdminRowClick(admin)}
                                key={admin.id}
                            >
                                <div className="content-deet">
                                    {admin.fname} {admin.mname}{" "}
                                    {admin.lname}
                                </div>
                                <div className="content-deet">
                                    {admin.gender}
                                </div>
                                <div className="content-deet">
                                    {admin.email}
                                </div>
                                <div className="content-deet">
                                    {admin.role.role}
                                </div>
                                <div className="content-deet">
                                    {admin.status}
                                </div>
                            </div>
                        ))}
                    {!admins && <>Loading</>}

                    {admins?.length < 1 && <>No Records</>}
                </div>
            )}
        </div>
    );
}

export default ManageProfiles;
