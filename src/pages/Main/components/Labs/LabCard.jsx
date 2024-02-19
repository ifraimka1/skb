import { Link } from 'react-router-dom';

function LabCard({ lab }) {
    return (
        <Link to={ lab.link } className="card">
            <div className="text">
                <h2>{ lab.name }</h2>
                <p>{ lab.desc }</p>
            </div>
            <div className="link-label">Перейти &rarr;</div>
        </Link>
    );
}

export default LabCard;