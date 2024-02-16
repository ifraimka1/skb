import { Link } from 'react-router-dom';

import './Labs.styles.scss';

function Labs() {
    return (
        <div className="block labs">
            <div className="heading">
                <h1>Наши лаборатории</h1>
            </div>
            <div className="row">
                <Link className="card">
                    <div className="text">
                        <h2>Лаборатория кибернетики</h2>
                        <p>Управление робототехническими системами, создание аппаратных и программных продуктов, а также проектирование программных систем.</p>
                    </div>
                    <div className="link-label">Перейти&rarr;</div>
                </Link>
                <Link to={`/labs`} className="card">
                    <div className="text">
                        <h2>Лаборатория компьютерного зрения</h2>
                        <p>Работа с методами и технологиями сегментации изображений, ИИ и нейронными сетями.</p>
                    </div>
                    <div className="link-label">Перейти&rarr;</div>
                </Link>
                <Link to={`/labs`} className="card">
                    <div className="text">
                        <h2>Лаборатория SmartTech</h2>
                        <p>Проектирование систем в концепции “Интернета вещей” и технологии “Умного дома”.</p>
                    </div>
                    <div className="link-label">Перейти&rarr;</div>
                </Link>
                <Link to={`/labs`} className="card">
                    <div className="text">
                        <h2>Лаборатория VR и AR</h2>
                        <p>Разработка приложений для виртуальной и дополненной реальности, 3D-моделирование.</p>
                    </div>
                    <div className="link-label">Перейти&rarr;</div>
                </Link>
                <Link to={`/labs`} className="card">
                    <div className="text">
                        <h2>Лаборатория мобильной разработки</h2>
                        <p>Разработка приложений для портативных устройств, создание дизайна и проектов мобильных приложений.</p>
                    </div>
                    <div className="link-label">Перейти&rarr;</div>
                </Link>
                <Link to={`/labs`} className="card">
                    <div className="text">
                        <h2>Лаборатория 3D-печати и прототипирования</h2>
                        <p>Проектирование 3D-модели, работа с 3D-принтером и создание качественных трёхмерных макетов.</p>
                    </div>
                    <div className="link-label">Перейти&rarr;</div>
                </Link>
            </div>
        </div>
    );
}

export default Labs;