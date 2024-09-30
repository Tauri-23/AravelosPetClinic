import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

export default function AddCategoryModal1({ handleAddCategoryPost, onClose }) {
  const [newCategory, setNewCategory] = useState('');

    return(
        <div className= {`modal1`}>


            {/* Box of modal */}
            <div className="modal-box3">
                <div className="circle-btn1 semi-big-f" onClick={onClose}>
                    <Icon.X/>
                </div>

                {/* Desc */}
                <div className="text-center mar-bottom-1 d-flex flex-direction-y gap3">
                    <div className="text-m1 fw-bold w-100">Add Category</div>
                </div>

                <input
                className="categoryInput"
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"
                />

                {/* Btns */}
                <div className="d-flex flex-direction-y gap3">
                        
                    <div 
                    onClick={() => {handleAddCategoryPost(newCategory); onClose();}} 
                    className="primary-btn-blue1 text-center"
                    >
                        Yes
                    </div>
                    
                    <div className="secondary-btn-black2 text-center d-flex gap3 align-items-center justify-content-center" onClick={onClose}>
                        Cancel
                    </div>
                </div>
            </div>

            
        </div>
    )
}