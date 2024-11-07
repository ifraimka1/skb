import { PageHeader, PageContent } from "../components";
import { LabList } from "../../components"

function Labs() {
    return (
        <>
            <PageHeader className="header">
                <h1>Лаборатории</h1>
            </PageHeader>
            <PageContent className="content">
                <LabList />
            </PageContent>
        </>
    );
}

export default Labs;