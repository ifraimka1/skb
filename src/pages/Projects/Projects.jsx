import { PageContent, PageHeader } from "../components";
import { ProjectList } from "../../components"

function Projects() {
    return (
        <>
            <PageHeader className="header">
                <h1>Проекты</h1>
            </PageHeader>
            <PageContent className="content">
                <ProjectList />
            </PageContent>
        </>
    );
}

export default Projects;