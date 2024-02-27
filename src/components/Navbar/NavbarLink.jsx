import { NavLink } from "react-router-dom";
import { Children } from "react";

function NavbarLink({ link, children }) {
    return (
        <NavLink
            className={({ isActive, isPending }) =>
                `nav-link ${isActive ? 'active' : isPending ? 'disabled' : ''
                }`
            }
            to={link.to}
            target={link.newTab && '_blank'}
        >
            {link.text}
            {Children.map(children, (child) => (
                <>
                    {child}
                </>
            ))}
        </NavLink >
    );
}

export default NavbarLink;