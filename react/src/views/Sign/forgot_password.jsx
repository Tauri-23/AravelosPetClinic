import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/sign.css";
import "../../assets/css/app.css";

export default function ForgotPassword() {
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUpClick = () => {
      setIsSignUp(true);
    };

    const handleSignInClick = () => {
      setIsSignUp(false);
    };

    return (
      <div className="signin-child">
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
          <div className={`form-container sign-up-container ${isSignUp ? 'active' : ''}`}>
            <form action="#">
              <h1 style={{ marginBottom: '20px' }}>Create Account</h1>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <div className={`form-container sign-in-container ${!isSignUp ? 'active' : ''}`}>
            <form action="#">
              <h1 style={{ marginBottom: '20px' }}>Sign In</h1>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <Link to='/ForgotPassword'>Forgot your password?</Link>
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" onClick={handleSignInClick}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h3>Don't have an account?</h3>
                <p>Sign up now to ensure your pet receives the best care at Arevalo's Animal Clinic!</p>
                <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
