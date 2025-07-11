import { useState } from "react";
import { Link } from "react-router-dom";
import FooterLink from "./FooterLink";
import FooterContacts from "./FooterContacts";

import logo from "@/shared/assets/images/scb.svg";
import iconIctis from "@/shared/assets/images/footer/iconIctis.png";
import iconSfedu from "@/shared/assets/images/footer/iconSfedu.png";
import iconVK from "@/shared/assets/images/footer/iconVK.png";
import "./Footer.styles.scss";

interface LinkType {
  src: string;
  to: string;
  id?: string;
}

interface ContactsType {
  email: JSX.Element;
  address: JSX.Element;
  phone: JSX.Element;
}

interface FooterProps {
  links?: Record<string, LinkType>;
  contacts?: ContactsType;
}

const mockLinks: Record<string, LinkType> = {
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

const mockContacts: ContactsType = {
  email: (
    <a style={{
      fontSize: "24px",
      color: "inherit",
      fontWeight: "500",
    }} href="mailto:skb@sfedu.ru">
      skb@sfedu.ru
    </a>
  ),
  phone: (
    <a style={{ color: "inherit", fontSize: "24px", }} href="tel:+79780095480">
      +7 (978) 009-54-80
    </a>
  ),
  address: (
    <a
      style={{ color: "inherit", fontSize: "16px" }}
      href="https://yandex.ru/maps/?text=г.%20Таганрог,%20пер.%20Тургеневский,%2044"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div style={{ marginBottom: "5px" }}>
        <span style={{ color: "#898989" }}>Таганрог</span>
      </div>
      пер. Тургеневский, 44

    </a>
  ),
};

function Footer({ links = mockLinks, contacts = mockContacts }: FooterProps) {
  // TODO: добавить setMediaList
  const [mediaList] = useState(links);

  return (
    <footer id="footer">
      <div className="logo-container">
        <div className="logo-container" style={{ alignItems: 'flex-start' }}>
          <img className="logo" alt="logo" src={logo} />
        </div>
        <label style={{ color: 'white', fontSize: '14px', alignItems: 'flex-end', lineHeight: 'none' }}>©СКБ «КИТ» 2015 – 2025</label>
      </div>
      <div className="footer-links-container">
        <div className="footer-links">
          <div className="footer-column">
            <Link to="/news" onClick={() => window.scrollTo(0, 0)}>НОВОСТИ</Link>
            <Link to="/projects" onClick={() => window.scrollTo(0, 0)}>ПРОЕКТЫ</Link>
            <Link to="/labs" onClick={() => window.scrollTo(0, 0)}>ЛАБОРАТОРИИ</Link>
          </div>
          <div className="footer-column">
            <Link to="/aboutus" onClick={() => window.scrollTo(0, 0)}>О НАС</Link>
            <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>КОНТАКТЫ</Link>
            <a href="https://ictis.sfedu.ru" target="_blank" rel="noopener noreferrer">ИКТИБ</a>
          </div>
        </div>
        <Link className="visible" style={{ color: 'white', fontSize: '14px', alignItems: 'flex-end', lineHeight: 'none' }} to="https://www.study.sfedu.ru/privacypolicy?ysclid=m8anp507sz44008873">Политика конфиденциальности</Link>
      </div>

      <div className="footer-content">
        <FooterContacts contacts={contacts} />
        <div className="links">
          {Object.keys(mediaList).map(link => <FooterLink link={mediaList[link]} key={mediaList[link].id} />)}
        </div>
      </div>

      <Link className="copyright" style={{ color: 'white', fontSize: '14px', lineHeight: 'none' }} to="https://www.study.sfedu.ru/privacypolicy?ysclid=m8anp507sz44008873">Политика конфиденциальности</Link>
      <div className="copyright">
        ©СКБ «КИТ» 2015 – 2025
      </div>
    </footer >
  );
}

export default Footer;