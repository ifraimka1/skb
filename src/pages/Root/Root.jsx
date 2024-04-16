import { Outlet } from 'react-router-dom';

import { getMedia } from '../../api';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Root.styles.scss';

async function loader() {
    const media = getMedia();
    return { media };
}

function Root() {
    return (
        <>
            <Navbar />
            <div id="page">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export { loader };
export default Root;