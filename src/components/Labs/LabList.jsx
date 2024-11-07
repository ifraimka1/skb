import { useState, useEffect } from 'react';

import LabCard from './LabCard';

import { getLabs } from '../../api';

import { labMock } from '../../assets/images';
import './LabList.styles.scss';

const mock = {
    cyber: {
        name: "Лаборатория кибернетики",
        previewText: "Управление робототехническими системами, создание аппаратных и программных продуктов, а также проектирование программных систем.",
        link: "/labs",
        preview: labMock,
    },
    cv: {
        name: "Лаборатория компьютерного зрения",
        previewText: "Работа с методами и технологиями сегментации изображений, ИИ и нейронными сетями.",
        link: "/labs",
        preview: labMock,
    },
    st: {
        name: "Лаборатория SmartTech",
        previewText: "Проектирование систем в концепции “Интернета вещей” и технологии “Умного дома”.",
        link: "/labs",
        preview: labMock,
    },
    vr: {
        name: "Лаборатория VR и AR",
        previewText: "Разработка приложений для виртуальной и дополненной реальности, 3D-моделирование.",
        link: "/labs",
        preview: labMock,
    },
    mobile: {
        name: "Лаборатория мобильной разработки",
        previewText: "Разработка приложений для портативных устройств, создание дизайна и проектов мобильных приложений.",
        link: "/labs",
        preview: labMock,
    },
    print: {
        name: "Лаборатория 3D-печати и прототипирования",
        previewText: "Проектирование 3D-модели, работа с 3D-принтером и создание качественных трёхмерных макетов.",
        link: "/labs",
        preview: labMock,
    },
};

function LabList() {
    const [labList, setLabList] = useState(mock);

    useEffect(() => {
        const loadData = async () => {
            const newLabList = await getLabs();
            setLabList(newLabList);
        };
        loadData();
    }, []);

    return (
        <div className="row lab-list">
            {Object.values(labList).map(lab => <LabCard key={lab.id} lab={lab} />)}
        </div>
    );
}

export default LabList;