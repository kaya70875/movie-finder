import { useEffect } from 'react';

function useClickOutside(ref : React.RefObject<HTMLElement> , callback : (isOpen : boolean) => void) {
    useEffect(() => {
        function handleClickOutside(event : MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
}

export default useClickOutside;
