import React, { useEffect } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import '../../assets/css/clientContactUs.css'; // Ensure you have the CSS for styling

export default function ClientContactUs() {
  const { user } = useStateContext();

  // Debugging: Log user context to check if user is undefined or null
  useEffect(() => {
    if (user) {
      console.log('User is logged in:', user);
    } else {
      console.log('No user found, treating as guest.');
    }
  }, [user]);

  return (
    <div className="page">
      <header className="contact-header">
        <h1>Contact Us + Feedback</h1>
        {/* Conditionally show whether the user is logged in (client) or guest */}
        {user ? (
          <p>Welcome, {user.name || 'Client'}! Feel free to contact us or leave feedback.</p>
        ) : (
          <p>Welcome, Guest! You can contact us or leave feedback below.</p>
        )}
      </header>
      
      <div className="contact-content">
        <div className="contact-box">
          <div className="contact-icon">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <h2>Address</h2>
          <p>Weifield Group Contracting</p>
          <p>6950 S. Jordan Road</p>
          <p>Centennial, CO 80112</p>
          <p>Northern Division Office</p>
          <p>1270 Automation Drive, Windsor, CO 80550</p>
          <p>Wyoming Office</p>
          <p>308 Southwest Dr., Cheyenne, WY 82007</p>
        </div>

        <div className="contact-box">
          <div className="contact-icon">
            <i className="fas fa-phone"></i>
          </div>
          <h2>Phone</h2>
          <p>Weifield Group Contracting</p>
          <p>303.428.2011 phone</p>
          <p>303.202.0466 facsimile</p>
          <p>Weifield 24/7 Service Department</p>
          <p>(Then press 2 for emergency calls)</p>
          <p>Northern Division Office</p>
          <p>303.428.2011 phone</p>
          <p>Wyoming Office</p>
          <p>307.757.7967 phone</p>
        </div>

        <div className="contact-box">
          <div className="contact-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <h2>Email</h2>
          <p>Request for Proposal</p>
          <p>Info@weifieldgroup.com</p>
          <p>All Bid Opportunities</p>
          <p>estimating@weifieldgroup.com</p>
          <p>Electrical Service Calls</p>
          <p>service@weifieldcontracting.com</p>
          <p>Employment Opportunities</p>
          <p>careers@weifieldcontracting.com</p>
        </div>
      </div>

      <div className="feedback-section">
        <h2>We Value Your Feedback!</h2>
        <p>If you have any comments or suggestions, please share them with us:</p>
        <form className="feedback-form">
          <textarea
            className="feedback-input"
            placeholder="Enter your feedback here..."
            rows="5"
          ></textarea>
          <button type="submit" className="feedback-submit">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
