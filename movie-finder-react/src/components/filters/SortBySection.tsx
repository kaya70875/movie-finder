interface Props {
    items: { label: string; value: string }[];
    onSelect: (value: string) => void;
    selectedItems: string[];
  }

export default function SortBySection({items = [], onSelect, selectedItems} : Props) {
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
