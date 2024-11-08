import { HashLink } from "react-router-hash-link";
import { useState, useEffect } from "react";

import { PagePost } from "../components";
import { getPosts } from "../../api";

function AboutUs() {
    const [post, setPost] = useState();

    useEffect(() => {
        const loadData = async () => {
            const newPost = await getPosts('aboutus');
            setPost(newPost[0]);
            console.log('aboutUs post', newPost[0]);
        };
        loadData();
    }, []);

    return (
        <>
            {typeof post !== 'undefined' &&
                <PagePost post={post} >
                    <div className="btn">Показать еще</div>
                </PagePost>
            }
        </>
    );
}

export default AboutUs;