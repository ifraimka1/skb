import { useEffect } from "react";

import { PageHeader, PageContent } from "../components";
import { MediaBlock, ProjectList } from "../../components";

import "./PagePost.styles.scss";

function PagePost({ post, isLab = false }) {
    const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
            const parent = entry.target;
            const blockquoteElement = parent.querySelector('blockquote');

            if (blockquoteElement) {
                const blockquoteHeight = blockquoteElement.offsetHeight;
                parent.style.marginBottom = `calc(${blockquoteHeight}px + 2em)`;
            }
        })
    });

    const setQuotesProps = () => {
        const parentElements = document.querySelectorAll('.wp-block-pullquote');

        parentElements.forEach((tapeElement) => {
            resizeObserver.observe(tapeElement);
        });
    };

    useEffect(() => {
        setQuotesProps();
    }, []);

    return (
        <div className={post.tag === 'custom' ? "custom" : ""}>
            <PageHeader className="header">
                <h1>{typeof post !== 'undefined' && post.name}</h1>
            </PageHeader>
            <PageContent className="content">
                {typeof post !== 'undefined' && typeof post.content !== 'string' &&
                    post.content.map(el => {
                        if (el.type === 'mediablock') {
                            return <MediaBlock images={el.value} />;
                        }
                        return el;
                    })
                }
                {post && isLab && <ProjectList laboratory={post.tag} />}
            </PageContent>
        </div>
    );
}

export default PagePost;