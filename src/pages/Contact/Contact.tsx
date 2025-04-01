import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import "./Contact.styles.scss";
import ContactForm from "@/widgets/ContactForm";

function Contact() {
  return (
    <div id="page-contact" className="mainContainer">
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
      </div>

      <ContactForm />
    </div>
  );
}

export default Contact;
