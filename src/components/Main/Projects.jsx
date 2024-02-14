//import { Link } from 'react-router-dom';

import './Projects.scss';

function Projects() {
    return (
        <div className="block projects">
            <div className="heading">
                <h1>Наши проекты</h1>
                <a href=''>Все проекты</a>
            </div>
            <div className="row">
                <a className="big el btn" href="">
                    <div className="text">Перейти&rarr;</div>
                </a>
                <a className="el btn" href="">
                    <div className="text">Перейти&rarr;</div>
                </a>
                <a className="el btn" href="">
                    <div className="text">Перейти&rarr;</div>
                </a>
                <a className="el btn" href="">
                    <div className="text">Перейти&rarr;</div>
                </a>
            </div>
        </div>
    );
}

export default Projects;