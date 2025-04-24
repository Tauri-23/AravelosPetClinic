import { useEffect, useState } from "react"
import { useModal } from "../../../contexts/ModalContext";
import { formatDate, formatDateTime, formatTime } from "../../../assets/js/utils";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Table } from "antd";

export default function AdminCompletedAppointments() {
    const navigate = useNavigate();
    const {setActiveTab, completedAppointments} = useOutletContext();



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveTab("Completed");
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
            render: (_, row) => `${formatDate(row.appointment_date)} at ${formatTime(row.appointment_time)}`
        },
        {
            title: "Date Completed",
            render: (_, row) => formatDateTime(row.updated_at)
        },
    ]



    /**
     * Render
     */
    return(
        <>
            <Table
            columns={appointmentColumns}
            dataSource={completedAppointments.map((item) => ({...item, key: item.id}))}
            bordered
            onRow={(record) => ({
                onClick: () => navigate(`/AdminIndex/ViewAppointment/${record.id}`)
            })}
            />
        </>
    )
}