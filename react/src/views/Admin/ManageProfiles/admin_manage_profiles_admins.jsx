import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { formatDateTime } from "../../../assets/js/utils";
import { Table } from "antd";
import { useModal } from "../../../contexts/ModalContext";

export default function AdminManageProfilesAdmins() {
    const {showModal} = useModal();
    const {setActiveTab, filteredAdmins, setFilteredAdmins} = useOutletContext();



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveTab("Admins");
    }, []);



    /**
     * Setup Table Columns
     */
    const adminColumns = [
        {
            title: "Admin ID",
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
            title: "Role",
            render: (_, row) => row.role.role
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
    const handleAdminClick = (admin) => {
        showModal("AdminViewMiniProfileModal", {userType: "Admin", user: admin});
    }



    /**
     * Render
     */
    return(
        <Table
        columns={adminColumns}
        dataSource={filteredAdmins.map((item) => ({...item, key: item.id}))}
        bordered
        onRow={(record) => ({
            onClick: () => handleAdminClick(record)
        })}
        />
    );
}