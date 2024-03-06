import NavbarLink from './NavbarLink';

import { scb as logo } from '../../assets/images';
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
        <div id="navbar">
            <NavbarLink className="logo-container" link={{ to: "/" }} >
                <img src={logo} className="logo" alt="SCB logo" />
            </NavbarLink>
            <div className="bar">
                {links.map(link => <NavbarLink link={link} />)}
            </div>
        </div>
    );
}

export default Navbar;