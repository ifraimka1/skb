import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { PagePost } from "../../components";

import { getProjectByID } from "../../../api";

function Project() {
    const [project, setProject] = useState();

    const params = useParams();
    const projectID = params.id;

    useEffect(() => {
        const loadData = async () => {            
            const newProject = await getProjectByID(projectID);
            setProject(newProject);
            console.log('newProject', newProject);
        };
        loadData();
    }, [projectID]);

    return (
        <>
            {project && <PagePost post={project} />}
        </>
    );
}

export default Project;