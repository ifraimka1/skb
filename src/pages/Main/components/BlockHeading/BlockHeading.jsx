import { Link } from 'react-router-dom';

function BlockHeading({ heading, link, linkText }) {
    return (
        <div className="heading">
            <h1>{heading}</h1>
            {link && linkText &&
                <Link to={link}>{linkText}</Link>// убрала стрелочку &rarr;
            }
        </div>
    );
}

export default BlockHeading;