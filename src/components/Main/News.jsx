import { Link } from 'react-router-dom';

import './News.scss';

function News() {
    return (
        <div className="news">
            <div className="heading">
                <h1>Новости</h1>
                <a href=''>Все проекты</a>
            </div>
            <div className="row">
                <div className="el">
                    <div className="pic"></div>
                    Какая-то новость
                </div>
                <div className="el">
                    <div className="pic"></div>
                    Еще одна новость
                </div>
                <div className="el">
                    <div className="pic"></div>
                    Новость поменьше
                </div>
                <div className="el">
                    <div className="pic"></div>
                    Новость маленькая совсем жесть а текст какой длинный ого
                </div>
            </div>
        </div>
    );
}

export default News;