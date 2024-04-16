import FooterLink from './FooterLink';
import { scb as logo } from '../../assets/images';
import { iconIctis, iconSfedu, iconVK } from '../../assets/images/footer';
import './Footer.styles.scss';
import FooterContacts from './FooterContacts';

const mockLinks = [
    {
        icon: iconIctis,
        to: "https://ictis.sfedu.ru",
    },
    {
        icon: iconSfedu,
        to: "https://sfedu.ru",
    },
    {
        icon: iconVK,
        to: "https://vk.com/skbkit",
    },
];

const mockContacts = {
    email: "skb@sfedu.ru",
    address: "г. Таганрог, пер. Тургеневский, 44",
    phone: "+7 (911) 8888-88-88",
};

function Footer({ links = mockLinks, contacts =  mockContacts }) {
    return (
        <footer className="footer">
            <div className="logo-container">
                <img className="logo" alt="logo" src={ logo } />
            </div>
            <FooterContacts contacts={ contacts } />
            <div className="links">
                { links.map((link, index) => <FooterLink link={link} key={index} />) }
            </div>
        </footer>
    );
}

export default Footer;