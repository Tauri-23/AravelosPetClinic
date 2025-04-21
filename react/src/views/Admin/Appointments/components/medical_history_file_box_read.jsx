import { useModal } from "../../../../contexts/ModalContext"

export default function MedicalHistoryFileBoxRead({file, desc}) {
    const {showModal} = useModal();



    /**
     * Handlers
     */
    const handleViewFile = () => {
        showModal("ViewMedicalHistoryFileModal", {filename: file, desc})
    }



    /**
     * Render
     */
    return(
        <div className="med-hist-form-file-box position-relative" onClick={handleViewFile}>

            <div className="med-hist-form-file-box-pic">
                <img src={`/assets/media/medhistory/${file}`}/>
            </div>

            <div className="med-hist-form-file-box-desc">{desc}</div>
        </div>
    )
}