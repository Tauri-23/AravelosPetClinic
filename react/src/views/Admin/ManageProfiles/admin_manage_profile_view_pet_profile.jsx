import { useEffect, useState } from "react";
import "../ManageProfiles/css/admin_view_client_profile.css";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { fetchPetInfoWhereId } from "../../../services/PetServices";
import { MdPets } from "react-icons/md";
import { Button, Spin, Table } from "antd";
import { BsCake, BsCakeFill, BsGenderAmbiguous } from "react-icons/bs";
import { formatDate, formatDateTime } from "../../../assets/js/utils";
import { fetchAllAppointmentsWherePetandStatus } from "../../../services/AppointmentServices";

export default function AdminManageProfileViewPetProfile() {
    const navigate = useNavigate();
    const {setActiveNavLink} = useOutletContext();
    const {petId} = useParams();

    const [pet, setPet] = useState(null);
    const [appointments, setAppointments] = useState(null);



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Manage Accounts");
        const getAll = async() => {
            const [petInfo, appointmentsDb] = await Promise.all([
                fetchPetInfoWhereId(petId),
                fetchAllAppointmentsWherePetandStatus(petId, "Completed")
            ]);
            console.log(appointmentsDb);
            setPet(petInfo);
            setAppointments(appointmentsDb);
        }
        getAll();
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
     * render
     */
    return(
        <div className="content1 compressed">
            {pet === null
            ? (<Spin size="large"/>)
            : Object.keys(pet).length === 0 ? ( // Corrected empty object check
                <>
                    <h3>Pet Doesn't Exist</h3>
                    <Button onClick={() => navigate('/')}>Return home</Button>
                </>
            ) : (
                <>
                    <h3 className="fw-bold mar-bottom-1">Pet Profile</h3>

                    <div className="avcp-cont1 d-flex gap1 mar-bottom-1">
                        <div className="avcp-client-pic">
                            <img src={`/assets/media/pets/${pet.picture}`} alt="profile picture" />
                        </div>

                        <div>
                            <h4 className="fw-bold">{pet.name}</h4>

                            <div className="d-flex gap3 align-items-center mar-bottom-4">
                                <MdPets/>
                                <small>{pet.type} ({pet.breed})</small>
                            </div>
                            <div className="d-flex gap3 align-items-center mar-bottom-4">
                                <BsGenderAmbiguous/>
                                <small>{pet.gender}</small>
                            </div>
                            <div className="d-flex gap3 align-items-center mar-bottom-4">
                                <BsCakeFill/>
                                <small>{formatDate(pet.dob)}</small>
                            </div>
                            <div className="d-flex flex-direction-y">
                                <small>Owner:</small>
                                <Link to={`/AdminIndex/ViewClientProfile/${pet.client.id}`}>{pet.client.fname} {pet.client.mname} {pet.client.lname}</Link>
                            </div>
                        </div>
                    </div>

                    <h3 className="fw-bold mar-bottom-1">Appointment History</h3>

                    <Table
                    columns={appointmentColumns}
                    dataSource={appointments.map((item) => ({...item, key: item.id}))}
                    bordered
                    onRow={(record) => ({
                        onClick: () => navigate(`/AdminIndex/ViewAppointment/${record.id}`)
                    })}
                    />
                </>
            )}
        </div>
    );
}