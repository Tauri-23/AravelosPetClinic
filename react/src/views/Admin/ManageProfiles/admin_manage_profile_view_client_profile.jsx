import { useEffect, useState } from "react";
import "../ManageProfiles/css/admin_view_client_profile.css";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { fetchClientInfoWhereId } from "../../../services/UserClientsServices";
import { Button, Input, Spin } from "antd";
import { BsEnvelope, BsGenderAmbiguous, BsPhone } from "react-icons/bs";
import { MdPets } from "react-icons/md";
import axiosClient from "../../../axios-client";
import { isEmptyOrSpaces, notify } from "../../../assets/js/utils";

export default function AdminManageProfileViewClientProfile() {
    const navigate = useNavigate();
    const {setActiveNavLink} = useOutletContext();
    const {clientId} = useParams();
    const [client, setClient] = useState(null);

    const [isFixingLabel, setFixingLabel] = useState(false);
    const [labelIn, setLabelIn] = useState("");



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Manage Accounts");
        const getAll = async() => {
            const data = await fetchClientInfoWhereId(clientId);
            setClient(data);
            setLabelIn(data.label || "");
        }
        getAll();
    }, []);



    /**
     * Handlers
     */
    const handleEditLabel = () => {
        const formData = new FormData();
        formData.append("clientId", client.id);
        formData.append("label", labelIn);

        axiosClient.post("/edit-client-label", formData)
        .then(({data}) => {
            if(data.status === 200) {
                setClient(data.client);
                setFixingLabel(false);
            }
            notify(data.status === 200 ? "success" : "error", data.message, "top-center", 3000);
        }).catch(error => {
            notify("error", "Server Error", "top-center", 3000);
            console.error(error);
        })
    }



    /**
     * Render
     */
    return(
        <div className="content1 compressed">
        {client === null ? (
            <Spin size="large" />
        ) : Object.keys(client).length === 0 ? ( // Corrected empty object check
            <>
                <h3>Client Doesn't Exist</h3>
                <Button onClick={() => navigate('/')}>Return home</Button>
            </>
        ) : (
            <>
                <h3 className="fw-bold mar-bottom-1">View Profile</h3>

                <div className="avcp-cont1 mar-bottom-1">
                    <div className="d-flex gap1 mar-bottom-1">
                        <div className="avcp-client-pic">
                            <img src={`/assets/media/pfp/${client.picture}`} alt="profile picture" />
                        </div>

                        <div>
                            <h4 className="fw-bold">{client.fname} {client.mname} {client.lname}</h4>

                            <div className="d-flex gap3 align-items-center mar-bottom-4">
                                <BsEnvelope/>
                                <small>{client.email}</small>
                            </div>
                            <div className="d-flex gap3 align-items-center mar-bottom-4">
                                <BsPhone/>
                                <small>{client.phone}</small>
                            </div>
                            <div className="d-flex gap3 align-items-center mar-bottom-4">
                                <BsGenderAmbiguous/>
                                <small>{client.gender}</small>
                            </div>
                            <div className="d-flex gap3 align-items-center">
                                <MdPets/>
                                <small>{client.pets.length} Pets</small>
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
                            <div className="mar-bottom-3">{client.label || "Not set"}</div>
                        )}
                        

                        {!isFixingLabel && (
                            <Button
                            type="primary"
                            onClick={() => setFixingLabel(true)}>
                                {client.label ? "Edit Label" : "Add Label"}
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
                                disabled={isEmptyOrSpaces(labelIn) || labelIn === client?.label}
                                onClick={() => handleEditLabel()}>
                                    Save
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/**
                 * Pets
                 */}
                <div>
                    <h3 className="fw-bold mar-bottom-1">Pets</h3>

                    <div className="d-flex gap2 flex-wrap">
                        {client.pets.length < 1 && (
                            <h4>No pets 😔</h4>
                        )}
                        {client.pets.map(pet => (
                            <div key={pet.id} onClick={() => navigate(`/AdminIndex/ViewPetProfile/${pet.id}`)} className="avcp-pet-box">
                                <div className="avcp-pet-box-img mar-bottom-3">
                                    <img src={`/assets/media/pets/${pet.picture}`} alt="pet pfp"/>
                                </div>

                                <h5 className="fw-bold">{pet.name}</h5>
                                <small>{pet.breed.breed}</small>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )}
    </div>
    );
}