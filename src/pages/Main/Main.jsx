import { useContext } from 'react';

import { News, Projects, Labs, Partners, Gallery, ContactUs } from './components';
import { RootContext } from '../Root';

import './Main.styles.scss';

function Main() {
    const { containerRef } = useContext(RootContext);

    return (
        <>
            <header className="header" id="mainpageheader" ref={containerRef}>
                <div className="container">
                    <h1>Думай иначе, будь креативным!</h1>
                    <h2>Студенческое конструкторское бюро<br />
                        "Компьютерное инновационное творчество"</h2>
                    <a className="btn" href="">Связаться с нами</a>
                </div>
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