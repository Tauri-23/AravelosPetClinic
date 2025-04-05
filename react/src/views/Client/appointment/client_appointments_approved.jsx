import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { formatDate, formatDateTime } from "../../../assets/js/utils";
import { Table } from "antd";

export default function ClientAppointmentsApproved() {
    const navigate = useNavigate();
    const {approvedAppointments, setActiveTab} = useOutletContext();



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveTab("Approved");
    }, []);



    /**
     * Setup Columns
     */
    const appointmentColumns = [
        {
            title: "Appointment ID",
            dataIndex: 'id',
        },
        {
            title: "Pet Name",
            render: (_, row) => row.pet.name
        },
        {
            title: "Appointment Type",
            render: (_, row) => row.service.service
        },
        {
            title: "Appointment Date",
            render: (_, row) => formatDate(row.date_time)
        },
        {
            title: "Date Approved",
            render: (_, row) => formatDateTime(row.approved_at)
        },
    ]



    /**
     * Render
     */
    return(
        <>
            <Table
            columns={appointmentColumns}
            dataSource={approvedAppointments?.map((item) => ({...item, key: item.id}))}
            bordered
            onRow={(record) => ({
                onClick: () => navigate(`/ClientIndex/ViewAppointment/${record.id}`)
            })}
            />
        </>
    );
}