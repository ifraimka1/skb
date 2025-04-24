import Root from "@/app/Layout/Root";
import { routeConfig } from "@/shared/config/routeConfig/routeConfig";
import { createHashRouter } from "react-router-dom";

export const appRouter = createHashRouter([
  {
    element: <Root />,

    children: Object.values(routeConfig).map((route) => ({
      path: route.path,
      element: route.element,
    })),
  },
]);
