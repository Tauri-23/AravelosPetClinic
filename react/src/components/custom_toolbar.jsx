// src/components/CustomToolbar.jsx
import "../assets/css/calendar.css";
import "../assets/css/custom_toolbar.css";
import React from 'react';
import PropTypes from 'prop-types';


const CustomToolbar = ({ label, onNavigate }) => {
    const goToBack = () => {
        onNavigate('PREV');
    };

    const goToNext = () => {
        onNavigate('NEXT');
    };

    const goToToday = () => {
        onNavigate('TODAY');
    };

    return (
        <div className="custom-toolbar d-flex justify-content-center bottom-margin-s">
            <img src="/assets/media/icons/arrow_left.svg" className="toolbar-button arrows right-margin" alt="logo" onClick={goToBack}/>
            <span className="toolbar-label anybody bold">{label}</span>
            <img src="/assets/media/icons/arrow_right.svg" className="toolbar-button arrows left-margin" alt="logo" onClick={goToNext}/>

        </div>
    );
};

CustomToolbar.propTypes = {
    label: PropTypes.string.isRequired,
    onNavigate: PropTypes.func.isRequired,
};

export default CustomToolbar;
