import { useLoaderData, useParams } from "react-router-dom";

import { PageHeader, PageContent } from "../../components";
import { getProjects } from "../../../api";

export async function loader() {
    const projects = await getProjects();
    return { projects };
}

function Project() {
    const params = useParams();
    const projectID = params.id;

    const { projects } = useLoaderData();
    const project = projects[projectID];

    return (
        <>
            <PageHeader className="header">
                <h1>{project.name}</h1>
            </PageHeader>
            <PageContent className="content">
                <p>{project.desc}</p>
            </PageContent>
        </>
    );
}

export default Project;