import { Link } from "react-router-dom";

function FooterLink({ link }) {
    return (
        <Link to={ link.to } className="link" target="_blank">
            <img src={ link.src } alt='icon' className='icon'/>
        </Link>
    );
}

export default FooterLink;