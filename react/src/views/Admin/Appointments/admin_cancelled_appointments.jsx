import { useEffect } from "react"
import { useModal } from "../../../contexts/ModalContext";
import { formatDate, formatDateTime } from "../../../assets/js/utils";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Table } from "antd";

export default function AdminCancelledAppointments() {
    const navigate = useNavigate();
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
            dataSource={canceledAppointments.map((item) => ({...item, key: item.id}))}
            bordered
            onRow={(record) => ({
                onClick: () => navigate(`/AdminIndex/ViewAppointment/${record.id}`)
            })}
            />
        </>
    )
}
