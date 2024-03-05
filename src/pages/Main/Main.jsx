import { useContext, useEffect } from 'react';

import { News, Projects, Labs, Partners, Gallery, ContactUs } from './components';
import { RootContext } from '../Root';

import './Main.styles.scss';

function Main() {
    const { setRef } = useContext(RootContext);

    return (
        <>
            <header id="mainpageheader" ref={element => setRef(element)}>
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