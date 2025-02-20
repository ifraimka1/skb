import { useState, useEffect } from 'react';
import ScrollCarousel from 'scroll-carousel-react';

import BlockHeading from '../BlockHeading';
import PartnersLogo from './PartnersLogo';

import { getMedia } from '../../../../api';

import './Partners.styles.scss';
import { scb } from '../../../../assets/images';
import { porsche } from '../../../../assets/images/partners';

const mock = [
    {
        src: porsche,
    },
    {
        src: scb,
    },
    {
        src: porsche,
    },
    {
        src: scb,
    },
    {
        src: porsche,
    },
    {
        src: scb,
    },
    {
        src: porsche,
    },
    {
        src: scb,
    },
];

function Partners({ partners = mock }) {
    const [ mediaList, setMediaList ] = useState(partners);

    useEffect(() => {
        const loadData = async () => {
            const newMediaList = await getMedia('partners');
            const repeatTimes = Math.ceil(window.innerWidth / 200); // 200px — примерная ширина одной картинки
            setMediaList([...newMediaList, ...Array(repeatTimes).fill(...newMediaList)]);
        };
        loadData();
    }, []);

    return (
        <div className="block" id="partners">
            <BlockHeading heading="Наши партнеры" />
            <ScrollCarousel 
                autoplay
                autoplaySpeed={6}
                speed={1}
                margin={32}
                loop={true} // Включаем бесконечный цикл
                style={{ width: '100%' }}
            >
                { mediaList.map((item, index) => <PartnersLogo key={ index } partner={ item } />) }
            </ScrollCarousel>
        </div>
    );
}

export default Partners;