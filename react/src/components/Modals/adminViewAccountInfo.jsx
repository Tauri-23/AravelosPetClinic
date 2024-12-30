import * as Icon from "react-bootstrap-icons";

export default function AdminViewAccountInfo({admin, handleSuspendUnsuspendAdmin, handleDeleteAdmin, onClose}) {
    return(
        <div className="modal1">
            <div className="modal-box2">
                <div className="circle-btn1 semi-medium-f">
                    <Icon.X className="pointer" onClick={onClose} />
                </div>
                <h3 className="mar-bottom-1">Account Information</h3>
                <div className="d-flex gap1">
                    <div className="mini-profile-pfp">
                        <img src={`/assets/media/pfp/${admin.picture}`} alt={admin.pic}/>
                    </div>

                    <div className="d-flex flex-direction-y">
                        <h4>{admin.fname} {admin.lname}</h4>
                        <div className="d-flex gap3 align-items-center">
                            <Icon.Telephone/>
                            <small>{admin.phone}</small>
                        </div>

                        <div className="d-flex gap3 align-items-center">
                            <Icon.GeoAlt/>
                            <small>{admin.address}</small>
                        </div>

                        <div className="d-flex gap3 align-items-center">
                            <Icon.Envelope/>
                            <small>{admin.email}</small>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex mar-top-1 gap3">
                            <button
                                className="primary-btn-blue1"
                                onClick={() => {
                                    handleSuspendUnsuspendAdmin(admin.id);
                                    onClose();
                                }}
                            >
                                {admin.status === "active"
                                    ? "Suspend"
                                    : "Unsuspend"}
                            </button>
                            <button
                                className="sub-button"
                                onClick={() => {
                                    handleDeleteAdmin(admin.id);
                                    onClose();
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}