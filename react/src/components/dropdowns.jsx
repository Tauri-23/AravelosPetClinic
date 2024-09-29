// src/components/Dropdown.jsx

import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "../assets/css/dropdown.css";

export default function Dropdown({ label, options, name, onChange, placeholder }) {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelected(option.label);
    setIsActive(false);
    onChange(name, option.id);
  };

  return (
    <div className="dropdown-container bottom-margin-s">
      {label && <span className="choose semi-bold">{label}</span>}

      <div
        className={`dropdown ${isActive ? "active" : ""}`}
        ref={dropdownRef}
      >
        <div className="select" onClick={toggleDropdown}>
          <span>{selected || placeholder}</span>
          <i className="fa fa-chevron-left"></i>
        </div>
        <input type="hidden" name={name} value={selected} />
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Unique identifier
      label: PropTypes.string.isRequired, // Display text
    })
  ).isRequired,
  name: PropTypes.string.isRequired, // Name attribute for the hidden input
  onChange: PropTypes.func.isRequired, // Callback when selection changes
  placeholder: PropTypes.string, // Placeholder text
};

Dropdown.defaultProps = {
  placeholder: "Select an option",
};

;
