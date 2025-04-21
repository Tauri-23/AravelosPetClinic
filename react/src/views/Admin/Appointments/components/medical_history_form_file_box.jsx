import { Button } from "antd";

export default function MedicalHistoryFormFileBox({file, desc, handleAddRemoveFile}) {
    return(
        <div className="med-hist-form-file-box position-relative">
            <div className="position-absolute" style={{top: 5, right: 5, zIndex:2}}>
                <Button shape="circle" onClick={handleAddRemoveFile}>X</Button>
            </div>

            <div className="med-hist-form-file-box-pic">
                <img src={URL.createObjectURL(file)}/>
            </div>

            <div className="med-hist-form-file-box-desc">{desc}</div>
        </div>
    )
}