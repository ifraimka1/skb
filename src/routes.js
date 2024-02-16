import {
    Root,
    loader as rootLoader,
    ErrorPage,
    Main,
    AboutUs,
    Labs,
    Projects,
    Contact
} from './pages';

const routes = [
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
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
                path: "/contact",
                element: <Contact />,
            },
        ]
    },
];

export default routes;