import { useEffect } from 'react';

type ResizeHandler = (parent: HTMLElement, childHeight: number) => void;

interface UseResizeObserverConfig {
    parentSelector: string;
    childSelector: string;
    margin?: string;
    onResize?: ResizeHandler;
}

// Хук, отслеживающий фактическую высоту дочернего элемента, и назначающий эту высоту родительскому
// Для случаев с position: absolute, когда высота дочерки "выпадает"
export const useResizeObserver = ({
    parentSelector,
    childSelector,
    margin = '2em',
    onResize = (parent, height) => {
        parent.style.height = `calc(${height}px + ${margin})`;
    }
}: UseResizeObserverConfig) => {
    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                const child = entry.target as HTMLElement;
                const parent = child.closest(parentSelector) as HTMLElement | null;

                if (parent) {
                    requestAnimationFrame(() => {
                        onResize(parent, child.offsetHeight);
                    });
                }
            });
        });

        const mutationObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && (node as Element).matches(parentSelector)) {
                        resizeObserver.observe(node as HTMLElement);
                    }
                });
            });
        });

        const container = document.querySelector('.content') as HTMLElement;
        if (container) {
            mutationObserver.observe(container, { childList: true });
        }

        const elements = document.querySelectorAll(childSelector);
        const elementsArray = Array.from(elements) as HTMLElement[];

        elementsArray.forEach(element => resizeObserver.observe(element));

        return () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, [parentSelector, childSelector, onResize]);
};