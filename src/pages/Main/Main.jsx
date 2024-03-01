import { useEffect } from 'react';

import { News, Projects, Labs, Partners, Gallery, ContactUs } from './components';
import useElementOnScreen from '../../lib/useElementOnScreen';

function Main() {
    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0,
    });

    useEffect(() => {
        const [ navbar ] = document.getElementsByClassName('navbar');
        if (isVisible) {
            navbar.classList.add('absolute');
        } else {
            navbar.classList.remove('absolute');
        }
    }, [isVisible]);

    return (
        <>
            <header className="header" id="mainpageheader" ref={containerRef}>
                <h1>Думай иначе, будь креативным!</h1>
                <h2>Студенческое конструкторское бюро<br />
                    "Компьютерное инновационное творчество"</h2>
                <a className="btn" href="">Связаться с нами</a>
            </header>
            <div className="content">
                <News />
                <Projects />
                <Labs />
                <Partners />
                <Gallery />
                <ContactUs />
            </div>
        </>
    );
}

export default Main;