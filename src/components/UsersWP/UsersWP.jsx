import { Link } from "react-router-dom";

function UsersWP({ contacts }) {
    return (
        <div id="UsersWP">
            {contacts.length ? (
                <ul className="nav nav-pills nav-fill flex-column">
                    {contacts.map(contact => (
                        <li key={contact.id} className="nav-item text-start">
                            <Link className="nav-link" to={`contacts/${contact.id}`}>
                                {contact.name ? <>{contact.name}</> : <i>No Name</i>}{' '}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    <i>No contacts</i>
                </p>
            )}
        </div>
    );
}

export default UsersWP;