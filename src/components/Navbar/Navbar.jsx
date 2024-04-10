import { scb as logo } from '../../assets/images';
import { NavLink } from "react-router-dom";
import NavbarLink from './NavbarLink';
import './Navbar.styles.scss';

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
    return (
        <div className="navbar">
            <NavbarLink link={{ to: "/" }} >
                <div className="logo-container">
                    <img src={logo} className="logo" alt="SCB logo" />
                </div>
            </NavbarLink>
            <div className="bar">
                {links.map((link, index) => <NavbarLink link={link} key={index} />)}
            </div>
        </div>
    );
}

export default Navbar;