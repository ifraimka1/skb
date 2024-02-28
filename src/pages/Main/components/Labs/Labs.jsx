import BlockHeading from '../BlockHeading';
import LabCard from './LabCard';

import { labMock } from '../../../../assets/images';
import './Labs.styles.scss';

const mock = [
    {
        name: "Лаборатория кибернетики",
        desc: "Управление робототехническими системами, создание аппаратных и программных продуктов, а также проектирование программных систем.",
        link: "/labs",
        img: labMock,
    },
    {
        name: "Лаборатория компьютерного зрения",
        desc: "Работа с методами и технологиями сегментации изображений, ИИ и нейронными сетями.",
        link: "/labs",
        img: labMock,
    },
    {
        name: "Лаборатория SmartTech",
        desc: "Проектирование систем в концепции “Интернета вещей” и технологии “Умного дома”.",
        link: "/labs",
        img: labMock,
    },
    {
        name: "Лаборатория VR и AR",
        desc: "Разработка приложений для виртуальной и дополненной реальности, 3D-моделирование.",
        link: "/labs",
        img: labMock,
    },
    {
        name: "Лаборатория мобильной разработки",
        desc: "Разработка приложений для портативных устройств, создание дизайна и проектов мобильных приложений.",
        link: "/labs",
        img: labMock,
    },
    {
        name: "Лаборатория 3D-печати и прототипирования",
        desc: "Проектирование 3D-модели, работа с 3D-принтером и создание качественных трёхмерных макетов.",
        link: "/labs",
        img: labMock,
    },
];

function Labs({ labs = mock }) {
    return (
        <div className="block labs">
            <BlockHeading heading="Наши лаборатории" />
            <div className="row">
                { labs.map( lab => <LabCard lab={ lab } />) }
            </div>
        </div>
    );
}

export default Labs;