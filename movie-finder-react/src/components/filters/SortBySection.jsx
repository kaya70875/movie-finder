import React from 'react'

export default function SortBySection({items = [], onSelect, selectedItems}) {
  return (
    <div className="sortby__section">
        {items.map(item => (
            <button
            key={item.value}
            className={selectedItems.includes(item.value) ? 'active' : ''}
            onClick={() => onSelect(item.value)}
            >{item.label}</button>
        ))}
    </div>
  )
}
