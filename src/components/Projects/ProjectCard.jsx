import { Link } from 'react-router-dom';

import "./ProjectCard.styles.scss";

function ProjectCard({ project }) {
    return (
        <Link className="card" to={ `/projects/` + project.id }>
            <img className="image" alt="project_image" src={project.preview}></img>
            <div className="label">
                { `Проект "${project.name}"` }
            </div>
        </Link>
    );
}

export default ProjectCard;