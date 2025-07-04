import { useState, useEffect } from "react";
import NavbarLink from "./NavbarLink";
import { useLocation } from "react-router-dom";

import logo from "@/shared/assets/images/sсb_blue.svg";
import "./Navbar.styles.scss";

// Тип для ссылок
interface LinkType {
  text: string;
  to: string;
  newTab?: boolean; // Опциональное поле для открытия ссылки в новой вкладке
  onClick?: () => void; // Опциональное поле для обработчика клика
}

// Тип для пропсов компонента Navbar
interface NavbarProps {
  links?: LinkType[];
}

const mock: LinkType[] = [
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

function Navbar({ links = mock }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const THRESHOLD = 400;
  const [isTransparent, setIsTransparent] = useState(true);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // Сбрасываем состояние при изменении маршрута
    setIsOpen(false);
    setNavbarHidden(false);
    setLastScrollTop(0);
    
    // Проверяем, нужно ли делать navbar прозрачным
    const shouldBeTransparent = location.pathname === "/" && window.pageYOffset <= 50;
    setIsTransparent(shouldBeTransparent);
  }, [location]);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      navbar.classList.toggle("hidden", navbarHidden && !isOpen);
    }
  }, [navbarHidden, isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset;

      if (!isOpen) {
        if (currentScrollTop <= THRESHOLD) {
          setNavbarHidden(false);
        } else {
          setNavbarHidden(currentScrollTop > lastScrollTop);
        }
      }

      // Обновляем прозрачность для главной страницы
      if (location.pathname === "/") {
        setIsTransparent(currentScrollTop <= 50);
      }

      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop, isOpen, location.pathname]);


  return (
    <div
      id="navbar"
      className={`${isTransparent ? "transparent" : ""} ${navbarHidden ? "hidden" : ""
        }`}
    >

      <NavbarLink className="logo-container" link={{ to: "/" }}>
        <img src={logo} className="logo" alt="SCB logo" />
      </NavbarLink>
      <div className="burger" onClick={toggleMenu}>
        <span className={`line ${isOpen ? "open" : ""}`}></span>
        <span className={`line ${isOpen ? "open" : ""}`}></span>
        <span className={`line ${isOpen ? "open" : ""}`}></span>
      </div>
      <div className={`bar ${isOpen ? "open" : ""}`}>
        {links.map((link, index) => (
          <NavbarLink
            link={{ ...link, onClick: handleLinkClick }}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Navbar;
