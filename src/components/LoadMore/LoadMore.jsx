import { useState } from "react";

function LoadMore({list, setter, loader, count, setFull}) {
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadMore = async () => {
        setIsLoading(true);
        const newPart = await loader(count, list.length);
        const newList = [...list, ...newPart];
        setter(newList);
        setIsLoading(false);

        if (newPart.length < count) {
            setFull(true);
        }
    }
    
    return (
        <button className="btn" onClick={handleLoadMore} disabled={isLoading} > 
            Показать еще
        </button>
    );
}

export default LoadMore;