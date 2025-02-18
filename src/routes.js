import {
    Root,
    ErrorPage,
    Main,
    AboutUs,
    Labs,
    Projects,
    Contact,
    News
} from './pages';
import { Project } from './pages/Projects/components';
import { Lab } from './pages/Labs/components';
import NewsItem from './pages/News/components/NewsItem';

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
                path: "/contact",
                element: <Contact />,
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
                path: "/news",
                element: <News />,
            },
            {
                path: "/news/:id",
                element: <NewsItem />
            },
            {
                path: "/projects",
                element: <Projects />,
            },
            {
                path: "/projects/:id",
                element: <Project />,
            },
        ]
    },
];

export default routes;