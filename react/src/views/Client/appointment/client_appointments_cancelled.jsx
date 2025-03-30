import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { formatDateTime } from "../../../assets/js/utils";
import { Table } from "antd";

export default function ClientAppointmentsCancelled() {
    const navigate = useNavigate();
    const {canceledAppointments, setActiveTab} = useOutletContext();



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveTab("Cancelled");
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
     * Render
     */
    return(
        <>
            <Table
            columns={appointmentColumns}
            dataSource={canceledAppointments?.map((item) => ({...item, key: item.id}))}
            bordered
            onRow={(record) => ({
                onClick: () => navigate(`/ClientIndex/ViewAppointment/${record.id}`)
            })}
            />
        </>
    );
}