import { Outlet } from "react-router-dom";
import { createContext, useEffect, useState } from 'react';

import useElementOnScreen from '../../lib/useElementOnScreen';
import ScrollToTop from "../../lib/scrollToTop";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Root.styles.scss';

import { up } from '../../assets/images';

export const RootContext = createContext();

function Root() {
    const [setRef, isTargetVisible] = useElementOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0.9,
    });

    const [isOnTopVisible, setIsOnTopVisible] = useState(false); // Состояние для видимости кнопки
    const [hasScrolled, setHasScrolled] = useState(false); // Новый флаг для отслеживания прокрутки

    // Для навбара
    useEffect(() => {
        const navbar = document.getElementById('navbar');
        if (isTargetVisible) {
            if (navbar) {
                navbar.classList.add('transparent');
            }
        } else {
            if (navbar) {
                navbar.classList.remove('transparent');
            }
        }
    }, [isTargetVisible]);

    // Для кнопки OnTop
    useEffect(() => {
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, 100); // Небольшая задержка, чтобы избежать мерцания
        const handleScroll = () => {
            const headerHeight = document.getElementById('mainpageheader')?.offsetHeight || 0;
            if (window.scrollY > headerHeight && !hasScrolled) {
                setHasScrolled(true);
            }
            setIsOnTopVisible(window.scrollY > headerHeight); // Показываем кнопку
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasScrolled])

    // Ускоренный плавный скролл вверх
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <RootContext.Provider value={{ setRef }}>
            <ScrollToTop />
            <Navbar />
            <div id="react-page">
                <Outlet />
            </div>
            <Footer />
            {hasScrolled && (
                <button
                    className={`scroll-to-top ${isOnTopVisible ? 'visible' : 'hidden'}`}
                    onClick={scrollToTop}
                >
                    <img src={up} alt="Scroll to top" />
                </button>
            )}
        </RootContext.Provider>
    );
}

export default Root;