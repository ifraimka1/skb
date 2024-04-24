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
        image: porsche,
    },
    {
        image: scb,
    },
    {
        image: porsche,
    },
    {
        image: scb,
    },
    {
        image: porsche,
    },
    {
        image: scb,
    },
    {
        image: porsche,
    },
    {
        image: scb,
    },
];

function Partners({ partners = mock }) {
    const [ mediaList, setMediaList ] = useState(partners);

    useEffect(() => {
        const loadData = async () => {
            const newMediaList = await getMedia('partners');
            setMediaList(newMediaList);
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
            >
                { mediaList.map((item, index) => <PartnersLogo key={ index } partner={ item } />) }
            </ScrollCarousel>
        </div>
    );
}

export default Partners;