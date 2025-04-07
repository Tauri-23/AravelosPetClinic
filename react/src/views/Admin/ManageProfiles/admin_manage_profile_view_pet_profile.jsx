import { useEffect, useState } from "react";
import "../ManageProfiles/css/admin_view_client_profile.css";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { fetchPetInfoWhereId } from "../../../services/PetServices";
import { MdPets } from "react-icons/md";
import { Button, Input, Spin, Table } from "antd";
import { BsCake, BsCakeFill, BsGenderAmbiguous } from "react-icons/bs";
import { formatDate, formatDateTime, isEmptyOrSpaces, notify } from "../../../assets/js/utils";
import { fetchAllAppointmentsWherePetandStatus } from "../../../services/AppointmentServices";
import axiosClient from "../../../axios-client";

export default function AdminManageProfileViewPetProfile() {
    const navigate = useNavigate();
    const {setActiveNavLink} = useOutletContext();
    const {petId} = useParams();

    const [pet, setPet] = useState(null);
    const [appointments, setAppointments] = useState(null);

    const [isFixingLabel, setFixingLabel] = useState(false);
    const [labelIn, setLabelIn] = useState("");



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
            setPet(petInfo);
            setLabelIn(petInfo.label || "");
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
     * Handlers
     */
    const handleEditLabel = () => {
        const formData = new FormData();
        formData.append("petId", pet.id);
        formData.append("label", labelIn);

        axiosClient.post("/edit-pet-label", formData)
        .then(({data}) => {
            if(data.status === 200) {
                setPet(data.pet);
                setFixingLabel(false);
            }
            notify(data.status === 200 ? "success" : "error", data.message, "top-center", 3000);
        }).catch(error => {
            notify("error", "Server Error", "top-center", 3000);
            console.error(error);
        })
    }



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

                    <div className="avcp-cont1 mar-bottom-1">
                        <div className="d-flex gap1 mar-bottom-1">
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
                        
                        <div>
                            <h5 className="fw-bold">Label</h5>

                            {isFixingLabel
                            ? (
                                <>
                                    <Input
                                    className="mar-bottom-3"
                                    style={{width: 400}}
                                    placeholder="Input Client's Label"
                                    value={labelIn}
                                    onChange={(e) => setLabelIn(e.target.value)}
                                    /> <br/>
                                </>
                            )
                            : (
                                <div className="mar-bottom-3">{pet.label || "Not set"}</div>
                            )}
                            

                            {!isFixingLabel && (
                                <Button
                                type="primary"
                                onClick={() => setFixingLabel(true)}>
                                    {pet.label ? "Edit Label" : "Add Label"}
                                </Button>
                            )}

                            {isFixingLabel && (
                                <div className="d-flex gap3">
                                    <Button
                                    type="default"
                                    onClick={() => setFixingLabel(false)}>
                                        Cancel
                                    </Button>

                                    <Button
                                    type="primary"
                                    disabled={isEmptyOrSpaces(labelIn) || labelIn === pet?.label}
                                    onClick={() => handleEditLabel()}>
                                        Save
                                    </Button>
                                </div>
                            )}
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