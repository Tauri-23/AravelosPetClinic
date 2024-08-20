import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/sign.css";
import "../../assets/css/app.css";

export default function ForgotPassword() {
    return (
      <div className="signin-child forgot-child">
        <div className='container' id="container">
            <h1 style={{marginBottom:'15px'}}>Forgot your password?</h1>

            <p>Enter the email address associated to your account and we'll send you a One-Time Password (OTP) to confirm your request to change your password.</p>
        </div>
      </div>
    );
  }
