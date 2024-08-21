import React, { useState, useRef, useEffect } from 'react';
import './_Dropdown.scss';

export default function Dropdown({dropdownLabel ,dropdownStyle, buttonStyle , children}) {
    
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="dropdown-button" style={buttonStyle}>
                {dropdownLabel}
            </button>
            {isOpen && (
                <div className="dropdown-menu" style={dropdownStyle}>
                    {children}
                </div>
            )}
        </div>
    );
}
