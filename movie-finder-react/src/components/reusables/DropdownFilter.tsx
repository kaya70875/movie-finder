import Dropdown from './Dropdown';

interface DropdownFilterProps {
    label : string | any;
    items : {
        label : string | number;
        value : number;
    }[];
    onSelect : (arg : number) => void;
    selectedItems : (string | number)[] | null;
}

export default function DropdownFilter({ label, items = [{value: 0, label: ''}], onSelect, selectedItems }: DropdownFilterProps) {

    const isMobile = window.matchMedia('(max-width : 450px)').matches;

    const dropdownStyle = {
      width : isMobile ? '120px' : '200px',
      height : isMobile ? '180px' : '300px',
      left : isMobile ? '-35px' : '-60px',
    }

    return (
        <Dropdown 
            dropdownLabel={label}
            buttonStyle={{
                border: 'none', 
                background: 'none', 
                fontSize: '1rem', 
            }} 
            dropdownStyle={dropdownStyle}
        >
            <div className="profile-list-items">
                <h3>{label}</h3>
                <ul>
                    {items.map(item => (
                        <li 
                            key={item.value}
                            className={selectedItems?.includes(item.value) ? 'active' : ''}
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