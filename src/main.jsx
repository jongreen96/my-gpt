import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Root from './routes/root';
import ErrorPage from './routes/error-page';
import SignUp from './routes/sign-up';
import SignIn from './routes/sign-in';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/sign-up',
                element: <SignUp />,
            },
            {
                path: '/sign-in',
                element: <SignIn />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
