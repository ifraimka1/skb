import { useState, useEffect } from 'react';

import FooterLink from './FooterLink';
import FooterContacts from './FooterContacts';
import { getMedia } from '../../api';

import { scb as logo } from '../../assets/images';
import { iconIctis, iconSfedu, iconVK } from '../../assets/images/footer';
import './Footer.styles.scss';

const mockLinks = {
    ictis: {
        image: iconIctis,
        to: "https://ictis.sfedu.ru",
    },
    sfedu: {
        image: iconSfedu,
        to: "https://sfedu.ru",
    },
    vk: {
        image: iconVK,
        to: "https://vk.com/skbkit",
    },
};

const mockContacts = {
    email: "skb@sfedu.ru",
    address: "г. Таганрог, пер. Тургеневский, 44",
    phone: "+7 (911) 8888-88-88",
};

function Footer({ links = mockLinks, contacts =  mockContacts }) {
    const [mediaList, setMediaList] = useState(links);

    useEffect(() => {
        const loadData = async () => {
            const footerMedia = await getMedia('footer');
            const newMediaList = mediaList;

            for (let media of footerMedia) {
                newMediaList[media.name].image = media.image;
            }

            setMediaList(newMediaList);
        };
        loadData();
    }, []);

    return (
        <footer className="footer">
            <div className="logo-container">
                <img className="logo" alt="logo" src={ logo } />
            </div>
            <FooterContacts contacts={ contacts } />
            <div className="links">
                { Object.keys(mediaList).map((link, index) => <FooterLink link={mediaList[link]} key={index} />) }
            </div>
        </footer>
    );
}

export default Footer;