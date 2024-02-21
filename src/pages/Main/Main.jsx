import { News, Projects, Labs, Partners, Gallery, ContactUs } from './components';

function Main() {
    return (
        <>
            <header className="header">
                <h1>Думай иначе, будь креативным!</h1>
                <h2>Студенческое конструкторское бюро<br/>
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