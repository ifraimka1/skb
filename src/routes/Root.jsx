import { Outlet } from "react-router-dom";

//import { getContacts } from "../api";
import Navbar from '../components/Navbar/Navbar';
import './Root.scss';

// async function loader() {
//     const contacts = await getContacts();
//     return { contacts };
// }

function Root() {
//    const { contacts } = useLoaderData();
    return (
        <>
            <Navbar />
            <div id="page">
                <Outlet />
            </div>
            {/* <div id="test">
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
            </div> */}
        </>
    );
}

//export { loader };
export default Root;