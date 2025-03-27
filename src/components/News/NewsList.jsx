import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { getNews } from '../../api';
import './News.styles.scss';
import LoadMore from '../LoadMore';

function NewsList({ isMainPage = false }) {
    const [newsList, setNewsList] = useState();
    const [isFullList, setIsFullList] = useState(false);
    const [isLoading, setIsLoading] = useState(true);  // Состояние загрузки

    const count = isMainPage ? 4 : 8;

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true); // Начинаем загрузку
            const newNewsList = await getNews(count);
            setNewsList(newNewsList);
            if (newNewsList.length < count) {
                setIsFullList(true);
            }
            setIsLoading(false); // Останавливаем загрузку после получения данных
        };
        loadData();
    }, []);

    return (
        <>
            {isLoading ? (
                <div id="news-list">
                    <div className="row">
                        {[...Array(count)].map((_, index) => (
                            <div key={index} className="card loading">
                                <div className="pic">
                                    <div className="shimmer"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div id="news-list">
                    <div className="row">
                        {newsList.map(item => <NewsCard key={item.id} news={item} />)}
                    </div>
                    {!isMainPage && !isFullList && (
                        <LoadMore list={newsList} setter={setNewsList} loader={getNews} count={count} setFull={setIsFullList} />
                    )}
                </div>
            )}
        </>
    );
}

export default NewsList;