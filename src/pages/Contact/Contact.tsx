import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Helmet } from "react-helmet";

import "./Contact.styles.scss";
import ContactForm from "@/widgets/ContactForm";

function Contact() {
  return (
    <div id="page-contact" className="mainContainer">
      <Helmet>
        <title>Контакты | СКБ "Компьютерное инновационное творчество"</title>
        <meta
          name="keywords"
          content="СКБ, контакты, связаться, Студенческое конструкторское бюро, Компьютерное инновационное творчество, ИКТИБ, ЮФУ, адрес, телефон, email, карта, местоположение, Таганрог"
        />
        <meta
          name="description"
          content="Свяжитесь с нами! Контактная информация Студенческого конструкторского бюро 'Компьютерное инновационное творчество' ИКТИБ ЮФУ. Наш адрес: г. Таганрог, пер. Тургеневский, 44, ауд. 208."
        />
        <meta name="robots" content="index,follow" />
      </Helmet>
      <div className="top-block">
        <div>
          <h1>Контакты</h1>
          <div className="contact">
            <p>
              Контактное лицо:
              <br />
              Кутковой Владимир Сергеевич
              <br />
              Руководитель СКБ «КИТ»
              <br />
              Email: skb@sfedu.ru
              <br />
              Адрес: г. Таганрог, пер. Тургеневский, 44, ауд. 208
            </p>
          </div>
        </div>
        <YMaps>
          <Map
            defaultState={{
              center: [47.20669, 38.929113],
              zoom: 13,
              controls: ["zoomControl", "fullscreenControl"],
            }}
            modules={["control.ZoomControl", "control.FullscreenControl"]}
          >
            <Placemark defaultGeometry={[47.20669, 38.929113]} />
          </Map>
        </YMaps>
      </div >
      <div id="contact-form-anchor"></div>
        <ContactForm />
    </div>
  );
}

export default Contact;
