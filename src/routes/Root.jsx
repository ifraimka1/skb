import { Outlet } from "react-router-dom";

import Navbar from '../components/Navbar/Navbar';
import './Root.scss';

function Root() {
    return (
        <>
            <Navbar />
            <div id="page">
                <Outlet />
            </div>
        </>
    );
}

export default Root;