import BlockHeading from '../BlockHeading';
import NewsCard from './NewsCard';
import './News.styles.scss';
import { newsMock } from '../../../../assets/images';

const mock = [
    {
        text: "Какая-то новость",
        image: newsMock
    },
    {
        text: "Еще одна новость",
        image: newsMock
    },
    {
        text: "Новость поменбше",
        image: newsMock
    },
    {
        text: "Новость маленькая совсем жестб а текст какой длинный ого",
        image: newsMock
    },
];

function News({ news = mock }) {

    return (
        <div className="block news">
            <BlockHeading heading='Новости' linkText='Все новости' link='https://vk.com/skbkit' />
            <div className="row">
                { news.map(item => <NewsCard news={ item } />) }
            </div>
        </div>
    );
}

export default News;