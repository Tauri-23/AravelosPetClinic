import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { formatDate, formatDateTime } from "../../../assets/js/utils";
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
            title: "Pets",
            dataIndex: 'appointment_pets',
            render: (pets) => pets.map(x => x.pet.name).join(', ')
        }
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