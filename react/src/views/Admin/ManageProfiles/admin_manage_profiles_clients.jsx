import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { formatDateTime } from "../../../assets/js/utils";
import { Table } from "antd";

export default function AdminManageProfilesClients() {
    const {setActiveTab, filteredClients, setFilteredClients} = useOutletContext();



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
        console.log(client);
    }



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