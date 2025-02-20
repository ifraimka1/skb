import NavbarLink from './NavbarLink';

import { scb as logo, scb_blue as logo_02 } from '../../assets/images';
import './Navbar.styles.scss';

import React, { useState, useEffect } from 'react'; //
import 'bootstrap/dist/css/bootstrap.min.css'; //

import { useLocation } from 'react-router-dom';  // Импортируем useLocation

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
    const location = useLocation();  // Получаем текущий путь
    const [logoToDisplay, setLogoToDisplay] = useState(logo); // Используем useState для хранения логотипа
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false); // Закрываем меню при клике на ссылку
    };

    useEffect(() => {
        // Обновляем логотип в зависимости от текущего пути
        setLogoToDisplay(location.pathname === "/" ? logo : logo_02);
    }, [location]);  // Каждый раз, когда путь изменяется, выполняется этот код

    return (
        <div id="navbar">
            <NavbarLink className="logo-container" link={{ to: "/" }} >
                <img src={logoToDisplay} className="logo" alt="SCB logo" />
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