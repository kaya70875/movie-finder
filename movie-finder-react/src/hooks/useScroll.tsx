import { useEffect, useState } from "react";

//Scroll Position For Disabled Option.
//Scroll Container Ref For Container That Going to Scroll

const useScroll = (scrollRef : React.RefObject<HTMLDivElement>) => {
    const [scrollPosition , setScrollPosition] = useState(0);

    const scrollContainer = (direction : string) => {
        const container = scrollRef.current;
        const scrollAmount = direction === 'left' ? -900 : 900;
        container?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };
    
    useEffect(() => {
        const container = scrollRef.current;
        const handleScroll = () => {
            if(container) {
                setScrollPosition(container.scrollLeft);
            }
        }

        container?.addEventListener('scroll' , handleScroll);
        return () => {
            container?.removeEventListener('scroll', handleScroll);
        }

    }, []);

    return {scrollContainer , scrollPosition}
}

export default useScroll;
   
    