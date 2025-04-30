import { useEffect } from 'react';

type ResizeHandler = (parent: HTMLElement, childHeight: number) => void;

interface UseResizeObserverConfig {
    parentSelector: string;
    childSelector?: string;
    onResize?: ResizeHandler;
}

export const useResizeObserver = ({
    parentSelector,
    childSelector = 'blockquote',
    onResize = (parent, height) => {
        parent.style.marginBottom = `calc(${height}px + 2em)`;
    }
}: UseResizeObserverConfig) => {
    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                const parent = entry.target as HTMLElement;
                const child = parent.querySelector(childSelector) as HTMLElement | null;

                if (child) {
                    const childHeight = child.offsetHeight;
                    onResize(parent, childHeight);
                }
            });
        });

        const elements = document.querySelectorAll(parentSelector);
        const elementsArray = Array.from(elements) as HTMLElement[];

        elementsArray.forEach(element => resizeObserver.observe(element));

        return () => {
            elementsArray.forEach(element => resizeObserver.unobserve(element));
            resizeObserver.disconnect();
        };
    }, [parentSelector, childSelector, onResize]);
};