import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import "../assets/css/custom_toolbar.css";
// Other imports ...

const CustomToolbar = ({ label, onNavigate, onViewChange }) => {
    const location = useLocation(); // Get the current location

    const goToBack = () => {
        onNavigate('PREV');
    };

    const goToNext = () => {
        onNavigate('NEXT');
    };

    const goToToday = () => {
        onNavigate('TODAY');
    };

    const changeView = (view) => {
        onViewChange(view); // Call the function passed via props to change the view
    };

    return (
        <>
                {location.pathname.includes("AdminIndex") ? (
                    <div className="custom-toolbar d-flex bottom-margin-s">
                        <div className="views-container">
                            <button onClick={() => changeView('month')} className="anybody view-button">Month</button>
                            <button onClick={() => changeView('week')} className="anybody view-button">Week</button>
                            <button onClick={() => changeView('day')} className="anybody view-button">Day</button>
                        </div>
                        <div className="main-toolbar">
                            <img src="/assets/media/icons/arrow_left.svg" className="toolbar-button arrows right-margin" alt="logo" onClick={goToBack} />
                            <span className="toolbar-label anybody bold">{label}</span>
                            <img src="/assets/media/icons/arrow_right.svg" className="toolbar-button arrows left-margin" alt="logo" onClick={goToNext} />
                        </div>
                    </div>
                ): (

                    <div className="custom-toolbar d-flex justify-content-center bottom-margin-s">
                        <div className="main-toolbar">
                            <img src="/assets/media/icons/arrow_left.svg" className="toolbar-button arrows right-margin" alt="logo" onClick={goToBack} />
                            <span className="toolbar-label anybody bold">{label}</span>
                            <img src="/assets/media/icons/arrow_right.svg" className="toolbar-button arrows left-margin" alt="logo" onClick={goToNext} />
                        </div>
                    </div>
                )}
        </>
    );
};

CustomToolbar.propTypes = {
    label: PropTypes.string.isRequired,
    onNavigate: PropTypes.func.isRequired,
    onViewChange: PropTypes.func.isRequired, // Make onViewChange a required prop
};

export default CustomToolbar;
