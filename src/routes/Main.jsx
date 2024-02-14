import News from '../components/Main/News';
import Projects from '../components/Main/Projects';
import Labs from '../components/Main/Labs';

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
            </div>
        </>
    );
}

export default Main;