import { Link } from 'react-router-dom';

function LabCard({ lab }) {
    return (
        <Link to={lab.link} className="card lab">
            <img src={lab.image} alt="" className="image" />
            <div className="content">
                <h2>{lab.name}</h2>
                <div className="hidden">
                    <p>{lab.desc}</p>
                    <div className="link-label">Перейти &rarr;</div>
                </div>
            </div>
        </Link>
    );
}

export default LabCard;