import { useEffect, useState } from "react"
import { useModal } from "../../../contexts/ModalContext";
import { formatDate, formatDateTime } from "../../../assets/js/utils";
import { useOutletContext } from "react-router-dom";
import { Table } from "antd";

export default function AdminCompletedAppointments() {
    const {setActiveTab, completedAppointments} = useOutletContext();
    const {showModal} = useModal();



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
     * Handlers
     */
    const handleAppointmentRecordClick = (appointment) => {
        showModal('AppointmentRecordModalAdmin1', {appointment, handleCancel});
    }
    
    const handleCancel = (recordId) =>{
        const handleFunction = "handleCancelPost";
        if (isEmptyOrSpaces(String(recordId))) {
            console.error("No appointment selected for cancellation.");
            return;
        }
        showModal('ConfirmActionModal1',  {handlePost:handleCancelPost, recordId, handleFunction});
    }



    /**
     * Render
     */
    return(
        <>
            <Table
            columns={appointmentColumns}
            dataSource={completedAppointments}
            bordered
            />
        </>
    )
}