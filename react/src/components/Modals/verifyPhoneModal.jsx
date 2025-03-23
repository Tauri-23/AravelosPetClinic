import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { XLg } from "react-bootstrap-icons";
import { isEmptyOrSpaces, notify } from "../../assets/js/utils";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";

const VerifyPhoneModal = ({onClose}) => {
    const {user, setUser} = useStateContext();



    /**
     * Handlers
     */
    const onCodeInput = (value) => {
        const formData = new FormData();
        formData.append('client', user.id);
        formData.append('for', 'phone verification');
        formData.append('otp', value);

        axiosClient.post('/client-verify-sms-otp', formData)
        .then(({data}) => {
            notify(data.status === 200 ? 'success' : "error", data.message, 'top-center', 3000);
            if(data.status === 200) {
                setUser(data.client);
                onClose();
            }
        }).catch(e => console.error(error))
    }



    /**
     * Render
     */
    return(
        <div className="modal1">
            <div className="modal-box3">
                <div className="position-absolute" style={{right: 25}} onClick={onClose}>
                    <XLg size={24}/>
                </div>

                {/* Title */}
                <h3 className="w-100 text-center">
                    Verify Phone
                </h3>

                <div className="d-flex flex-direction-y gap4 mar-bottom-1">
                    <small>Verification code is sent to your phone number</small>

                    <label htmlFor="code">OTP</label>
                    <Input.OTP 
                    id="code" 
                    size="large" 
                    placeholder="Input verification code"
                    onChange={onCodeInput}
                    />
                </div>
            </div>
        </div>
    )
}

export default VerifyPhoneModal;