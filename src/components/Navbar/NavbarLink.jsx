import { NavLink } from "react-router-dom";

function NavbarLink({ link }) {
    return (
        <NavLink
            className={({ isActive, isPending }) =>
                `nav-link ${isActive ? 'active' : isPending ? 'disabled' : ''
                }`
            }
            to={ link.to }
            target={ link.newTab && '_blank' }
        >
            { link.text }
        </NavLink >
    );
}

export default NavbarLink;