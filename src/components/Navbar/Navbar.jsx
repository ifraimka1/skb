import { Link } from 'react-router-dom';

import logo from '../../assets/scb.svg'
import './Navbar.scss';

function Navbar() {
    return (
        <div className="navbar">
            <div className="logo-container">
                <img src={logo} className="logo" alt="SCB logo"/>
            </div>
            <div className="bar">
                <Link to={`/`}>
                    ГЛАВНАЯ
                </Link>
                <Link to={`/aboutus`}>
                    О НАС
                </Link>
                <Link to={`/labs`}>
                    ЛАБОРАТОРИИ
                </Link>
                <Link to={`/projects`}>
                    ПРОЕКТЫ
                </Link>
                <Link to={`/contact`}>
                    КОНТАКТЫ
                </Link>
                <a href="https://ictis.sfedu.ru">
                    ИКТИБ
                </a>
            </div>
        </div>
    );
}

export default Navbar;