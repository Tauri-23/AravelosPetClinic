import { XLg } from "react-bootstrap-icons";
import "../css/admin_view_mini_profile_modal.css";
import { BsEnvelope, BsGenderAmbiguous, BsPhone } from "react-icons/bs";
import { Popconfirm } from "antd";

export default function AdminViewMiniProfileModal({
    handleDeleteClient,
    handleSuspendUnsuspendClient,
    userType, 
    user, 
    onClose
}) {
    return(
        <div className="modal1">
            <div className="modal-box3">
                <div className="position-absolute cursor-pointer">
                    <XLg size={30} cursor="pointer" onClick={onClose}/>
                </div>
                <h3 className="text-center mar-bottom-1">Profile</h3>

                <div className="d-flex gap1 align-items-center mar-bottom-1">
                    <div className="avmp-pfp">
                        <img src={`/assets/media/pfp/${user.picture}`} alt="profile picture" />
                    </div>
                    <div>
                        <h4 className="fw-bold mar-bottom-2">{user.fname} {user.mname} {user.lname}</h4>

                        <div className="d-flex gap3 align-items-center mar-bottom-4">
                            <BsEnvelope size={20}/>
                            <small>{user.email}</small>
                        </div>
                        <div className="d-flex gap3 align-items-center mar-bottom-4">
                            <BsPhone size={20}/>
                            <small>{user.phone}</small>
                        </div>
                        <div className="d-flex gap3 align-items-center mar-bottom-4">
                            <BsGenderAmbiguous size={20}/>
                            <small>{user.gender}</small>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="d-flex gap3 justify-content-end">
                    {userType === "Client" && (
                        <>
                            <Popconfirm
                            title="Delete client"
                            description="Are you sure to delete this client?"
                            onConfirm={() => {handleDeleteClient(user.id); onClose()}}
                            okText="Yes"
                            cancelText="No">
                                <button className="primary-btn-red1">Delete Account</button>
                            </Popconfirm>

                            <Popconfirm
                            title={`${user.status === "suspended" ? "Unsuspend" : "Suspend"} Client`}
                            description={`Are you sure to ${user.status === "suspended" ? "unsuspend" : "suspend"} this client?`}
                            onConfirm={() => {handleSuspendUnsuspendClient(user.id); onClose()}}
                            okText="Yes"
                            cancelText="No">
                                <button 
                                className={`primary-btn-${user.status === "suspended" ? "blue1" : "red1"}`}>
                                    {user.status === "suspended" ? "Unsuspend Account" : "Suspend Account"}
                                </button>
                            </Popconfirm>
                        </>
                    )}
                    <button className="primary-btn-blue1">View Full Profile</button>
                </div>
            </div>
        </div>
    )
}