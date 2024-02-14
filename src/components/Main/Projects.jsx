import { Link } from 'react-router-dom';

import './Projects.scss';

function Projects() {
    return (
        <div className="news">
            <div className="heading">
                <h1>Наши проекты</h1>
                <a href=''>Все проекты</a>
            </div>
            <div className="row">
                <div className="el">
                    <div className="pic"></div>
                </div>
                <div className="el">
                    <div className="pic"></div>
                </div>
                <div className="el">
                    <div className="pic"></div>
                </div>
                <div className="el">
                    <div className="pic"></div>
                </div>
            </div>
        </div>
    );
}

export default Projects;