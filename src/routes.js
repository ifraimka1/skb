import {
    Root,
    ErrorPage,
    Main,
    AboutUs,
    Labs,
    Projects,
    Contact
} from './pages';
import { Project, loader as projectsLoader } from './pages/Projects/components';

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
                path: "/projects",
                element: <Projects />,
            },
            {
                path: "/projects/:id",
                element: <Project />,
                loader: projectsLoader,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
        ]
    },
];

export default routes;