import React, { useState, useRef, CSSProperties } from 'react';
import './_Dropdown.scss';
import useClickOutside from '../../hooks/useClickOutside';

interface DropdownProps {
    dropdownLabel : string;
    dropdownStyle? : CSSProperties;
    buttonStyle? : CSSProperties;
    children? : React.ReactNode
}

export default function Dropdown({dropdownLabel ,dropdownStyle, buttonStyle , children} : DropdownProps) {
    
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useClickOutside(dropdownRef , setIsOpen);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="dropdown-button" style={buttonStyle}>
                {dropdownLabel}
            </button>
            <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} style={dropdownStyle}>
                {children}
            </div>
        </div>
    );
}
