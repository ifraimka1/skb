function NewsCard({ news }) {
    return (
        <div className="card">
            <div className='pic'>
                <img className='image' src={news.image} alt="news_image" ></img>
            </div>
            { news.text }
        </div>
    );
}

export default NewsCard;