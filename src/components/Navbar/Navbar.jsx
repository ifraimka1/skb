import NavbarLink from './NavbarLink';

import { scb_blue as logo } from '../../assets/images';
import './Navbar.styles.scss';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const mock = [
    {
        text: "НОВОСТИ",
        to: "/news",
    },
    {
        text: "О НАС",
        to: "/aboutus",
    },
    {
        text: "ЛАБОРАТОРИИ",
        to: "/labs",
    },
    {
        text: "ПРОЕКТЫ",
        to: "/projects",
    },
    {
        text: "КОНТАКТЫ",
        to: "/contact",
    },
    {
        text: "ИКТИБ",
        to: "https://ictis.sfedu.ru",
        newTab: true,
    },
];

function Navbar({ links = mock }) {
    const [isOpen, setIsOpen] = useState(false);

    const [navbarHidden, setNavbarHidden] = useState(false); // true = спрятан, false = виден
    const [lastScrollTop, setLastScrollTop] = useState(0); 
    const THRESHOLD = 400; // navbar не скрывается в первые 400px

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false); // Закрываем меню при клике на ссылку
    };

    // Для навбара
    useEffect(() => {
        const navbar = document.getElementById('navbar');
        if (navbarHidden && !isOpen) {
            if (navbar) {
                navbar.classList.add('hidden');
            }
        } else {
            if (navbar) {
                navbar.classList.remove('hidden');
            }
        }
    }, [navbarHidden]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset;

            if (currentScrollTop <= THRESHOLD) {
                setNavbarHidden(false);
            } else {
                if (currentScrollTop > lastScrollTop) {
                    setNavbarHidden(true);
                } else {
                    setNavbarHidden(false);
                }
            }

            setLastScrollTop(currentScrollTop);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollTop]);

    return (
        <div id="navbar">
            <NavbarLink className="logo-container" link={{ to: "/" }} >
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