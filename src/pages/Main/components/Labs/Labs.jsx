import { useState, useEffect } from 'react';

import BlockHeading from '../BlockHeading';
import LabCard from './LabCard';

import { getMedia } from '../../../../api';

import { labMock } from '../../../../assets/images';
import './Labs.styles.scss';

const mock = {
    cyber: {
        name: "Лаборатория кибернетики",
        desc: "Управление робототехническими системами, создание аппаратных и программных продуктов, а также проектирование программных систем.",
        link: "/labs",
        image: labMock,
    },
    cv: {
        name: "Лаборатория компьютерного зрения",
        desc: "Работа с методами и технологиями сегментации изображений, ИИ и нейронными сетями.",
        link: "/labs",
        image: labMock,
    },
    st: {
        name: "Лаборатория SmartTech",
        desc: "Проектирование систем в концепции “Интернета вещей” и технологии “Умного дома”.",
        link: "/labs",
        image: labMock,
    },
    vr: {
        name: "Лаборатория VR и AR",
        desc: "Разработка приложений для виртуальной и дополненной реальности, 3D-моделирование.",
        link: "/labs",
        image: labMock,
    },
    mobile: {
        name: "Лаборатория мобильной разработки",
        desc: "Разработка приложений для портативных устройств, создание дизайна и проектов мобильных приложений.",
        link: "/labs",
        image: labMock,
    },
    print: {
        name: "Лаборатория 3D-печати и прототипирования",
        desc: "Проектирование 3D-модели, работа с 3D-принтером и создание качественных трёхмерных макетов.",
        link: "/labs",
        image: labMock,
    },
};

function Labs({ labs = mock }) {
    const [mediaList, setMediaList] = useState(labs);

    useEffect(() => {
        const loadData = async () => {
            const labMedia = await getMedia('labs');
            const newMediaList = mediaList;

            for (let media of labMedia) {
                newMediaList[media.name].image = media.image;
            }
            console.log(newMediaList);
            setMediaList(newMediaList);
        };
        loadData();
    }, []);

    return (
        <div className="block" id="labs">
            <BlockHeading heading="Наши лаборатории" />
            <div className="row">
                { Object.keys(mediaList).map((lab, index) => <LabCard key={ index } lab={ mediaList[lab] } />) }
            </div>
        </div>
    );
}

export default Labs;