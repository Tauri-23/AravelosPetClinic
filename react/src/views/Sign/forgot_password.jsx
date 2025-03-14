import { useRef, useState } from "react";
import "../../assets/css/sign.css";
import "../../assets/css/app.css";
import { notify } from "../../assets/js/utils";
import axiosClient from "../../axios-client";
import { useNavigate } from "react-router-dom";
import {Input} from "antd";

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [isEmailOTPSent, setEmailOTPSent] = useState(false);
    const [isOTPApproved, setOTPApproved] = useState(false);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPass, setNewPass] = useState("");
    const [conPass, setConPass] = useState("");


    /**
     * Render
     */



    /**
     * handlers
     */
    const handleSendEmailVerification = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("for", "forgot password");

        axiosClient.post('/client-send-email-otp', formData)
        .then(({data}) => {
            if(data.status === 200) {
                notify("success", data.message, "top-center", 3000);
                setEmailOTPSent(true);
                return;
            }
            notify("error", data.message, "top-center", 3000);
        }).catch(error => console.error(error));
    }

    const handleVerifyOTP = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("otp", otp);
        formData.append("for", "forgot password");

        axiosClient.post("/client-verify-email-otp", formData)
        .then(({data}) => {
            if(data.status === 200) {
                notify("success", data.message, "top-center", 3000);
                setOTPApproved(true);
                return;
            }
            notify("error", data.message, "top-center", 3000);
        }).catch(error => console.error(error));
    }

    const handleChangePass = (e) => {
        e.preventDefault();

        if(newPass !== conPass) {
            notify("error", "Passwords doesn't match", "top-center", 3000);
            return;
        }

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", newPass);

        axiosClient.post('/update-client-password', formData)
        .then(({data}) => {
            if(data.status === 200) {
                notify("success", data.message, "top-center", 3000);
                navigate("/");
            }
        }).catch(error => console.error(error));
    }



    /**
     * Render
     */
    return (
        <div className="signin-child forgot-child">
            <div className='container' id="container">
                <h1 style={{marginBottom:'15px'}}>Forgot your password?</h1>

                {/* <p>Enter the email address associated to your account and we'll send you a One-Time Password (OTP) to confirm your request to change your password.</p> */}
                
                {/* Email Input Form */}
                {(!isEmailOTPSent && !isOTPApproved) && (
                    <form onSubmit={handleSendEmailVerification} className="d-flex flex-direction-y gap3">
                        <div className="">
                            <label htmlFor="email">Email</label>
                            <Input
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </div>
                        <input type="submit" className="primary-btn-blue1" value="Send Verification" />
                    </form>
                )}

                {/* OTP Input form */}
                {(isEmailOTPSent && !isOTPApproved) && (
                    <form onSubmit={handleVerifyOTP} className="d-flex flex-direction-y gap3">
                        <div>
                            <label htmlFor="otp">6-Digit OTP</label>
                            <Input 
                            type="text" 
                            id="otp" 
                            maxLength={6} 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required/>
                        </div>
                        <input type="submit" className="primary-btn-blue1" value="Verify" />
                    </form>
                )}

                {/* Change Password */}
                {(isEmailOTPSent && isOTPApproved) && (
                    <form onSubmit={handleChangePass} className="d-flex flex-direction-y gap3 w-100">
                        <div className="w-100">
                            <label htmlFor="newPass">New Password</label>
                            <Input.Password value={newPass} type="password" id="newPass" onChange={(e) => setNewPass(e.target.value)} required/>
                        </div>
                        <div className="w-100">
                            <label htmlFor="conPass">Confirm Password</label>
                            <Input.Password value={conPass} type="password" id="conPass" onChange={(e) => setConPass(e.target.value)} required/>
                        </div>
                        <input type="submit" className="primary-btn-blue1" value="Change password" />
                    </form>
                )}
                
            </div>
        </div>
    );
}
