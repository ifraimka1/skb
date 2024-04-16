import { useEffect, useState } from "react";

const useElementOnScreen = (options) => {
    
    const [ref, setRef] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    
    const observerCallback = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, options);

        if (ref) {
            observer.observe(ref);
        }

        return () => {
            if (ref) {
                observer.unobserve(ref);
            }
        }
    }, [ref, options]);

    return [setRef, isVisible];
}

export default useElementOnScreen;