// src/components/CustomToolbar.jsx
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
        <div className="custom-toolbar">
            <button onClick={goToBack} className="toolbar-button">Previous</button>
            <span className="toolbar-label">{label}</span>
            <button onClick={goToNext} className="toolbar-button">Next</button>
        </div>
    );
};

CustomToolbar.propTypes = {
    label: PropTypes.string.isRequired,
    onNavigate: PropTypes.func.isRequired,
};

export default CustomToolbar;
