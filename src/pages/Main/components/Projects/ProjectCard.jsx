import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
    return (
        <Link className="card" to={`/projects`}>
            <img className="image" alt="project_image" src={project.image}></img>
            <div className="link-label">
                Перейти &rarr;
            </div>
        </Link>
    );
}

export default ProjectCard;