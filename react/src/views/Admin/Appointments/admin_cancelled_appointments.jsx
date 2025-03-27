import { useEffect } from "react"
import { useModal } from "../../../contexts/ModalContext";
import { formatDate, formatDateTime } from "../../../assets/js/utils";
import { useOutletContext } from "react-router-dom";
import { Table } from "antd";

export default function AdminCancelledAppointments() {
    const {setActiveTab, canceledAppointments} = useOutletContext();
    const {showModal} = useModal();



    /**
     * Fetch All necessary data
     */
    useEffect(() => {
        setActiveTab("Cancelled")
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
            title: "Date Cancelled",
            render: (_, row) => formatDateTime(row.cancelled_at)
        },
        {
            title: "Reason",
            dataIndex: "reason"
        },
    ]



    /**
     * Handlers
     */
    const handleAppointmentRecordClick = (record) => {
        showModal('AppointmentRecordModalAdmin1', {record, handleCancel});
    }



    /**
     * Render
     */
    return(
        <>
            <Table
            columns={appointmentColumns}
            dataSource={canceledAppointments}
            bordered/>
        </>
    )
}
