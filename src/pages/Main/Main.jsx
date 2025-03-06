import { useContext, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';

import { News, Projects, Labs, Partners, Gallery, ContactUs } from './components';
import { RootContext } from '../Root';
import { PageContent, PageHeader } from '../components';
// import { scb_blue as logo_02 } from '../../assets/images';

import './Main.styles.scss';

function Main() {
    const { setRef } = useContext(RootContext);

    useEffect(() => {
        const navbar = document.getElementById("navbar");
        if (navbar) {
            navbar.classList.add('transparent');
        }

        return () => {
            if (navbar) {
                navbar.classList.remove('transparent');
            }
        }
    }, [])

    return (
        <>
            <PageHeader id="mainpageheader" ref={element => setRef(element)}>
                <div className="container">
                    <h1>Думай иначе, будь креативным!</h1>
                    <h2>Студенческое конструкторское бюро<br />
                        "Компьютерное инновационное творчество"</h2>
                    <HashLink smooth to="#contact-us" className="btn">Связаться с нами</HashLink>
                </div>
            </PageHeader>
            <PageContent><br />
                <News />
                <Projects />
                <Labs />
                <Partners />
                <Gallery />
                <ContactUs />
            </PageContent>
        </>
    );
}

export default Main;
