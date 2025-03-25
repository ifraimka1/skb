import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import FooterLink from './FooterLink';
import FooterContacts from './FooterContacts';
import { getMedia } from '../../api';

import { scb as logo } from '../../assets/images';
import { iconIctis, iconSfedu, iconVK } from '../../assets/images/footer';
import './Footer.styles.scss';

const mockLinks = {
    sfedu: {
        src: iconSfedu,
        to: "https://sfedu.ru",
    },
    ictis: {
        src: iconIctis,
        to: "https://ictis.sfedu.ru",
    },
    vk: {
        src: iconVK,
        to: "https://vk.com/skbkit",
    },
};

const mockContacts = {
    email: (
        <a style={{ color: 'inherit' }} href="mailto:skb@sfedu.ru">skb@sfedu.ru</a>
    ),
    address: (
        <a style={{ color: 'inherit' }} href="https://yandex.ru/maps/?text=г.%20Таганрог,%20пер.%20Тургеневский,%2044" target="_blank" rel="noopener noreferrer">
            <a style={{ color: '#898989' }}>Таганрог</a><br />пер. Тургеневский, 44
        </a>
    ),
    phone: (
        <a style={{ color: 'inherit' }} href="tel:+79780095480">+7 (978) 009-54-80</a>
    ),
};

function Footer({ links = mockLinks, contacts = mockContacts }) {
    const [mediaList, setMediaList] = useState(links);

    useEffect(() => {
        const loadData = async () => {
            const newMediaList = await getMedia('footer', mediaList);
            setMediaList(newMediaList);
            console.log('footerMedia', newMediaList);
        };
        loadData();
    }, []);

    return (
        <footer id="footer">
            <div className="logo-container">
                <div className="logo-container" style={{ alignItems: 'flex-start' }}>
                    <img className="logo" alt="logo" src={logo} />
                </div>
                <label style={{ color: 'white', fontSize: '14px', alignItems: 'flex-end', lineHeight: 'none' }}>©СКБ «КИТ» 2015–2025</label>
            </div>
            <div className="footer-links-container">
                <div className="footer-links">
                    <div className="footer-column">
                        <Link href="#" to="/news">НОВОСТИ</Link>
                        <Link href="#" to="/projects">ПРОЕКТЫ</Link>
                        <Link href="#" to="/labs">ЛАБОРАТОРИИ</Link>
                        <Link href="#" to="/aboutus">О НАС</Link>
                    </div>
                    <div className="footer-column">
                        <Link href="#" >НАША КОМАНДА</Link>
                        <Link href="#" to="/contact">КОНТАКТЫ</Link>
                        <Link href="#" to="https://ictis.sfedu.ru">ИКТИБ</Link>
                    </div>
                </div>
                <Link style={{ color: 'white', fontSize: '14px', alignItems: 'flex-end', lineHeight: 'none' }} href="#" to="https://www.study.sfedu.ru/privacypolicy?ysclid=m8anp507sz44008873">Политика конфиденциальности</Link>
            </div>

            <div className="footer-content">
                <FooterContacts contacts={contacts} />
                <div className="links">
                    {Object.keys(mediaList).map(link => <FooterLink link={mediaList[link]} key={mediaList[link].id} />)}
                </div>
            </div>
        </footer >
    );
}

export default Footer;