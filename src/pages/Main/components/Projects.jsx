import { Link } from 'react-router-dom';

import './Projects.styles.scss';

function Projects() {
    return (
        <div className="block projects">
            <div className="heading">
                <h1>Наши проекты</h1>
                <Link to={`/projects`}>Все проекты</Link>
            </div>
            <div className="row">
                <a className="big card btn" href="">
                    <div className="link-label">Перейти&rarr;</div>
                </a>
                <a className="card btn" href="">
                    <div className="link-label">Перейти&rarr;</div>
                </a>
                <a className="card btn" href="">
                    <div className="link-label">Перейти&rarr;</div>
                </a>
                <a className="card btn" href="">
                    <div className="link-label">Перейти&rarr;</div>
                </a>
            </div>
        </div>
    );
}

export default Projects;