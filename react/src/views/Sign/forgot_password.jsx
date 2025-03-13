import { useRef, useState } from "react";
import "../../assets/css/sign.css";
import "../../assets/css/app.css";
import { notify } from "../../assets/js/utils";
import axiosClient from "../../axios-client";

export default function ForgotPassword() {
    const [isEmailOTPSent, setEmailOTPSent] = useState(false);
    const [isOTPApproved, setOTPApproved] = useState(false);


    /**
     * Render
     */
    const emailRef = useRef(null);
    const otpRef = useRef(null);
    const newPassRef = useRef(null);
    const conPassRef = useRef(null);



    /**
     * handlers
     */
    const handleSendEmailVerification = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", emailRef.current.value);
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
        setOTPApproved(true);
    }

    const handleChangePass = (e) => {
        e.preventDefault();

        if(newPassRef.current.value !== conPassRef.current.value) {
            notify("error", "Passwords doesn't match", "top-center", 3000);
            return;
        }

        const formData = new FormData();
        formData.append("newPass", newPassRef.current.value);

        axiosClient.post('', formData)
        .then(({data}) => {
            if(data.status === 200) {
                notify("success", data.message, "top-center", 3000);
                
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
                    <form onSubmit={handleSendEmailVerification}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input ref={emailRef} type="email" id="email" required/>
                        </div>
                        <input type="submit" className="primary-btn-blue1" value="Send Verification" />
                    </form>
                )}

                {/* OTP Input form */}
                {(isEmailOTPSent && !isOTPApproved) && (
                    <form onSubmit={handleVerifyOTP}>
                        <div>
                            <label htmlFor="otp">6-Digit OTP</label>
                            <input ref={otpRef} type="text" id="otp" maxLength={6} required/>
                        </div>
                        <input type="submit" className="primary-btn-blue1" value="Verify" />
                    </form>
                )}

                {/* Change Password */}
                {(isEmailOTPSent && isOTPApproved) && (
                    <form onSubmit={handleChangePass}>
                        <div>
                            <label htmlFor="newPass">New Password</label>
                            <input ref={newPassRef} type="password" id="newPass" required/>
                        </div>
                        <div>
                            <label htmlFor="conPass">Confirm Password</label>
                            <input ref={conPassRef} type="password" id="conPass" required/>
                        </div>
                        <input type="submit" className="primary-btn-blue1" value="Change password" />
                    </form>
                )}
                
            </div>
        </div>
    );
}
