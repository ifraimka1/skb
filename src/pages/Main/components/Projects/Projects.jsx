import { useState, useEffect } from 'react';

import BlockHeading from '../BlockHeading';
import ProjectCard from './ProjectCard';

import { getMedia } from '../../../../api';

import './Projects.styles.scss';
import {
    drone,
    ttt,
    comBattle
} from '../../../../assets/images/projects';

const mock = {
    drone: {
        image: drone,
        link: "/projects",
    },
    ttt: {
        image: ttt,
        link: "/projects",
    },
    comBattle: {
        image: comBattle,
        link: "/projects",
    },
    comBattle2: {
        image: comBattle,
        link: "/projects",
    },
    comBattle3: {
        image: comBattle,
        link: "/projects",
    },
};

function Projects({ projects = mock }) {
    const [mediaList, setMediaList] = useState(projects);

    useEffect(() => {
        const loadData = async () => {
            const newMediaList = await getMedia('projects', mediaList);
            setMediaList(newMediaList);
        };
        loadData();
    }, []);

    return (
        <div className="block" id="projects">
            <BlockHeading heading="Наши проекты" linkText="Все проекты" link="/projects" />
            <div className="row">
                { Object.keys(mediaList).map(project => <ProjectCard key={ mediaList[project].id } project={ mediaList[project] } />) }
            </div>
        </div>
    );
}

export default Projects;