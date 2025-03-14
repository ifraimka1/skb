import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PageContent, PageHeader } from "../../components";
import { getNewsByID, vkWallUrl } from "../../../api";
import { MediaBlock, Slider, VKvideo } from "../../../components";

import { extLink } from "../../../assets/images";
import "./NewsItem.styles.scss";

function NewsItem() {
    const [news, setNews] = useState();

    const params = useParams();
    const newsID = params.id;

    useEffect(() => {
        const loadData = async () => {
            const newItem = await getNewsByID(newsID);
            setNews(newItem);
            console.log('newItem', newItem);
        };
        loadData();
    }, [newsID]);

    const newsUrl = `${vkWallUrl}_${newsID}`;

    return (
        <>
            {news &&
                <>
                    <PageHeader className="header">
                        <h1>{news.heading}</h1>
                    </PageHeader>
                    <PageContent className="content" id="news-item-page">
                        {news.videos.length !== 0 && <VKvideo video={news.videos[0]} />}
                        {news.photos.length !== 0 && <Slider images={news.photos} />}
                        {news.text.map(textRow => <p dangerouslySetInnerHTML={{ __html: textRow }}></p>)}
                        <div className="row">
                            <p><a href={newsUrl} target="_blank" rel="noreferrer">Ссылка на новость <img class="icon" src={extLink} /></a><span className="date">Дата публикации: {news.date}</span></p>
                        </div>
                    </PageContent>
                </>
            }
        </>
    );
}

export default NewsItem;