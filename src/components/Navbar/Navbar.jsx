import NavbarLink from './NavbarLink';
import { scb_blue as logo } from '../../assets/images';
import './Navbar.styles.scss';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

const mock = [
    { text: "НОВОСТИ", to: "/news" },
    { text: "О НАС", to: "/aboutus" },
    { text: "ЛАБОРАТОРИИ", to: "/labs" },
    { text: "ПРОЕКТЫ", to: "/projects" },
    { text: "КОНТАКТЫ", to: "/contact" },
    { text: "ИКТИБ", to: "https://ictis.sfedu.ru", newTab: true },
];

function Navbar({ links = mock }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isTransparent, setIsTransparent] = useState(true); // Navbar начально прозрачный
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [scrolledOnce, setScrolledOnce] = useState(false); // Флаг для первого скролла
    const THRESHOLD = 400; // Порог для скрытия Navbar при скролле вниз
    const location = useLocation(); // Для отслеживания текущего пути

    const toggleMenu = () => setIsOpen(!isOpen);
    const handleLinkClick = () => setIsOpen(false);

    // При изменении маршрута обновляем прозрачность Navbar
    useEffect(() => {
        if (location.pathname === '/') {
            setIsTransparent(true);
            window.scrollTo(0, 0);
        } else {
            setIsTransparent(false);
        }
        setScrolledOnce(false);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset;

            // Логика скрытия Navbar при скролле вниз
            if (currentScrollTop <= THRESHOLD) {
                setIsHidden(false); // Navbar видим, если скролл маленький
            } else {
                if (currentScrollTop > lastScrollTop) {
                    setIsHidden(true); // Скрыть Navbar при скролле вниз
                } else {
                    setIsHidden(false); // Показать Navbar при скролле вверх
                }
            }

            // Прозрачность только при первом скролле на главной странице
            if (location.pathname === "/" && !scrolledOnce && currentScrollTop > 50) {
                setIsTransparent(false);
                setScrolledOnce(true);
            }

            setLastScrollTop(currentScrollTop);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollTop, scrolledOnce, location.pathname]);

    // Обработчик события при возвращении на главную (при использовании кнопки "назад")
    useEffect(() => {
        const handlePopState = () => {
            if (location.pathname === '/') {
                setIsTransparent(true);
                // Прокручиваем страницу вверх при возврате на главную
                window.scrollTo(0, 0);
            } else {
                setIsTransparent(false);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [location]);

    return (
        <div id="navbar" className={`${isTransparent ? "transparent" : ""} ${isHidden ? "hidden" : ""}`}>
            <NavbarLink className="logo-container" link={{
                to: "/",
                onClick: () => {
                    window.scrollTo(0, 0);
                }
            }}>
                <img src={logo} className="logo" alt="SCB logo" />
            </NavbarLink>
            <div className="burger" onClick={toggleMenu}>
                <span className={`line ${isOpen ? 'open' : ''}`}></span>
                <span className={`line ${isOpen ? 'open' : ''}`}></span>
                <span className={`line ${isOpen ? 'open' : ''}`}></span>
            </div>
            <div className={`bar ${isOpen ? 'open' : ''}`}>
                {links.map((link, index) => (
                    <NavbarLink link={{ ...link, onClick: handleLinkClick }} key={index} />
                ))}
            </div>
        </div>
    );
}

export default Navbar;
