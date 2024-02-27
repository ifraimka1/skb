import { scb as logo } from '../../images';
import NavbarLink from './NavbarLink';
import './Navbar.styles.scss';

const mock = [
    {
        text: "НОВОСТИ",
        to: "/",
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
            <div className="logo-container">
                <img src={logo} className="logo" alt="SCB logo"/>
            </div>
            <div className="bar">
                { links.map(link => <NavbarLink link={ link } />) }
            </div>
        </div>
    );
}

export default Navbar;