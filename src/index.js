import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';

import Root from './routes/Root';
import ErrorPage from './error-page';
import Main from './routes/Main';
import Aboutus from './routes/Aboutus';
import Labs from './routes/Labs';
import Projects from './routes/Projects';
import Contact from './routes/Contact';
import reportWebVitals from './reportWebVitals';
import './index.scss';

const router = createHashRouter([  
  
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
        element: <Aboutus />,
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
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
