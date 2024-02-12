import './header.scss';
import logo from '../../assets/scb.svg'

function Header() {

    return (
        <div className="header">
            <div className="logo-container">
                <img src={logo} className="logo" alt="SCB logo"/>
            </div>
            <div className="bar">
                <a href="">
                    ГЛАВНАЯ
                </a>
                <a href="">
                    О НАС
                </a>
                <a href="">
                    ЛАБОРАТОРИИ
                </a>
                <a href="">
                    ПРОЕКТЫ
                </a>
                <a href="">
                    КОНТАКТЫ
                </a>
                <a href="https://ictis.sfedu.ru">
                    ИКТИБ
                </a>
            </div>
        </div>
    );
}

export default Header;