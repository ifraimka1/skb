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
        id: 1,
        image: drone,
        link: "/projects",
    },
    {
        id: 2,
        image: ttt,
        link: "/projects",
    },
    {
        id: 3,
        image: comBattle,
        link: "/projects",
    },
    {
        id: 4,
        image: comBattle,
        link: "/projects",
    },
    {
        id: 5,
        image: comBattle,
        link: "/projects",
    },
];

function Projects({ projects = mock }) {
    return (
        <div className="block projects">
            <BlockHeading heading="Наши проекты" linkText="Все проекты" link="/projects" />
            <div className="row">
                {projects.map(item => <ProjectCard key={ item.id } project={item} />)}
            </div>
        </div>
    );
}

export default Projects;