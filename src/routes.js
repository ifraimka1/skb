import {
    Root,
    ErrorPage,
    Main,
    AboutUs,
    Labs,
    Projects,
    Contact
} from './pages';
import { Project } from './pages/Projects/components';
import { Lab } from './pages/Labs/components';

const routes = [
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Main />,
            },
            {
                path: "/aboutus",
                element: <AboutUs />,
            },
            {
                path: "/labs",
                element: <Labs />,
            },
            {
                path: "/labs/:id",
                element: <Lab />,
            },
            {
                path: "/projects",
                element: <Projects />,
            },
            {
                path: "/projects/:id",
                element: <Project />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
        ]
    },
];

export default routes;