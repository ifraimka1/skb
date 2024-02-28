import BlockHeading from '../BlockHeading';
import ProjectCard from './ProjectCard';
import './Projects.styles.scss';
import {
    project,
    drone,
    ttt,
    comBattle
} from '../../../../assets/images/projects';

const mock = [
    {
        image: drone,
        link: "/projects",
    },
    {
        image: ttt,
        link: "/projects",
    },
    {
        image: comBattle,
        link: "/projects",
    },
    {
        image: comBattle,
        link: "/projects",
    },
    {
        image: comBattle,
        link: "/projects",
    },
];

function Projects({ projects = mock }) {
    return (
        <div className="block projects">
            <BlockHeading heading="Наши проекты" linkText="Все проекты" link="/projects" />
            <div className="row">
                {mock.map(item => <ProjectCard project={item} />)}
            </div>
        </div>
    );
}

export default Projects;