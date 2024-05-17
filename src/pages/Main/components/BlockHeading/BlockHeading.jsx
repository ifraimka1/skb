import { Link } from 'react-router-dom';

function BlockHeading({ heading, link, linkText }) {
    return (
        <div className="heading">
            <h1>{heading}</h1>
            {link && linkText &&
                <Link to={link}>{linkText} &rarr;</Link>
            }
        </div>
    );
}

export default BlockHeading;