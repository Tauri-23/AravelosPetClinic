import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { formatDateTime, notify } from "../../../assets/js/utils";
import { Table } from "antd";
import { useModal } from "../../../contexts/ModalContext";
import axiosClient from "../../../axios-client";

export default function AdminManageProfilesClients() {
    const {showModal} = useModal();
    const {setActiveTab, filteredClients, setFilteredClients, setClients} = useOutletContext();



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveTab("Clients");
    }, []);



    /**
     * Setup Table Columns
     */
    const clientColumns = [
        {
            title: "Client ID",
            dataIndex: "id",
        },
        {
            title: "Full Name",
            render: (_, row) => `${row.fname} ${row.mname || ""} ${row.lname}`
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Gender",
            dataIndex: "gender",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Joined at",
            render: (_, row) => formatDateTime(row.created_at)
        },
    ]



    /**
     * Handlers
     */
    const handleClientClick = (client) => {
        showModal("AdminViewMiniProfileModal", {
            handleDeleteClient,
            handleSuspendUnsuspendClient,
            userType: "Client", 
            user: client
        });
    }
    
    const handleDeleteClient = (clientId) => {
        const formData = new FormData();
        formData.append("clientId", clientId);

        axiosClient.post("/del-client", formData)
        .then(({ data }) => {
            if (data.status === 200) {
                setClients((prev) => prev.filter((c) => c.id !== clientId));
                setFilteredClients((prev) => prev.filter((c) => c.id !== clientId));
                notify("success", data.message, "top-center", 3000);
            } else {
                notify("error", data.message, "top-center", 3000);
            }
        })
        .catch((error) => console.error(error));
    };

    const handleSuspendUnsuspendClient = (clientId) => {
        const formData = new FormData();
        formData.append("clientId", clientId);
        axiosClient.post("/suspend-unsuspend-client", formData)
        .then(({ data }) => {
            if (data.status === 200) {
                setClients(data.clients);
                setFilteredClients(data.clients);
                notify("success", data.message, "top-center", 3000);
            } else {
                notify("error", data.message, "top-center", 3000);
            }
        })
        .catch((error) => console.error(error));
    };



    /**
     * Render
     */
    return(
        <Table
        columns={clientColumns}
        dataSource={filteredClients.map((item) => ({...item, key: item.id}))}
        bordered
        onRow={(record) => ({
            onClick: () => handleClientClick(record)
        })}
        />
    );
}