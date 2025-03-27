import { useEffect, useState } from "react"
import { useModal } from "../../../contexts/ModalContext";
import { formatDate, formatDateTime, isEmptyOrSpaces, notify } from "../../../assets/js/utils";
import { useOutletContext } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { Table } from "antd";

export default function AdminApprovedAppointments() {
    const {setActiveTab, approvedAppointments} = useOutletContext();
    const {showModal} = useModal();



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
            render: (_, row) => formatDateTime(row.date_time)
        },
        {
            title: "Date Approved",
            render: (_, row) => formatDateTime(row.approved_at)
        },
    ]



    /**
     * Handlers
     */
    const handleAppointmentRecordClick = (record) => {
        showModal('AppointmentRecordModalAdmin1', {record, handleCancel, handleMComplete});
    }
    
    const handleCancel = (recordId) =>{
        console.log(recordId);
        const handleFunction = "handleCancelPost";
        if (isEmptyOrSpaces(String(recordId))) {
            console.error("No appointment selected for cancellation.");
            return;
        }
        showModal('ConfirmActionModal1',  {handlePost:handleCancelPost, recordId, handleFunction});
    }

    const handleCancelPost =(appointmentId, recordReason) => {
        const formData = new FormData();
        formData.append('appointmentId', appointmentId);
        formData.append('reason', recordReason || 'No reason provided.');

        axiosClient.post(`/cancel-appointment`, formData)
        .then(({ data }) => {
            if(data.status === 200) {
                setAppointments(prev => prev.filter(appointment => appointment.id != appointmentId));
            }
            notify(data.status === 200 ? 'status' : 'error', data.message, 'top-center', 3000);
        }).catch(error => {
            console.error(error);
        });
    }

    const handleMComplete = (appointmentId) => {
        const formData = new FormData();
        formData.append('appointmentId', appointmentId);

        axiosClient.post(`/m-complete-appointment`, formData)
        .then(({ data }) => {
            if(data.status === 200) {
                setAppointments(prev => prev.filter(appointment => appointment.id != appointmentId));
            }
            notify(data.status === 200 ? 'status' : 'error', data.message, 'top-center', 3000);
        }).catch(error => {
            console.error(error);
        });
    }



    /**
     * Render
     */
    return(
        <>
            <Table
            columns={appointmentColumns}
            dataSource={approvedAppointments}
            bordered
            />
        </>
    )
}