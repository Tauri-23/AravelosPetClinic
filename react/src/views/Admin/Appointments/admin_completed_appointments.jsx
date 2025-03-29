import { useEffect, useState } from "react"
import { useModal } from "../../../contexts/ModalContext";
import { formatDate, formatDateTime } from "../../../assets/js/utils";
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
            title: "Pet Name",
            render: (_, row) => row.pet.name
        },
        {
            title: "Appointment Type",
            render: (_, row) => row.service.service
        },
        {
            title: "Appointment Date",
            render: (_, row) => formatDateTime(row.date_time)
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