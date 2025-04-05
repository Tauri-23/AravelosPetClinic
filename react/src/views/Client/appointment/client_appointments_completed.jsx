import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { formatDate, formatDateTime } from "../../../assets/js/utils";
import { Table } from "antd";

export default function ClientAppointmentsCompleted() {
    const navigate = useNavigate();
    const {completedAppointments, setActiveTab} = useOutletContext();



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
            render: (_, row) => formatDate(row.date_time)
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
            dataSource={completedAppointments?.map((item) => ({...item, key: item.id}))}
            bordered
            onRow={(record) => ({
                onClick: () => navigate(`/ClientIndex/ViewAppointment/${record.id}`)
            })}
            />
        </>
    );
}