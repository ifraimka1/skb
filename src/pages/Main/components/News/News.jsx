import BlockHeading from '../BlockHeading';
import NewsCard from './NewsCard';
import './News.styles.scss';
import { newsMock } from '../../../../assets/images';

const mock = [
    {
        id: 1,
        text: "Какая-то новость",
        image: newsMock
    },
    {
        id: 2,
        text: "Еще одна новость",
        image: newsMock
    },
    {
        id: 3,
        text: "Новость поменбше",
        image: newsMock
    },
    {
        id: 4,
        text: "Новость маленькая совсем жестб а текст какой длинный ого",
        image: newsMock
    },
];

function News({ news = mock }) {

    return (
        <><br/>
        <div className="block" id="news">
            <BlockHeading heading='Новости' linkText='Все новости' link='https://vk.com/skbkit' />
            <div className="row">
                { news.map(item => <NewsCard key={ item.id } news={ item } />) }
            </div>
        </div>
        </>
    );
}

export default News;