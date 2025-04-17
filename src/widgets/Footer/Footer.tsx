import { useState } from "react";
import FooterLink from "./FooterLink";
import FooterContacts from "./FooterContacts";

import logo from "@/shared/assets/images/scb.svg";
import iconIctis from "@/shared/assets/images/footer/iconIctis.png";
import iconSfedu from "@/shared/assets/images/footer/iconSfedu.png";
import iconVK from "@/shared/assets/images/footer/iconVK.svg";
import "./Footer.styles.scss";

// Тип для ссылок
interface LinkType {
  src: string;
  to: string;
  id?: string; // Добавляем опциональное поле id
}

// Тип для контактов
interface ContactsType {
  email: JSX.Element;
  address: JSX.Element;
  phone: JSX.Element;
}

// Тип для пропсов компонента Footer
interface FooterProps {
  links?: Record<string, LinkType>; // Объект с ключами-строками и значениями типа LinkType
  contacts?: ContactsType;
}

const mockLinks: Record<string, LinkType> = {
  ictis: {
    src: iconIctis,
    to: "https://ictis.sfedu.ru",
  },
  sfedu: {
    src: iconSfedu,
    to: "https://sfedu.ru",
  },
  vk: {
    src: iconVK,
    to: "https://vk.com/skbkit",
  },
};

const mockContacts: ContactsType = {
  email: (
    <a style={{ color: "inherit" }} href="mailto:skb@sfedu.ru">
      skb@sfedu.ru
    </a>
  ),
  address: (
    <a
      style={{ color: "inherit" }}
      href="https://yandex.ru/maps/?text=г.%20Таганрог,%20пер.%20Тургеневский,%2044"
      target="_blank"
      rel="noopener noreferrer"
    >
      г. Таганрог, пер. Тургеневский, 44
    </a>
  ),
  phone: (
    <a style={{ color: "inherit" }} href="tel:+79780095480">
      +7 (978) 009-54-80
    </a>
  ),
};

function Footer({ links = mockLinks, contacts = mockContacts }: FooterProps) {
  const [mediaList] = useState(links);

  return (
    <footer id="footer">
      <div className="logo-container">
        <img className="logo" alt="logo" src={logo} />
      </div>
      <FooterContacts contacts={contacts} />
      <div className="links">
        {Object.keys(mediaList).map((linkKey) => (
          <FooterLink link={mediaList[linkKey]} key={linkKey} />
        ))}
      </div>
    </footer>
  );
}

export default Footer;