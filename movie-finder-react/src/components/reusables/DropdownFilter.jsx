import React from 'react';
import Dropdown from '../reusables/Dropdown';

export default function DropdownFilter({ label, items = [], onSelect, selectedItems }) {
    return (
        <Dropdown 
            dropdownLabel={label}
            buttonStyle={{
                border: 'none', 
                background: 'none', 
                fontSize: '1rem', 
                color: 'var(--primary-font-color)'
            }} 
            dropdownStyle={{
                width: '200px',
                height : '300px',
                backgroundColor: 'var(--main-background)', 
                left: '-75px'
            }}
        >
            <div className="profile-list-items">
                <h3>{label}</h3>
                <ul>
                    {items.map(item => (
                        <li 
                            key={item.value}
                            className={selectedItems.includes(item.value) ? 'active' : ''}
                            onClick={() => {
                                onSelect(item.value)
                            }}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>  
        </Dropdown>
    );
}
