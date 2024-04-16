import { Outlet } from "react-router-dom";
import { createContext, useEffect } from 'react';

import { getMedia } from "../../api";
import useElementOnScreen from '../../lib/useElementOnScreen';
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";
import './Root.styles.scss';

export const RootContext = createContext();

async function loader() {
    const media = getMedia();
    return { media };
}

function Root() {
    const [setRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0.6,
    });

    useEffect(() => {
        const navbar = document.getElementById('navbar');
        if (isVisible) {
            navbar.classList.add('transparent');
        } else {
            navbar.classList.remove('transparent');
        }
    }, [isVisible]);

    return (
        <RootContext.Provider
            value={{ setRef }}
        >
            <Navbar />
            <div id="page">
                <Outlet />
            </div>
            <Footer />
        </RootContext.Provider>
    );
}

export { loader };
export default Root;