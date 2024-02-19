import { Link } from "react-router-dom";

function FooterLink({ link }) {
    return (
        <Link to={ link.to } className="link">
            <img src={ link.icon } alt='icon' className='icon'/>
        </Link>
    );
}

export default FooterLink;