import { Link } from 'react-router-dom';

function BlockHeading({ heading, link, linkText }) {
    return (
        <div className="heading">
            <h1>{heading}</h1>
            {link && linkText &&
                <Link to={link} target="_blank">{linkText}</Link>
            }
        </div>
    );
}

export default BlockHeading;