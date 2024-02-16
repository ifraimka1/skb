import './News.styles.scss';

function News() {
    return (
        <div className="block news">
            <div className="heading">
                <h1>Новости</h1>
                <a href=''>Все новости</a>
            </div>
            <div className="row">
                <div className="card">
                    <div className="pic"></div>
                    Еще одна новость
                </div>
                <div className="card">
                    <div className="pic"></div>
                    Новость поменьше
                </div>
                <div className="card">
                    <div className="pic"></div>
                    Новость маленькая совсем жесть а текст какой длинный ого
                </div>
            </div>
        </div>
    );
}

export default News;