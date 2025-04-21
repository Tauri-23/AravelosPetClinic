import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react"
import { isEmptyOrSpaces } from "../../../../assets/js/utils";

export default function MedHistAddFileModal({handleAdd, onClose}) {
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");


    /**
     * Render
     */
    return(
        <div className="modal1">
            <div className="modal-box3">
                <button className="modal-close" onClick={onClose}>
                    x
                </button>
                <h3 className="mar-bottom-1">Add File</h3>

                <label htmlFor="pic">Picture</label>
                <input 
                type="file" 
                name="pic" 
                id="pic"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                        const maxSizeInMB = 10;
                        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

                        if (file.size > maxSizeInBytes) {
                            alert(`File size should not exceed ${maxSizeInMB}MB.`);
                            e.target.value = ''; // clear the file input
                            return;
                        }

                        setFile(file);
                    }
                }}
                className="mar-bottom-3"
                />

                <label htmlFor="desc">Description</label>
                <TextArea
                id="desc"
                name="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                className="mar-bottom-1"/>

                <Button 
                type="primary" 
                size="large"
                disabled={file === null || isEmptyOrSpaces(desc)}
                onClick={() => {handleAdd(file, desc); onClose()}}>
                    Add
                </Button>
            </div>
        </div>
    )
}