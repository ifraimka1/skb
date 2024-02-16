import BlockHeading from '../BlockHeading';
import ProjectCard from './ProjectCard';
import './Projects.styles.scss';
import { projectMock } from '../../../../images';

const mock = [
    {
        image: projectMock,
        link: "/projects",
    },
    {
        image: projectMock,
        link: "/projects",
    },
    {
        image: projectMock,
        link: "/projects",
    },
    {
        image: projectMock,
        link: "/projects",
    },
];

function Projects({ projects = mock }) {
    return (
        <div className="block projects">
            <BlockHeading heading="Наши проекты" linkText="Все проекты" link="/projects"/>
            <div className="row">
                { mock.map(item => <ProjectCard project={ item } />) }
            </div>
        </div>
    );
}

export default Projects;