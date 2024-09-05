import React, { useState, useRef } from 'react';
import './_Dropdown.scss';
import useClickOutside from '../../hooks/useClickOutside';

export default function Dropdown({dropdownLabel ,dropdownStyle, buttonStyle , children}) {
    
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useClickOutside(dropdownRef , setIsOpen)

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="dropdown-button" style={buttonStyle}>
                {dropdownLabel}
            </button>
            {isOpen && (
                <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} style={dropdownStyle}>
                    {children}
                </div>
            )}
        </div>
    );
}
