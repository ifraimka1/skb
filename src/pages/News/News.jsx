import { PageHeader, PageContent } from "../components";
import { LoadMore, NewsList } from "../../components";
import "./News.styles.scss";

function News() {
    return (
        <>
            <PageHeader className="header">
                <h1>Новости</h1>
            </PageHeader>
            <PageContent id="news-page">
                <NewsList />
            </PageContent>
        </>
    );
}

export default News;