import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import "../../assets/css/app.css";
import "../../assets/css/index.css";
import "../../assets/css/button.css";

export default function ClientIndex() {
    const {setActiveNavLink} = useOutletContext();



    /**
     * Onmount
     */
    useEffect(() => {
        setActiveNavLink("Home");
    }, []);



    /**
     * Render
     */
    return(
        <div className = "conten1">
            <div className= "index guest-index">
                <div className= "banner" >
                    <img src="/assets/media/pictures/dog.png" className="dog"/>
                    <div className = "banner-text">
                        <div className = "small1 anybody">Keepin' their furry tails waggin' at</div>
                        <div className = "big-f bold anybody">Arevalo's Animal Clinic</div>
                    </div>
                </div>

                <section className="details-sec">
                    <section className="small-form bottom-margin-s">
                        <div className="bold anybody semi-big-f bottom-margin-s">Why Choose Arevalo's Animal Clinic?</div>
                        <div className="features">
                            <div className="feature-item">
                                <img src="/assets/media/items/vets.jpg" alt="Experienced Vets" />
                                <p className="inter">Experienced veterinarians providing top-notch care.</p>
                            </div>
                            <div className="feature-item">
                                <img src="/assets/media/items/facility.jpg" alt="State-of-the-Art Facilities" />
                                <p className="inter">State-of-the-art facilities for comprehensive pet care.</p>
                            </div>
                        </div>
                    </section>

                    <section className="small-form bottom-margin">
                        <div className="bold anybody semi-big-f bottom-margin-s">Our Services</div>
                        <div className="service-grid">
                            <div className="service-card">
                                <img src="/assets/media/items/vaccine.jpg" alt="Vaccinations" />
                                <h3 className="anybody semi-medium-f">Vaccinations</h3>
                                <p className="inter">Keep your pets protected with our vaccine services.</p>
                            </div>
                        </div>
                    </section>

                    <section className="testimonials ">
                        <h2 className="anybody semi-medium-f">What Our Clients Say</h2>
                        <div className="testimonial-carousel">
                            <div className="testimonial">
                                <p className="inter">"Great care and love for our dog!" - Client Name</p>
                            </div>
                        </div>
                    </section>

                    <section className="cta">
                        <button className="cta-button primary-btn-blue1">Book an Appointment Now</button>
                    </section>
                </section>

            </div>
        </div>
        
    );
}

