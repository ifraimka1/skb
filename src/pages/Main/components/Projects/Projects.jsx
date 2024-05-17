import BlockHeading from '../BlockHeading';
import ProjectList from '../../../../components/Projects';

import './Projects.styles.scss';

function Projects() {
    return (
        <div className="block" id="projects">
            <BlockHeading heading="Наши проекты" linkText="Все проекты" link="/projects" />
            <ProjectList />
        </div>
    );
}

export default Projects;