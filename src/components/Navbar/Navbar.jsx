import NavbarLink from './NavbarLink';
import { scb_blue as logo } from '../../assets/images';
import './Navbar.styles.scss';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom'; // Для отслеживания изменения пути

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
    const [isTransparent, setIsTransparent] = useState(true); // Начально navbar прозрачный
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [scrolledOnce, setScrolledOnce] = useState(false);
    const THRESHOLD = 400; // navbar не скрывается в первые 400px

    const location = useLocation(); // Получаем текущий путь

    const toggleMenu = () => setIsOpen(!isOpen);
    const handleLinkClick = () => setIsOpen(false);

    useEffect(() => {
        if (location.pathname === '/') {
            setIsTransparent(true); // На главной странице прозрачный
        } else {
            setIsTransparent(false); // На других страницах непрозрачный
        }
        setScrolledOnce(false);
    }, [location]);

    useEffect(() => {
        const navbar = document.getElementById('navbar');
        if (isHidden && !isOpen) {
            navbar?.classList.add('hidden');
        } else {
            navbar?.classList.remove('hidden');
        }
    }, [isHidden]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset;

            if (currentScrollTop <= THRESHOLD) {
                setIsHidden(false);
            } else {
                if (currentScrollTop > lastScrollTop) {
                    setIsHidden(true);
                } else {
                    setIsHidden(false);
                }
            }

            // прозрачность только при первом скролле
            if (!scrolledOnce && currentScrollTop > 50) {
                setIsTransparent(false); // Сделать navbar непрозрачным после первого скролла
                setScrolledOnce(true); // Устанавливаем флаг, чтобы прозрачность больше не менялась
            }

            setLastScrollTop(currentScrollTop);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollTop, scrolledOnce]);

    // Обработчик события для кнопки "назад" (popstate)
    useEffect(() => {
        const handlePopState = () => {
            if (location.pathname === '/') {
                setIsTransparent(true); // Возвращаем прозрачность
            } else {
                setIsTransparent(false);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [location]);

    return (
        <div id="navbar" className={isTransparent ? "transparent" : ""}>
            <NavbarLink className="logo-container" link={{ to: "/" }}>
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
