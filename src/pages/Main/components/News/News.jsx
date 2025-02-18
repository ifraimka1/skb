import BlockHeading from '../BlockHeading';
import NewsList from '../../../../components/News';

function News() {
    return (
        <div className="block" id="news">
            <BlockHeading heading='Новости' linkText='Все новости' link='/news' />
            <NewsList isMainPage={ true } />
        </div>
    );
}

export default News;