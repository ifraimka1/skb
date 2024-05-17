import { useState, useEffect } from "react";

import ProjectCard from "./ProjectCard";
import { getProjects } from "../../api";

import "./ProjectList.styles.scss";

function ProjectList({ laboratory }) {
    const [projectList, setProjectList] = useState({});

    useEffect(() => {
        const loadData = async () => {
            const newProjectList = await getProjects(laboratory);
            setProjectList(newProjectList);
        };
        loadData();
    }, []);

    return (
        <div className="row project-list">
            {Object.keys(projectList).map(id => <ProjectCard key={id} project={projectList[id]} />)}
        </div>
    );
}

export default ProjectList;