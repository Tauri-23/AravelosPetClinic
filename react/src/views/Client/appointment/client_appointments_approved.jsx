import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { formatDate, formatDateTime, formatTime } from "../../../assets/js/utils";
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
            title: "Appointment Method",
            render: (_, row) => row.type
        },
        {
            title: "Pets",
            dataIndex: 'appointment_pets',
            render: (pets) => pets.map(x => x.pet.name).join(', ')
        },
        {
            title: "Appointment Date",
            render: (_, row) => `${formatDate(row.appointment_date)}`
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
