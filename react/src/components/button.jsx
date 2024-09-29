import React from 'react';
import PropTypes from 'prop-types';
import "../assets/css/button.css";


const Button = ({ label, onClick, type = 'button', disabled = false, className = '', style = {} }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`custom-button ${className}`} // Add a base class and any additional class
            style={style}
        >
            {label}
        </button>
    );
};

// Prop types for validation
Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
};

export default Button;
