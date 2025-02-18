import { Link } from "react-router-dom";

function NewsCard({ news }) {

    return (
        <Link className="card" to={ `/news/` + news.id }>
            <div className='pic'>
                <img className='image' src={ news.preview } alt="news_image" ></img>
                <div className="label">
                    { news.heading }
                </div>
            </div>
        </Link>
    );
}

export default NewsCard;