import { useState, useEffect } from 'react';

import NewsCard from './NewsCard';

import { getNews } from '../../api';

import './News.styles.scss';
import LoadMore from '../LoadMore';

function NewsList({ isMainPage = false }) {
    const [newsList, setNewsList] = useState();
    const [isFullList, setIsFullList] = useState(false);

    const count = isMainPage ? 4 : 6;

    useEffect(() => {
        const loadData = async () => {
            const newNewsList = await getNews(count);
            setNewsList(newNewsList);
            console.log('newNewsList', newNewsList);
        };
        loadData();
    }, []);

    return (
        <>
            {newsList ? (
                <div id="news">
                    <div className="row">
                        {newsList.map(item => <NewsCard key={item.id} news={item} />)}
                    </div>
                    { !isMainPage && !isFullList &&
                        <LoadMore list={newsList} setter={setNewsList} loader={getNews} count={count} setFull={setIsFullList} />
                    }
                </div>
            ) : (
                <div>
                    Загрузка...
                </div>
            )}
        </>
    );
}

export default NewsList;