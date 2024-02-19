import { Outlet, useLoaderData } from "react-router-dom";

import { getContacts } from "../../api";
import Navbar from '../../components/Navbar';
import UsersWP from "../../components/UsersWP";
import './Root.styles.scss';

async function loader() {
    const contacts = await getContacts();
    return { contacts };
}

function Root() {
   const { contacts } = useLoaderData();
    return (
        <>
            <Navbar />
            <div id="page">
                <Outlet />
            </div>
            <UsersWP contacts={ contacts } />
        </>
    );
}

export { loader };
export default Root;