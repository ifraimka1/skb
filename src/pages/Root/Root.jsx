import { Outlet } from "react-router-dom";
import { createContext, useEffect, useState } from 'react';

import useElementOnScreen from '../../lib/useElementOnScreen';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Root.styles.scss';

import { up } from '../../assets/images';

export const RootContext = createContext();

function Root() {
    const [setRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0.6,
    });

    const [isVisible_, setIsVisible] = useState(false); // Состояние для видимости кнопки
    const [hasScrolled, setHasScrolled] = useState(false); // Новый флаг для отслеживания прокрутки

    useEffect(() => {
        const navbar = document.getElementById('navbar');
        if (isVisible) {
            navbar.classList.add('transparent');
        } else {
            navbar.classList.remove('transparent');
        }
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, 100); // Небольшая задержка, чтобы избежать мерцания
        const handleScroll = () => {
            const headerHeight = document.getElementById('mainpageheader')?.offsetHeight || 0;
            if (window.scrollY > headerHeight && !hasScrolled) {
                setHasScrolled(true); // Обновим флаг, когда пользователь прокрутит страницу
            }
            setIsVisible(window.scrollY > headerHeight); // Показываем кнопку
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isVisible, hasScrolled]);

    // Ускоренный плавный скролл вверх
    const scrollToTop = () => {
        const startPosition = window.scrollY;
        const startTime = performance.now();
        const scrollDuration = 800; // Увеличили время для суперплавности
    
        // Функция плавного ускорения и замедления (easeInOutCubic)
        const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    
        const animateScroll = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / scrollDuration, 1); // От 0 до 1
    
            window.scrollTo(0, startPosition * (1 - easeInOutCubic(progress))); // Гладкий скролл
    
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };
    
        requestAnimationFrame(animateScroll);
    };


    return (
        <RootContext.Provider value={{ setRef }}>
            <Navbar />
            <div id="react-page">
                <Outlet />
            </div>
            <Footer />
            {hasScrolled && (
                <button
                    className={`scroll-to-top ${isVisible_ ? 'visible' : 'hidden'}`}
                    onClick={scrollToTop}
                >
                    <img src={up} alt="Scroll to top" />
                </button>
            )}
        </RootContext.Provider>
    );
}

export default Root;