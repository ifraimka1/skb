import { useState, useEffect } from "react";
import NavbarLink from "./NavbarLink";

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
    const navbar = document.getElementById("navbar");
    if (navbarHidden && !isOpen && navbar) {
      navbar.classList.add("hidden");
    } else if (navbar) {
      navbar.classList.remove("hidden");
    }
  }, [navbarHidden, isOpen]);

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
