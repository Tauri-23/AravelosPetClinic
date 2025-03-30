import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { formatDateTime } from "../../../assets/js/utils";
import { Table } from "antd";

export default function ClientAppointmentsPending() {
    const navigate = useNavigate();
    const {pendingAppointments, setActiveTab} = useOutletContext();



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveTab("Pending");
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
    ]



    /**
     * Render
     */
    return(
        <>
            <Table
            columns={appointmentColumns}
            dataSource={pendingAppointments?.map((item) => ({...item, key: item.id}))}
            bordered
            onRow={(record) => ({
                onClick: () => navigate(`/ClientIndex/ViewAppointment/${record.id}`)
            })}
            />
        </>
    );
}