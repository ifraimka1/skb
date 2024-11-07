import { PageHeader, PageContent } from "../components";
import { MediaBlock, ProjectList } from "../../components";

function PagePost({ post, isLab = false }) {

    return (
        <>
            <PageHeader className="header">
                <h1>{typeof post !== 'undefined' && post.name}</h1>
            </PageHeader>
            <PageContent className="content">
                {typeof post !== 'undefined' && typeof post.content !== 'string' &&
                    post.content.map(el => {
                        console.log(el.type);
                        console.log(el);
                        if (el.type === 'mediablock') {
                            return <MediaBlock images={el.value} />;
                        }
                        return el;
                    })
                }
                {post && isLab && <ProjectList laboratory={post.tag} />}
            </PageContent>
        </>
    );
}

export default PagePost;