import AboutUs from "@/pages/AboutUs";
import {
  LabsList,
  NewsList,
  ProjectsList,
} from "@/widgets/CardList/CardList";
import Contact from "@/pages/Contact";
import { MainPage } from "@/pages/MainPage";
import NewsItem from "@/pages/NewsItem/NewsItem";
import { NotFoundPage } from "@/pages/NotFound/NotFoundPage";
import WpPostPage from "@/pages/WpPostPage/WpPostPage";
import { RouteProps } from "react-router-dom";

export enum AppRoutes {
  MAIN = "main",
  NOT_FOUND = "not_found",
  NEWS = "news",
  LABS = "labs",
  PROJECTS = "projects",
  ABOUTUS = "aboutus",
  CONTACT = "contact",
  POST = "post",
  CURRENTNEW = "currentnew",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.NOT_FOUND]: "*",
  [AppRoutes.NEWS]: "/news",
  [AppRoutes.LABS]: "/labs",
  [AppRoutes.PROJECTS]: "/projects",
  [AppRoutes.ABOUTUS]: "/aboutus",
  [AppRoutes.CONTACT]: "/contact",
  [AppRoutes.POST]: "/post/:id",
  [AppRoutes.CURRENTNEW]: "/news/:id",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
  [AppRoutes.NEWS]: {
    path: RoutePath.news,
    element: <NewsList />,
  },
  [AppRoutes.LABS]: {
    path: RoutePath.labs,
    element: <LabsList />,
  },
  [AppRoutes.PROJECTS]: {
    path: RoutePath.projects,
    element: <ProjectsList />,
  },
  [AppRoutes.ABOUTUS]: {
    path: RoutePath.aboutus,
    element: <AboutUs />,
  },
  [AppRoutes.CONTACT]: {
    path: RoutePath.contact,
    element: <Contact />,
  },
  [AppRoutes.POST]: {
    path: RoutePath.post,
    element: <WpPostPage />,
  },
  [AppRoutes.CURRENTNEW]: {
    path: RoutePath.currentnew,
    element: <NewsItem />,
  },
};
