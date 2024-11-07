import { Link } from 'react-router-dom';

function LabCard({ lab }) {
    return (
        <Link className="card lab" to={'/labs/' + lab.id}>
            <img src={lab.preview} alt="" className="image" />
            <div className="content">
                <h2>{lab.name}</h2>
                <div className="hidden">
                    <p>{lab.previewText}</p>
                    <div className="link-label">Перейти &rarr;</div>
                </div>
            </div>
        </Link>
    );
}

export default LabCard;