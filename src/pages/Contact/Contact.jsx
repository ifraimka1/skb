import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

import { PageContent, PageHeader } from "../components";
import ContactForm from "../../components/ContactForm";

import "./Contact.styles.scss";

function Contact() {
    return (
        <div id="page-contact">
            <PageHeader>
                <div className="top-block">
                    <div>
                        <h1>Контакты</h1>
                        <div className="contact">
                            <p>Контактное лицо:<br />
                                Кутковой Владимир Сергеевич<br />
                                Руководитель СКБ «КИТ»<br />
                                Email: skb@sfedu.ru<br />
                                Адрес: г. Таганрог, пер. Тургеневский, 44, ауд. 208</p>
                        </div>
                    </div>
                    <YMaps>
                        <Map
                            defaultState={{
                                center: [47.206690, 38.929113],
                                zoom: 13,
                                controls: ["zoomControl", "fullscreenControl"],
                            }}
                            modules={["control.ZoomControl", "control.FullscreenControl"]}
                        >
                            <Placemark defaultGeometry={[47.206690, 38.929113]} />
                        </Map>
                    </YMaps>
                </div>
            </PageHeader>
            <PageContent>
                <ContactForm />
            </PageContent>
        </div>
    );
}

export default Contact;