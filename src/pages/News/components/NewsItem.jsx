import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PageContent, PageHeader } from "../../components";
import { getNewsByID, vkWallUrl } from "../../../api";
import { Slider } from "../../../components";

import { extLink, views } from "../../../assets/images";
import "./NewsItem.styles.scss";

function NewsItem() {
    const [news, setNews] = useState();

    const params = useParams();
    const newsID = params.id;

    function formatDate(timestamp) {
        const date = new Date(timestamp * 1000);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`; // DD.MM.YYYY
    }

    useEffect(() => {
        const loadData = async () => {
            const newItem = await getNewsByID(newsID);
            console.log('newItem.views', newItem.views);
            console.log('newItem.date', newItem.date);
            newItem.date = formatDate(newItem.date);
            setNews(newItem);
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
                        {news.photos.length !== 0 && <Slider images={news.photos} />}
                        {news.text.map(textRow => <p dangerouslySetInnerHTML={{ __html: textRow }}></p>)}
                        <div className="row">
                            <p><a href={newsUrl} target="_blank" rel="noreferrer">Ссылка на новость <img class="icon" src={extLink} alt="" /></a></p>
                            <div id="right">
                                <p><img class="icon" src={views} alt="" />{news.views}</p>
                                <p id="date">Дата публикации: {news.date}</p>
                            </div>
                        </div>
                    </PageContent>
                </>
            }
        </>
    );
}

export default NewsItem;