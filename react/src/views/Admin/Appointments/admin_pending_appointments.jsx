import { useEffect } from "react"
import { useModal } from "../../../contexts/ModalContext";
import { formatDateTime, isEmptyOrSpaces } from "../../../assets/js/utils";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Table } from "antd";

export default function AdminPendingAppointments() {
    const navigate = useNavigate();
    const {setActiveTab, pendingAppointments} = useOutletContext();
    const {showModal} = useModal();



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
     * Handlers
     */
    const handleAppointmentRecordClick = (record) => {
        showModal('AppointmentRecordModalAdmin1', {record, handleCancel, handleApprovePage});
    }

    const handleApprovePage = (recordId) =>{
        navigate(`/AdminIndex/ApproveAppointment/${recordId}`);
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



    /**
     * Render
     */
    return(
        <>
            <Table
            columns={appointmentColumns}
            dataSource={pendingAppointments?.map((item) => ({...item, key: item.id}))}
            bordered
            />
        </>
    )
}