import ScrollCarousel from 'scroll-carousel-react';

import BlockHeading from '../BlockHeading';
import PartnersLogo from './PartnersLogo';
import './Partners.styles.scss';
import { scb } from '../../../../images';
import { porsche } from '../../../../images/partners';

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
];

function Partners({ partners = mock }) {
    return (
        <div className="block partners">
            <BlockHeading heading="Наши партнеры" />
            <ScrollCarousel 
                autoplay
                autoplaySpeed={6}
                speed={1}
            >
                { partners.map(item => <PartnersLogo partner={ item } />) }
            </ScrollCarousel>
        </div>
    );
}

export default Partners;