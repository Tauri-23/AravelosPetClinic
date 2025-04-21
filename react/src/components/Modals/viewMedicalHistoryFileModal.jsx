import { XLg } from "react-bootstrap-icons";

export default function ViewMedicalHistoryFileModal({filename, desc, onClose}) {
    return (
        <div className="modal1">
            <div className="modal-box3">
                <div className="position-absolute" style={{right: 25}} onClick={onClose}>
                    <XLg size={24}/>
                </div>

                <h3>View Result</h3>

                <div className="d-flex w-100 justify-content-center mar-bottom-1">
                    <div
                    style={{
                        position: "relative",
                        width: 200,
                        height: 200,
                        borderRadius: 10,
                        overflow:"hidden",
                        display: "flex",
                        alignItems: "center",
                        background: "white",
                        filter: "drop-shadow(0 0 2px grey)",
                    }}>
                        <img src={`/assets/media/medhistory/${filename}`} alt="" className="position-absolute h-100" />
                    </div>
                </div>

                <div className="mar-bottom-3 text-m1 fw-bold">Description:</div>
                <div className="text-m1">{desc}</div>
            </div>
        </div>
    );
}