import { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';

import BlockHeading from '../BlockHeading';
import PartnersLogo from './PartnersLogo';

import { getMedia } from '../../../../api';

import './Partners.styles.scss';
import { scb } from '../../../../assets/images';
import { porsche } from '../../../../assets/images/partners';

const mock = [
    { src: porsche },
    { src: scb },
    { src: porsche },
    { src: scb },
    { src: porsche },
    { src: scb },
    { src: porsche },
    { src: scb },
];

function Partners({ partners = mock }) {
    const [mediaList, setMediaList] = useState(partners);
    // TODO: сделать отдельно init и отдельно update. Сделать статичными при <5
    const updateMediaList = async () => {
        // const newMediaList = await getMedia('partners');
        // if (newMediaList.length < 2) return; // Если картинок меньше двух, нет смысла чередовать
        
        // const items = Math.ceil(window.innerWidth / 200); // 200px — примерная ширина одной картинки
        // const repeatTimes = Math.ceil(items / newMediaList.length);

        // for (let i = 0; i < repeatTimes; i++) {
        //     newMediaList.push(...newMediaList);
        // }

        // console.log('Я ОБНОВЛЯЮСЬ');

        // setMediaList(newMediaList);
    };

    useEffect(() => {
        updateMediaList();
        window.addEventListener('resize', updateMediaList); // Обработчик изменения размера окна
        return () => {
            window.removeEventListener('resize', updateMediaList);
        };
    }, []);

    return (
        <div className="block" id="partners">
            <BlockHeading heading="Наши партнеры" />
            <div className="marquee-container">
                <Marquee 
                    gradient={false} 
                    pauseOnHover={false} 
                    speed={80} 
                    className="marquee"
                >
                    {mediaList.map((item, index) => (
                        <div key={index} className="partner">
                            <PartnersLogo partner={item} />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
}

export default Partners;