import { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Parse from 'html-react-parser';

import { PageHeader, PageContent } from "../../components";

import { getProjects, getMedia, getPosts } from "../../../api";
import { MediaBlock } from "../../../components";

export async function loader() {
    const projects = await getProjects();
    return { projects };
}

function Project() {
    const [mediaList, setMediaList] = useState([]);
    const [post, setPost] = useState();

    const params = useParams();
    const projectID = params.id;

    const { projects } = useLoaderData();
    const project = projects[projectID];

    useEffect(() => {
        const loadData = async () => {
            const newMediaList = await getMedia('projects')
                .then((result) => {
                    return result.filter(el => el.name.includes(project.tag));
                });
            setMediaList(newMediaList);
        };
        loadData();
    }, [projectID]);

    useEffect(() => {
        const loadData = async () => {
            const newPost = await getPosts('ambr');
            console.log(newPost);
            setPost(newPost);
            console.log(Parse(newPost.content.rendered));
        };
        loadData();
    }, []);

    return (
        <>
            <PageHeader className="header">
                <h1>{ typeof post !== 'undefined' && post.title.rendered }</h1>
            </PageHeader>
            <PageContent className="content">
                { typeof post !== 'undefined' &&
                    Parse(post.content.rendered).map(el => {
                        if (el.type === 'figure') {
                            const media = mediaList.find(item => el.props.children.props.src === item.name);
                            return <MediaBlock images={[media.image]}/>
                        }
                        return el;
                    })
                }
            </PageContent>
        </>
    );
}

export default Project;