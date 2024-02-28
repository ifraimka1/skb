import ScrollCarousel from 'scroll-carousel-react';

import BlockHeading from '../BlockHeading';
import PartnersLogo from './PartnersLogo';
import './Partners.styles.scss';
import { scb } from '../../../../assets/images';
import { porsche } from '../../../../assets/images/partners';

const mock = [
    {
        id: 1,
        image: porsche,
    },
    {
        id: 2,
        image: scb,
    },
    {
        id: 3,
        image: porsche,
    },
    {
        id: 4,
        image: scb,
    },
    {
        id: 5,
        image: porsche,
    },
    {
        id: 6,
        image: scb,
    },
    {
        id: 7,
        image: porsche,
    },
    {
        id: 8,
        image: scb,
    },
];

function Partners({ partners = mock }) {
    return (
        <div className="block partners">
            <BlockHeading heading="Наши партнеры" />
            <ScrollCarousel 
                autoplay
                autoplaySpeed={6}
                speed={1}
                margin={32}
            >
                { partners.map(item => <PartnersLogo key={ item.id } partner={ item } />) }
            </ScrollCarousel>
        </div>
    );
}

export default Partners;