import "./styles/App.scss";

import { Suspense } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { classNames } from "@/shared/lib/classNames/classNames";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "@/app/providers/router";

function App() {
  // Создаём экземпляр QueryClient
  const queryClient = new QueryClient();
  return (
    <>
      <div className={classNames("app", {}, [])}>
        <Suspense fallback="loading">
          <div className="content-page">
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={appRouter} />
            </QueryClientProvider>
          </div>
        </Suspense>
      </div>
    </>
  );
}

export default App;
